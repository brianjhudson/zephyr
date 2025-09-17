import { NextRequest, NextResponse } from 'next/server'
import { getPrismaClient } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get environment binding for D1 database in production, undefined for development
    const env = process.env.NODE_ENV === 'production' 
      ? { DB: (globalThis as any).DB } 
      : undefined
    
    const prisma = getPrismaClient(env)
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const popular = searchParams.get('popular')
    
    // Build where clause
    const where: any = {}
    if (category) {
      where.category = category.toUpperCase()
    }
    if (popular === 'true') {
      where.isPopular = true
    }
    
    // Fetch drinks with photo credits
    const drinks = await prisma.drink.findMany({
      where,
      include: {
        photoCredit: true
      },
      orderBy: [
        { isPopular: 'desc' },
        { name: 'asc' }
      ]
    })
    
    return NextResponse.json(drinks, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
      }
    })
    
  } catch (error) {
    console.error('Error fetching drinks:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch drinks',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}