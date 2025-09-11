"use client";

import { Suspense } from "react";
import { DrinksList } from "@/components/drinks-list";
import { DrinksCategoryCarousel } from "@/components/drinks-category-carousel";
import { DrinksListSkeleton } from "@/components/ui/skeleton";

interface DrinksSectionProps {
  category?: string;
  showPopularOnly?: boolean;
  title?: string;
  useCarousel?: boolean;
}

export function DrinksSection({ category, showPopularOnly = false, title, useCarousel = false }: DrinksSectionProps) {
  if (useCarousel) {
    const categories: Array<{ key: 'cocktail' | 'beer' | 'wine' | 'spirit', title: string }> = [
      { key: 'cocktail', title: 'Cocktails' },
      { key: 'beer', title: 'Beer' },
      { key: 'wine', title: 'Wine' },
      { key: 'spirit', title: 'Spirits' }
    ];

    return (
      <section className="py-8">
        {title && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center">{title}</h2>
          </div>
        )}
        
        <div className="space-y-8">
          {categories.map((cat) => (
            <DrinksCategoryCarousel
              key={cat.key}
              category={cat.key}
              title={cat.title}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">{title}</h2>
        </div>
      )}
      
      <Suspense fallback={<DrinksListSkeleton />}>
        <DrinksList category={category} showPopularOnly={showPopularOnly} />
      </Suspense>
    </section>
  );
}

// Alternative server component wrapper for static data
export async function DrinksSectionServer({ category, showPopularOnly = false, title }: DrinksSectionProps) {
  return (
    <section className="py-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">{title}</h2>
        </div>
      )}
      
      <Suspense fallback={<DrinksListSkeleton />}>
        <DrinksList category={category} showPopularOnly={showPopularOnly} />
      </Suspense>
    </section>
  );
}