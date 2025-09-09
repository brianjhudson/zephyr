"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetchDrinks, fetchDrinksByCategory, fetchPopularDrinks, type Drink } from "@/lib/api/drinks";
import { DrinksListSkeleton } from "@/components/ui/skeleton";

interface DrinksListProps {
  category?: string;
  showPopularOnly?: boolean;
}

const fetcher = {
  all: () => fetchDrinks(),
  category: (category: string) => fetchDrinksByCategory(category),
  popular: () => fetchPopularDrinks(),
};

export function DrinksList({ category, showPopularOnly = false }: DrinksListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const getSwrKey = () => {
    if (showPopularOnly) return "drinks-popular";
    if (selectedCategory === "all") return "drinks-all";
    return `drinks-${selectedCategory}`;
  };

  const getFetcher = () => {
    if (showPopularOnly) return fetcher.popular;
    if (selectedCategory === "all") return fetcher.all;
    return () => fetcher.category(selectedCategory);
  };

  const {
    data: drinks,
    error,
    isLoading,
    mutate
  } = useSWR<Drink[]>(getSwrKey(), getFetcher(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
  });

  const categories = [
    { value: "all", label: "All Drinks" },
    { value: "cocktail", label: "Cocktails" },
    { value: "beer", label: "Beer" },
    { value: "wine", label: "Wine" },
    { value: "spirit", label: "Spirits" },
  ];

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await mutate();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Failed to load drinks</p>
        <button
          onClick={handleRefresh}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with category filter */}
      {!showPopularOnly && (
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h2 className="text-2xl font-semibold">Our Drinks</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showPopularOnly && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Popular Drinks</h2>
          <button
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            data-testid="refresh-button"
          >
            {(isLoading || isRefreshing) ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && <DrinksListSkeleton />}

      {/* Drinks grid */}
      {!isLoading && drinks && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && drinks && drinks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No drinks found in this category</p>
        </div>
      )}
    </div>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow" data-testid="drink-card">
      <div className="relative h-48 w-full">
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {drink.isPopular && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{drink.name}</h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
            {drink.abv}% ABV
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {drink.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {drink.ingredients.slice(0, 3).map((ingredient, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
            >
              {ingredient}
            </span>
          ))}
          {drink.ingredients.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{drink.ingredients.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold">${drink.price}</span>
          <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors">
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}