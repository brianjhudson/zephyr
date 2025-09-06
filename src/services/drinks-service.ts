export interface Drink {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  alcoholContent: string;
  image: string;
  isRecommended: boolean;
  isAvailable: boolean;
}
export type FeaturedDrink = Pick<
  Drink,
  "id" | "description" | "name" | "image"
>;

const BASE_URL = "/";

class DrinksService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please sign in to perform this admin operation.");
        }
        throw new Error(
          "We were unable to complete the action. Please try again."
        );
      }
      const data: T = await response.json();
      return data;
    } catch (e) {
      throw new Error(
        "We were unable to complete the action. Please try again."
      );
    }
  }
  async getFeaturedDrinks(): Promise<FeaturedDrink[]> {
    // return this.makeRequest<Drink[]>('/drinks/available');
    return new Promise((resolve) =>
      resolve([
        {
          id: "lounge-1",
          name: "Welcome to Zephyr",
          description:
            "Experience the finest in sophisticated dining and expertly crafted cocktails in our elegant atmosphere.",
          image:
            "https://images.unsplash.com/photo-1734771959731-4389939c0342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29ja3RhaWwlMjBiYXIlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc1NjY3OTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "lounge-2",
          name: "Premium Spirits Collection",
          description:
            "Our curated selection features the world's finest spirits, carefully chosen for discerning palates.",
          image:
            "https://images.unsplash.com/photo-1698365004793-6b62e92d9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3Bpcml0cyUyMGJvdHRsZXMlMjBiYXJ8ZW58MXx8fHwxNzU2Njc5OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "lounge-3",
          name: "Sophisticated Ambiance",
          description:
            "Relax and unwind in our refined lounge setting, where every detail is designed for your comfort.",
          image:
            "https://images.unsplash.com/photo-1624665551562-80872b7df27a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3VuZ2UlMjBjb2NrdGFpbCUyMGdsYXNzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTY2Nzk5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ])
    );
  }
}
export const drinksService = new DrinksService();
