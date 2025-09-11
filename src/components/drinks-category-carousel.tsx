"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetchDrinksByCategory, type Drink } from "@/lib/api/drinks";

interface DrinksCategoryCarouselProps {
  category: 'cocktail' | 'beer' | 'wine' | 'spirit';
  title: string;
}

const categoryLabels = {
  cocktail: "Cocktails",
  beer: "Beer",
  wine: "Wine",
  spirit: "Spirits"
};

export function DrinksCategoryCarousel({ category, title }: DrinksCategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: drinks, error, isLoading } = useSWR(
    `drinks-${category}`,
    () => fetchDrinksByCategory(category),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  );

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.desktop;
    if (window.innerWidth < 768) return itemsPerView.mobile;
    if (window.innerWidth < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = drinks ? Math.max(0, drinks.length - currentItemsPerView) : 0;

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (dragOffset > threshold) {
      prevSlide();
    } else if (dragOffset < -threshold) {
      nextSlide();
    }

    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  if (error) {
    return (
      <div className="py-8">
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load {categoryLabels[category].toLowerCase()}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-8">
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow-sm border overflow-hidden animate-pulse">
              <div className="h-48 w-full bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!drinks || drinks.length === 0) {
    return (
      <div className="py-8">
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No {categoryLabels[category].toLowerCase()} available</p>
        </div>
      </div>
    );
  }

  const translateX = -currentIndex * (100 / currentItemsPerView) + (isDragging ? (dragOffset / carouselRef.current!.offsetWidth) * 100 : 0);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        
        {drinks.length > currentItemsPerView && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Previous drinks"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Next drinks"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div 
        ref={carouselRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing group"
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(${translateX}%)`,
            width: `${(drinks.length / currentItemsPerView) * 100}%`
          }}
        >
          {drinks.map((drink) => (
            <div 
              key={drink.id} 
              className="px-3 flex-shrink-0"
              style={{ width: `${100 / drinks.length}%` }}
            >
              <DrinkCard drink={drink} />
            </div>
          ))}
        </div>

        {/* Overlay Navigation Arrows */}
        {drinks.length > currentItemsPerView && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous drinks"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next drinks"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

    </div>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow select-none" data-testid="drink-card">
      <div className="relative h-48 w-full">
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {drink.isPopular && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            Popular
          </div>
        )}
        <div className="absolute bottom-2 right-2 text-white/70 text-xs">
          Photo by{" "}
          <a
            href={drink.photoCredit.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            {drink.photoCredit.photographer}
          </a>
          {" · "}
          <a
            href={drink.photoCredit.originalPhotoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            View original
          </a>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-lg">{drink.name}</h4>
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