"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface DrinkSlide {
  id: number;
  image: string;
  alt: string;
  heading: string;
  subheading: string;
}

const drinkSlides: DrinkSlide[] = [
  {
    id: 1,
    image: "https://zephyr-images.brianjhudson.com/bar-sophisticated-hero.jpeg",
    alt: "Elegant cocktail with garnish",
    heading: "Crafted to Perfection",
    subheading:
      "Each cocktail is meticulously prepared with premium spirits and fresh ingredients, delivering an unforgettable taste experience.",
  },
  {
    id: 2,
    image: "https://zephyr-images.brianjhudson.com/cocktail-elegant-hero.jpeg",
    alt: "Sophisticated bar atmosphere",
    heading: "Refined Sophistication",
    subheading:
      "Step into a world of luxury where every detail is designed to elevate your evening with timeless elegance.",
  },
  {
    id: 3,
    image:
      "https://zephyr-images.brianjhudson.com/mixologist-artisan-hero.jpeg",
    alt: "Artisanal cocktail preparation",
    heading: "Artisan Excellence",
    subheading:
      "Our master mixologists blend tradition with innovation, creating signature drinks that delight the senses.",
  },
];

export function DrinksCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || !isMounted) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % drinkSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMounted]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds (only on client)
    if (isMounted) {
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % drinkSlides.length);
    setIsAutoPlaying(false);
    if (isMounted) {
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + drinkSlides.length) % drinkSlides.length
    );
    setIsAutoPlaying(false);
    if (isMounted) {
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden bg-muted"
      data-testid="drinks-carousel"
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {drinkSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h2
                  className={`text-4xl md:text-6xl font-bold mb-6 tracking-wide transition-all duration-1000 ${
                    index === currentSlide
                      ? "animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] opacity-0"
                      : "opacity-0"
                  }`}
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                  }}
                >
                  {slide.heading}
                </h2>
                <p
                  className={`text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto transition-all duration-1000 ${
                    index === currentSlide
                      ? "animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0"
                      : "opacity-0"
                  }`}
                >
                  {slide.subheading}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {drinkSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
