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
  photoCredit: {
    photographer: string;
    photographerUrl: string;
    originalPhotoUrl: string;
  };
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
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/selective-focus-photography-of-clear-glass-cup-with-brown-liquid-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/close-up-photo-of-cocktail-drink-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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
    isPopular: false,
    photoCredit: {
      photographer: "Mika Baumeister",
      photographerUrl: "https://unsplash.com/@mbaumi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/beer-bottles-on-shelf-Wpnoqo2plFA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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
    isPopular: false,
    photoCredit: {
      photographer: "Jez Timms",
      photographerUrl: "https://unsplash.com/@jeztimms?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-wine-glass-with-red-wine-DVRXFIH42d0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/close-up-photo-of-cocktail-drink-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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
    isPopular: false,
    photoCredit: {
      photographer: "Ambitious Creative Co. - Rick Barrett",
      photographerUrl: "https://unsplash.com/@weareambitious?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-glass-bottle-with-brown-liquid-RDAojeRc6mw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  
  // Additional Cocktails
  {
    id: 7,
    name: "Espresso Martini",
    description: "Coffee cocktail with vodka, coffee liqueur, and fresh espresso",
    price: 16,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Vodka", "Coffee Liqueur", "Espresso", "Sugar Syrup"],
    abv: 25,
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/close-up-photo-of-cocktail-drink-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 8,
    name: "Whiskey Sour",
    description: "Classic sour cocktail with whiskey, lemon juice, and simple syrup",
    price: 14,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Bourbon", "Lemon juice", "Simple syrup", "Egg white"],
    abv: 20,
    isPopular: false,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/selective-focus-photography-of-clear-glass-cup-with-brown-liquid-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 9,
    name: "Aperol Spritz",
    description: "Italian aperitif cocktail with Aperol, Prosecco, and soda water",
    price: 12,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
    category: "cocktail",
    ingredients: ["Aperol", "Prosecco", "Soda water", "Orange slice"],
    abv: 11,
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/close-up-photo-of-cocktail-drink-xBFTjrMIC0c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },

  // Additional Beer
  {
    id: 10,
    name: "Belgian Tripel",
    description: "Strong golden ale with complex fruity and spicy flavors",
    price: 10,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    category: "beer",
    ingredients: ["Belgian Malt", "Belgian Yeast", "Coriander", "Orange Peel"],
    abv: 8.5,
    isPopular: false,
    photoCredit: {
      photographer: "Mika Baumeister",
      photographerUrl: "https://unsplash.com/@mbaumi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/beer-bottles-on-shelf-Wpnoqo2plFA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 11,
    name: "Sour Ale",
    description: "Tart and funky beer with wild yeast fermentation",
    price: 11,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    category: "beer",
    ingredients: ["Wheat", "Wild Yeast", "Lactobacillus", "Fruit"],
    abv: 5.8,
    isPopular: true,
    photoCredit: {
      photographer: "Mika Baumeister",
      photographerUrl: "https://unsplash.com/@mbaumi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/beer-bottles-on-shelf-Wpnoqo2plFA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 12,
    name: "Porter",
    description: "Dark beer with chocolate and coffee notes",
    price: 8,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    category: "beer",
    ingredients: ["Chocolate Malt", "Roasted Barley", "Hops", "Yeast"],
    abv: 6.2,
    isPopular: false,
    photoCredit: {
      photographer: "Mika Baumeister",
      photographerUrl: "https://unsplash.com/@mbaumi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/beer-bottles-on-shelf-Wpnoqo2plFA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },

  // Additional Wine
  {
    id: 13,
    name: "Riesling",
    description: "Aromatic white wine with floral and citrus notes",
    price: 14,
    image: "https://images.unsplash.com/photo-1566995286245-68cda5b94cd0?w=400&h=400&fit=crop",
    category: "wine",
    ingredients: ["Riesling grapes"],
    abv: 11.5,
    isPopular: false,
    photoCredit: {
      photographer: "Jez Timms",
      photographerUrl: "https://unsplash.com/@jeztimms?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-wine-glass-with-red-wine-DVRXFIH42d0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 14,
    name: "Syrah",
    description: "Full-bodied red wine with pepper and dark fruit flavors",
    price: 16,
    image: "https://images.unsplash.com/photo-1566995286245-68cda5b94cd0?w=400&h=400&fit=crop",
    category: "wine",
    ingredients: ["Syrah grapes"],
    abv: 14.5,
    isPopular: true,
    photoCredit: {
      photographer: "Jez Timms",
      photographerUrl: "https://unsplash.com/@jeztimms?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-wine-glass-with-red-wine-DVRXFIH42d0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 15,
    name: "Prosecco",
    description: "Italian sparkling wine with crisp apple and pear notes",
    price: 13,
    image: "https://images.unsplash.com/photo-1566995286245-68cda5b94cd0?w=400&h=400&fit=crop",
    category: "wine",
    ingredients: ["Glera grapes"],
    abv: 11.0,
    isPopular: true,
    photoCredit: {
      photographer: "Jez Timms",
      photographerUrl: "https://unsplash.com/@jeztimms?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-wine-glass-with-red-wine-DVRXFIH42d0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },

  // Additional Spirits
  {
    id: 16,
    name: "Japanese Whisky",
    description: "Smooth and refined whisky with subtle smokiness",
    price: 22,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
    category: "spirit",
    ingredients: ["Malted barley", "Rice", "Water"],
    abv: 43,
    isPopular: true,
    photoCredit: {
      photographer: "Ambitious Creative Co. - Rick Barrett",
      photographerUrl: "https://unsplash.com/@weareambitious?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-glass-bottle-with-brown-liquid-RDAojeRc6mw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 17,
    name: "Mezcal",
    description: "Smoky agave spirit with earthy complexity",
    price: 19,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
    category: "spirit",
    ingredients: ["Espadín Agave", "Oak smoke"],
    abv: 45,
    isPopular: false,
    photoCredit: {
      photographer: "Ambitious Creative Co. - Rick Barrett",
      photographerUrl: "https://unsplash.com/@weareambitious?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-glass-bottle-with-brown-liquid-RDAojeRc6mw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
  },
  {
    id: 18,
    name: "Cognac",
    description: "Premium French brandy aged in oak barrels",
    price: 25,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
    category: "spirit",
    ingredients: ["Ugni Blanc grapes", "Oak"],
    abv: 40,
    isPopular: false,
    photoCredit: {
      photographer: "Ambitious Creative Co. - Rick Barrett",
      photographerUrl: "https://unsplash.com/@weareambitious?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      originalPhotoUrl: "https://unsplash.com/photos/clear-glass-bottle-with-brown-liquid-RDAojeRc6mw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    }
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