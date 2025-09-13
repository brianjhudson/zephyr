import { getPrismaClient } from '@/lib/db'
import { $Enums } from '@/generated/prisma'
import { getAuthContext, requireAuth, canAccessUser, UnauthorizedError } from '@/lib/auth/authorization'

type Role = $Enums.Role

export interface CreateUserData {
  clerk_user_id: string
  identifier: string
  role?: Role
}

export class UserService {
  private prisma
  private env?: { DB?: D1Database }

  constructor(env?: { DB?: D1Database }) {
    this.prisma = getPrismaClient(env)
    this.env = env
  }

  // System-only method for webhooks and internal operations
  async createUserSystem(data: CreateUserData) {
    const userData = {
      clerk_user_id: data.clerk_user_id,
      identifier: data.identifier,
      role: data.role || $Enums.Role.USER
    }

    return await this.prisma.user.create({
      data: userData
    })
  }

  // Protected method for regular user creation (if needed)
  async createUser(data: CreateUserData, isSystemCall: boolean = false) {
    const authContext = await getAuthContext(this.env, isSystemCall)
    requireAuth(authContext, 'system') // Only system can create users directly

    return this.createUserSystem(data)
  }

  async getUserByClerkId(clerk_user_id: string, isSystemCall: boolean = false) {
    const authContext = await getAuthContext(this.env, isSystemCall)
    
    // Users can only access their own data, admins and system can access any
    if (!canAccessUser(authContext, clerk_user_id)) {
      throw new UnauthorizedError('Access denied')
    }

    return await this.prisma.user.findUnique({
      where: {
        clerk_user_id
      }
    })
  }

  async getUserById(id: number, isSystemCall: boolean = false) {
    const authContext = await getAuthContext(this.env, isSystemCall)
    requireAuth(authContext, 'user')

    // Get the user first to check if current user can access it
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) return null

    if (!canAccessUser(authContext, user.clerk_user_id)) {
      throw new UnauthorizedError('Access denied')
    }

    return user
  }

  async updateUserRole(clerk_user_id: string, role: Role, isSystemCall: boolean = false) {
    const authContext = await getAuthContext(this.env, isSystemCall)
    requireAuth(authContext, 'admin') // Only admins and system can update roles

    return await this.prisma.user.update({
      where: {
        clerk_user_id
      },
      data: {
        role
      }
    })
  }

  async userExists(clerk_user_id: string, isSystemCall: boolean = false): Promise<boolean> {
    const authContext = await getAuthContext(this.env, isSystemCall)
    
    // Allow broader access for existence checks (needed for middleware, etc.)
    if (!authContext.isSystem && !authContext.isAdmin && authContext.clerk_user_id !== clerk_user_id) {
      return false // Don't reveal existence to unauthorized users
    }

    const user = await this.prisma.user.findUnique({
      where: { clerk_user_id },
      select: { id: true }
    })
    return !!user
  }

  async deleteUser(clerk_user_id: string, isSystemCall: boolean = false) {
    const authContext = await getAuthContext(this.env, isSystemCall)
    
    // Users can delete themselves, admins can delete anyone, system can delete anyone
    if (!canAccessUser(authContext, clerk_user_id)) {
      throw new UnauthorizedError('Access denied')
    }

    return await this.prisma.user.delete({
      where: {
        clerk_user_id
      }
    })
  }
}