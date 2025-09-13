import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { UserService } from '@/lib/services/user'

interface RouteParams {
  params: {
    clerkUserId: string
  }
}

// Security: Only allow this endpoint in testing environments
const isTestEnvironment = process.env.NODE_ENV === 'test' || 
  process.env.CYPRESS === 'true' ||
  (process.env.CI === 'true' && process.env.npm_lifecycle_event?.includes('test'))

// Memory-safe rate limiting for testing endpoint
const requestCounts = new Map<string, { count: number; resetTime: number; lastAccess: number }>()
const MAX_CACHE_SIZE = 1000 // Prevent unbounded growth
const CLEANUP_INTERVAL = 5 * 60 * 1000 // Cleanup every 5 minutes
const ENTRY_TTL = 10 * 60 * 1000 // Remove entries after 10 minutes of inactivity

let lastCleanup = Date.now()

function cleanupExpiredEntries(): void {
  const now = Date.now()
  
  // Only cleanup if interval has passed
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return
  }
  
  const entriesToDelete: string[] = []
  
  for (const [clientId, data] of requestCounts.entries()) {
    // Remove if window expired AND entry is old
    if (now > data.resetTime && now - data.lastAccess > ENTRY_TTL) {
      entriesToDelete.push(clientId)
    }
  }
  
  // Clean up expired entries
  entriesToDelete.forEach(clientId => requestCounts.delete(clientId))
  
  // If still too large, remove oldest entries (LRU-style)
  if (requestCounts.size > MAX_CACHE_SIZE) {
    const sortedEntries = Array.from(requestCounts.entries())
      .sort((a, b) => a[1].lastAccess - b[1].lastAccess)
    
    const toRemove = sortedEntries.slice(0, requestCounts.size - MAX_CACHE_SIZE)
    toRemove.forEach(([clientId]) => requestCounts.delete(clientId))
  }
  
  lastCleanup = now
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 50 // Max 50 requests per minute
  
  // Periodic cleanup to prevent memory leaks
  cleanupExpiredEntries()
  
  const clientData = requestCounts.get(clientId)
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientId, { 
      count: 1, 
      resetTime: now + windowMs,
      lastAccess: now
    })
    return true
  }
  
  if (clientData.count >= maxRequests) {
    // Update last access even for rejected requests
    clientData.lastAccess = now
    return false
  }
  
  clientData.count++
  clientData.lastAccess = now
  return true
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    // Security: Block access in production
    if (!isTestEnvironment) {
      return NextResponse.json(
        { error: 'Endpoint not available in production' },
        { 
          status: 404,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
          }
        }
      )
    }

    // Security: Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
          }
        }
      )
    }

    // Security: Check for test authorization header
    const headerPayload = await headers()
    const testAuth = headerPayload.get('x-test-auth')
    
    if (testAuth !== 'cypress-testing') {
      return NextResponse.json(
        { error: 'Test authorization required' },
        { 
          status: 401,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
          }
        }
      )
    }

    const { clerkUserId } = await params

    // Validate input
    if (!clerkUserId || typeof clerkUserId !== 'string' || clerkUserId.length < 5) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { 
          status: 400,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
          }
        }
      )
    }

    // Security: Audit logging for test endpoint access
    console.log('Test endpoint accessed:', {
      endpoint: '/api/users/verify',
      clerkUserId: clerkUserId.substring(0, 8) + '***', // Partially redact for logging
      clientIp,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    })

    // Get the environment for D1 database access
    const env = process.env.NODE_ENV === 'production' 
      ? { DB: (globalThis as any).DB } 
      : undefined

    const userService = new UserService(env)
    
    // Use system call for testing purposes only
    const user = await userService.getUserByClerkId(clerkUserId, true)

    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }

    if (user) {
      return NextResponse.json({
        exists: true,
        user: {
          id: user.id,
          clerk_user_id: user.clerk_user_id,
          identifier: user.identifier,
          role: user.role,
          created_at: user.created_at
        }
      }, {
        headers: securityHeaders
      })
    } else {
      return NextResponse.json({
        exists: false
      }, {
        headers: securityHeaders
      })
    }
  } catch (error) {
    console.error('Error verifying user in test endpoint:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { error: 'Failed to verify user' },
      { 
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      }
    )
  }
}