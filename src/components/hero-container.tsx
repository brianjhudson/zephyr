"use client";

import { useState, useEffect } from "react";
import { drinksService } from "@/services/drinks-service";
import { Hero } from "@/components/hero";
import { FeaturedDrink } from "@/services/drinks-service";

export function HeroContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredDrinks, setFeaturedDrinks] = useState<FeaturedDrink[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadFeaturedDrinks();
  }, []);

  useEffect(() => {
    if (featuredDrinks.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredDrinks.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [featuredDrinks.length]);

  // Reset animation when slide changes
  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      if (!imageLoaded[currentSlide]) {
        // Trigger a re-render to check if image is already loaded
        setImageLoaded((prev) => ({ ...prev }));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const loadFeaturedDrinks = async () => {
    try {
      const featuredDrinks = await drinksService.getFeaturedDrinks();
      setFeaturedDrinks(featuredDrinks);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredDrinks.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredDrinks.length) % featuredDrinks.length
    );
  };
  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };
  return (
    <Hero
      loading={loading}
      featuredDrinks={featuredDrinks}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
      imageLoaded={imageLoaded}
      handleImageLoad={handleImageLoad}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
    />
  );
}
