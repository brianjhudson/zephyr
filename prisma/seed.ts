import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

const drinkData = [
  // Cocktails
  {
    name: "Old Fashioned",
    description: "A classic whiskey cocktail with sugar, bitters, and orange peel",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Whiskey, Sugar, Bitters, Orange Peel",
    abv: 35.0,
    isPopular: true,
    photoCredit: {
      photographer: "Adam Jaime",
      photographerUrl: "https://unsplash.com/@adamjaime",
      originalPhotoUrl: "https://unsplash.com/photos/dmkmrNptMpw"
    }
  },
  {
    name: "Manhattan",
    description: "A sophisticated blend of whiskey, vermouth, and bitters",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Rye Whiskey, Sweet Vermouth, Angostura Bitters, Cherry",
    abv: 32.0,
    isPopular: true,
    photoCredit: {
      photographer: "Kobby Mendez",
      photographerUrl: "https://unsplash.com/@kobbymendez",
      originalPhotoUrl: "https://unsplash.com/photos/xBFTjrMIC0c"
    }
  },
  {
    name: "Negroni",
    description: "Equal parts gin, Campari, and sweet vermouth",
    price: 13.00,
    image: "https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Gin, Campari, Sweet Vermouth, Orange Peel",
    abv: 28.0,
    isPopular: true,
    photoCredit: {
      photographer: "Mae Mu",
      photographerUrl: "https://unsplash.com/@picoftasty",
      originalPhotoUrl: "https://unsplash.com/photos/TkzdkVn1AyA"
    }
  },
  {
    name: "Martini",
    description: "The quintessential gin cocktail with dry vermouth",
    price: 16.00,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Gin, Dry Vermouth, Olive or Lemon Twist",
    abv: 38.0,
    isPopular: true,
    photoCredit: {
      photographer: "Kevin Kelly",
      photographerUrl: "https://unsplash.com/@kevintphotography",
      originalPhotoUrl: "https://unsplash.com/photos/rBXHBpk_bg8"
    }
  },
  {
    name: "Margarita",
    description: "Tequila, lime juice, and triple sec served with salt rim",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Tequila, Lime Juice, Triple Sec, Salt",
    abv: 22.0,
    isPopular: true,
    photoCredit: {
      photographer: "Ambitious Creative Co",
      photographerUrl: "https://unsplash.com/@ambitiousco",
      originalPhotoUrl: "https://unsplash.com/photos/Rick_Gush"
    }
  },
  {
    name: "Whiskey Sour",
    description: "Whiskey, lemon juice, and simple syrup with egg white foam",
    price: 13.00,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Whiskey, Lemon Juice, Simple Syrup, Egg White",
    abv: 25.0,
    isPopular: true,
    photoCredit: {
      photographer: "Stanislav Ivanitskiy",
      photographerUrl: "https://unsplash.com/@ivanitskiy",
      originalPhotoUrl: "https://unsplash.com/photos/yCVgn4hP0Oo"
    }
  },
  {
    name: "Moscow Mule",
    description: "Vodka, ginger beer, and lime in a copper mug",
    price: 11.00,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Vodka, Ginger Beer, Lime Juice",
    abv: 12.0,
    isPopular: true,
    photoCredit: {
      photographer: "Michal Balog",
      photographerUrl: "https://unsplash.com/@michalbalog",
      originalPhotoUrl: "https://unsplash.com/photos/QE2g1QZqMyM"
    }
  },
  {
    name: "Daiquiri",
    description: "Simple rum cocktail with lime juice and sugar",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "White Rum, Lime Juice, Simple Syrup",
    abv: 28.0,
    isPopular: false,
    photoCredit: {
      photographer: "Ash Edmonds",
      photographerUrl: "https://unsplash.com/@badashproducts",
      originalPhotoUrl: "https://unsplash.com/photos/Koxa-GX_5zs"
    }
  },
  {
    name: "Mojito",
    description: "Refreshing rum cocktail with mint, lime, and soda water",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "White Rum, Mint, Lime, Sugar, Soda Water",
    abv: 13.0,
    isPopular: true,
    photoCredit: {
      photographer: "Giovanna Gomes",
      photographerUrl: "https://unsplash.com/@giovannagomes",
      originalPhotoUrl: "https://unsplash.com/photos/_8KV86shhPo"
    }
  },
  {
    name: "Gin & Tonic",
    description: "Classic highball with gin, tonic water, and lime",
    price: 9.00,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop",
    category: "COCKTAIL",
    ingredients: "Gin, Tonic Water, Lime",
    abv: 11.0,
    isPopular: true,
    photoCredit: {
      photographer: "Dylan de Jonge",
      photographerUrl: "https://unsplash.com/@dylandej",
      originalPhotoUrl: "https://unsplash.com/photos/pe9T1lzjkZs"
    }
  },

  // Beer
  {
    name: "IPA",
    description: "Hoppy India Pale Ale with citrus and pine notes",
    price: 7.00,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop",
    category: "BEER",
    ingredients: "Hops, Malt, Yeast, Water",
    abv: 6.2,
    isPopular: true,
    photoCredit: {
      photographer: "Elevate",
      photographerUrl: "https://unsplash.com/@elevatebeer",
      originalPhotoUrl: "https://unsplash.com/photos/nYgy58eb9aw"
    }
  },
  {
    name: "Lager",
    description: "Crisp and clean bottom-fermented beer",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop",
    category: "BEER",
    ingredients: "Pilsner Malt, Noble Hops, Lager Yeast, Water",
    abv: 4.8,
    isPopular: true,
    photoCredit: {
      photographer: "Jarek Ceborski",
      photographerUrl: "https://unsplash.com/@jarekceb",
      originalPhotoUrl: "https://unsplash.com/photos/jn7uVeCdf6U"
    }
  },
  {
    name: "Wheat Beer",
    description: "Smooth and cloudy beer made with wheat",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop",
    category: "BEER",
    ingredients: "Wheat, Barley Malt, Hops, Yeast",
    abv: 5.1,
    isPopular: false,
    photoCredit: {
      photographer: "Henrique Felix",
      photographerUrl: "https://unsplash.com/@henriqueflix",
      originalPhotoUrl: "https://unsplash.com/photos/uGak0_44WAI"
    }
  },
  {
    name: "Stout",
    description: "Rich, dark beer with roasted malt flavors",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop",
    category: "BEER",
    ingredients: "Roasted Malt, Hops, Yeast, Water",
    abv: 5.8,
    isPopular: true,
    photoCredit: {
      photographer: "Adam Wilson",
      photographerUrl: "https://unsplash.com/@fourcolourblack",
      originalPhotoUrl: "https://unsplash.com/photos/6UIonphZA5o"
    }
  },

  // Wine
  {
    name: "Cabernet Sauvignon",
    description: "Full-bodied red wine with blackcurrant and oak notes",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop",
    category: "WINE",
    ingredients: "Cabernet Sauvignon Grapes",
    abv: 13.5,
    isPopular: true,
    photoCredit: {
      photographer: "Kym Ellis",
      photographerUrl: "https://unsplash.com/@kymellis",
      originalPhotoUrl: "https://unsplash.com/photos/K4mSJ7kc0As"
    }
  },
  {
    name: "Chardonnay",
    description: "Crisp white wine with apple and citrus flavors",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop",
    category: "WINE",
    ingredients: "Chardonnay Grapes",
    abv: 12.5,
    isPopular: true,
    photoCredit: {
      photographer: "Hermes Rivera",
      photographerUrl: "https://unsplash.com/@hermez777",
      originalPhotoUrl: "https://unsplash.com/photos/ahHn7hbCj9g"
    }
  },
  {
    name: "Pinot Noir",
    description: "Light to medium-bodied red with cherry and earth notes",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop",
    category: "WINE",
    ingredients: "Pinot Noir Grapes",
    abv: 12.8,
    isPopular: false,
    photoCredit: {
      photographer: "Neha Deshmukh",
      photographerUrl: "https://unsplash.com/@nehad123",
      originalPhotoUrl: "https://unsplash.com/photos/E4g3qXch8xw"
    }
  },

  // Spirits
  {
    name: "Single Malt Scotch",
    description: "Aged Scottish whisky from a single distillery",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop",
    category: "SPIRIT",
    ingredients: "Malted Barley, Water, Yeast",
    abv: 43.0,
    isPopular: true,
    photoCredit: {
      photographer: "Ambitious Creative Co",
      photographerUrl: "https://unsplash.com/@ambitiousco",
      originalPhotoUrl: "https://unsplash.com/photos/Rick_Gush"
    }
  },
  {
    name: "Vodka",
    description: "Clean, neutral spirit perfect for mixing",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop",
    category: "SPIRIT",
    ingredients: "Grain or Potato, Water",
    abv: 40.0,
    isPopular: true,
    photoCredit: {
      photographer: "Adam Jaime",
      photographerUrl: "https://unsplash.com/@adamjaime",
      originalPhotoUrl: "https://unsplash.com/photos/dmkmrNptMpw"
    }
  },
  {
    name: "Tequila Blanco",
    description: "Unaged tequila with bright agave flavors",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop",
    category: "SPIRIT",
    ingredients: "Blue Agave",
    abv: 38.0,
    isPopular: false,
    photoCredit: {
      photographer: "Stanislav Ivanitskiy",
      photographerUrl: "https://unsplash.com/@ivanitskiy",
      originalPhotoUrl: "https://unsplash.com/photos/yCVgn4hP0Oo"
    }
  }
]

async function main() {
  console.log('Starting seed...')
  
  // Clear existing data
  await prisma.drink.deleteMany()
  await prisma.photoCredit.deleteMany()
  
  console.log('Cleared existing data')
  
  // Create drinks with photo credits
  for (const drink of drinkData) {
    const { photoCredit, ...drinkInfo } = drink
    
    await prisma.drink.create({
      data: {
        ...drinkInfo,
        photoCredit: {
          create: photoCredit
        }
      }
    })
  }
  
  console.log(`Created ${drinkData.length} drinks with photo credits`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })