import { PrismaClient } from '@/generated/prisma'
import { PrismaD1 } from '@prisma/adapter-d1'

let prisma: PrismaClient | undefined

export function getPrismaClient(env?: { DB?: D1Database }) {
  if (prisma) return prisma

  // For testing environments, use test database
  if (process.env.CYPRESS === 'true' || process.env.NODE_ENV === 'test') {
    const testDbUrl = process.env.DATABASE_URL || 'file:./test.db'
    console.log('Using test database:', testDbUrl)
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: testDbUrl
        }
      }
    })
    return prisma
  }

  // In development, use local SQLite
  if (process.env.NODE_ENV === 'development') {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'file:./dev.db'
        }
      }
    })
    return prisma
  }

  // In production (Cloudflare Workers), use D1
  if (env?.DB) {
    const adapter = new PrismaD1(env.DB)
    prisma = new PrismaClient({ adapter })
    return prisma
  }

  // Fallback for other environments
  prisma = new PrismaClient()
  return prisma
}

export async function closePrisma() {
  if (prisma) {
    await prisma.$disconnect()
    prisma = undefined
  }
}