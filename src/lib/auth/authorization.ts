import { currentUser } from '@clerk/nextjs/server'
import { getPrismaClient } from '@/lib/db'
import { $Enums } from '@/generated/prisma'

export interface AuthContext {
  isSystem: boolean
  isAdmin: boolean
  clerk_user_id?: string
  currentUserRole?: $Enums.Role
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export async function getAuthContext(env?: { DB?: D1Database }, isSystemCall: boolean = false): Promise<AuthContext> {
  // System calls (webhooks, internal operations) bypass user auth
  if (isSystemCall) {
    return {
      isSystem: true,
      isAdmin: true
    }
  }

  // Get current user from Clerk
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return {
      isSystem: false,
      isAdmin: false
    }
  }

  // Get user from database to check role
  const prisma = getPrismaClient(env)
  const dbUser = await prisma.user.findUnique({
    where: { clerk_user_id: clerkUser.id }
  })

  return {
    isSystem: false,
    isAdmin: dbUser?.role === $Enums.Role.ADMIN,
    clerk_user_id: clerkUser.id,
    currentUserRole: dbUser?.role
  }
}

export function requireAuth(authContext: AuthContext, requiredLevel: 'user' | 'admin' | 'system' = 'user') {
  switch (requiredLevel) {
    case 'system':
      if (!authContext.isSystem) {
        throw new UnauthorizedError('System access required')
      }
      break
    case 'admin':
      if (!authContext.isAdmin && !authContext.isSystem) {
        throw new UnauthorizedError('Admin access required')
      }
      break
    case 'user':
      if (!authContext.clerk_user_id && !authContext.isSystem) {
        throw new UnauthorizedError('Authentication required')
      }
      break
  }
}

export function canAccessUser(authContext: AuthContext, targetClerkUserId: string): boolean {
  // System can access any user
  if (authContext.isSystem) return true
  
  // Admins can access any user
  if (authContext.isAdmin) return true
  
  // Users can only access themselves
  return authContext.clerk_user_id === targetClerkUserId
}