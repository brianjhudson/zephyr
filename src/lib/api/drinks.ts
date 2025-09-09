export interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cocktail' | 'beer' | 'wine' | 'spirit';
  ingredients: string[];
  abv: number;
  isPopular: boolean;
}

const mockDrinks: Drink[] = [
  {
    id: 1,
    name: "Old Fashioned",
    description: "A classic cocktail made with whiskey, sugar, bitters, and citrus",
    price: 14,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Bourbon", "Sugar", "Angostura bitters", "Orange peel"],
    abv: 35,
    isPopular: true
  },
  {
    id: 2,
    name: "Negroni",
    description: "Equal parts gin, Campari, and sweet vermouth",
    price: 16,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Gin", "Campari", "Sweet Vermouth", "Orange garnish"],
    abv: 24,
    isPopular: true
  },
  {
    id: 3,
    name: "Craft IPA",
    description: "Hoppy India Pale Ale with citrus notes",
    price: 8,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    category: "beer",
    ingredients: ["Hops", "Malt", "Yeast", "Water"],
    abv: 6.5,
    isPopular: false
  },
  {
    id: 4,
    name: "Chardonnay",
    description: "Crisp white wine with notes of apple and oak",
    price: 12,
    image: "https://images.unsplash.com/photo-1566995286245-68cda5b94cd0?w=400&h=400&fit=crop",
    category: "wine",
    ingredients: ["Chardonnay grapes"],
    abv: 13.5,
    isPopular: false
  },
  {
    id: 5,
    name: "Margarita",
    description: "Classic tequila cocktail with lime and orange liqueur",
    price: 13,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Tequila", "Triple Sec", "Lime juice", "Salt rim"],
    abv: 22,
    isPopular: true
  },
  {
    id: 6,
    name: "Single Malt Scotch",
    description: "Premium aged Scotch whisky",
    price: 18,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
    category: "spirit",
    ingredients: ["Malted barley", "Water", "Yeast"],
    abv: 40,
    isPopular: false
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchDrinks(): Promise<Drink[]> {
  await delay(800); // Simulate API delay
  return mockDrinks;
}

export async function fetchDrinksByCategory(category: string): Promise<Drink[]> {
  await delay(600);
  return mockDrinks.filter(drink => drink.category === category);
}

export async function fetchPopularDrinks(): Promise<Drink[]> {
  await delay(500);
  return mockDrinks.filter(drink => drink.isPopular);
}

export async function fetchDrinkById(id: number): Promise<Drink | null> {
  await delay(300);
  return mockDrinks.find(drink => drink.id === id) || null;
}