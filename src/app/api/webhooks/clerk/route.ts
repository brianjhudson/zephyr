import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { UserService } from '@/lib/services/user'

// Allow test secret only when explicitly running Cypress tests
const isTestEnvironment = process.env.NODE_ENV === 'test' || 
  process.env.CYPRESS === 'true' ||
  process.env.CI === 'true' && process.env.npm_lifecycle_event?.includes('test')

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || 
  (isTestEnvironment ? 'test_webhook_secret' : undefined)

if (!WEBHOOK_SECRET) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables')
}

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.text()

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET!)

  let evt: any

  // Verify the payload with the headers
  try {
    // For testing environments, allow bypassing signature verification
    if (isTestEnvironment && WEBHOOK_SECRET === 'test_webhook_secret') {
      // In test mode, parse payload directly without Svix verification
      evt = JSON.parse(payload)
      console.log('Test mode: bypassing webhook signature verification')
    } else {
      // Production mode: use proper Svix verification
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature
      }) as any
    }
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  // Get the environment for D1 database access
  const env = process.env.NODE_ENV === 'production' 
    ? { DB: (globalThis as any).DB } 
    : undefined

  const userService = new UserService(env)

  try {
    switch (evt.type) {
      case 'user.created': {
        const { id, email_addresses, username } = evt.data
        
        // Use email as identifier, fallback to username
        const identifier = email_addresses?.[0]?.email_address || username || id
        
        await userService.createUserSystem({
          clerk_user_id: id,
          identifier
        })
        
        console.log(`User created in D1: ${id}`)
        break
      }
      
      case 'user.deleted': {
        const { id } = evt.data
        
        const userExists = await userService.userExists(id, true)
        if (userExists) {
          await userService.deleteUser(id, true)
          console.log(`User deleted from D1: ${id}`)
        }
        break
      }
      
      default:
        console.log(`Unhandled webhook event type: ${evt.type}`)
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Error processing webhook', {
      status: 500
    })
  }
}