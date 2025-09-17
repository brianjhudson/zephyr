import type { Drink as PrismaDrink, PhotoCredit } from '@/generated/prisma';

export type Drink = PrismaDrink & {
  photoCredit: PhotoCredit;
};

// API base URL - can be overridden by environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

async function fetchFromAPI(endpoint: string): Promise<any> {
  const url = `${API_BASE_URL}/api${endpoint}`
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable caching but allow revalidation
      cache: 'force-cache',
      next: { revalidate: 300 } // 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error)
    throw error
  }
}

export async function fetchDrinks(): Promise<Drink[]> {
  return await fetchFromAPI('/drinks')
}

export async function fetchDrinksByCategory(category: string): Promise<Drink[]> {
  return await fetchFromAPI(`/drinks?category=${category.toUpperCase()}`)
}

export async function fetchPopularDrinks(): Promise<Drink[]> {
  return await fetchFromAPI('/drinks?popular=true')
}

export async function fetchDrinkById(id: number): Promise<Drink | null> {
  try {
    const drinks = await fetchFromAPI('/drinks')
    return drinks.find((drink: Drink) => drink.id === id) || null
  } catch (error) {
    console.error(`Failed to fetch drink with id ${id}:`, error)
    return null
  }
}