"use client";

import { Suspense } from "react";
import { DrinksList } from "@/components/drinks-list";
import { DrinksListSkeleton } from "@/components/ui/skeleton";

interface DrinksSectionProps {
  category?: string;
  showPopularOnly?: boolean;
  title?: string;
}

export function DrinksSection({ category, showPopularOnly = false, title }: DrinksSectionProps) {
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