import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { FeaturedDrink } from "@/services/drinks-service";

interface HeroProps {
  loading: boolean;
  featuredDrinks: FeaturedDrink[];
  imageLoaded: Record<number, boolean>;
  prevSlide: () => any;
  nextSlide: () => any;
  handleImageLoad: (index: number) => any;
  currentSlide: number;
  setCurrentSlide: (index: number) => any;
}

export function Hero({
  loading,
  featuredDrinks,
  imageLoaded,
  prevSlide,
  nextSlide,
  currentSlide,
  handleImageLoad,
  setCurrentSlide,
}: HeroProps) {
  if (loading) {
    return (
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading Zephyr...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-muted">
      {featuredDrinks.map((drink, index) => (
        <div
          key={drink.id}
          className={`absolute inset-0 transition-all duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full">
            <ImageWithFallback
              src={drink.image}
              alt={drink.name}
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight transition-all duration-1000 ease-out"
                  style={{
                    opacity:
                      imageLoaded[index] && index === currentSlide ? 1 : 0,
                    transform:
                      imageLoaded[index] && index === currentSlide
                        ? "translateY(0) scale(1)"
                        : "translateY(40px) scale(0.95)",
                    transitionDelay:
                      imageLoaded[index] && index === currentSlide
                        ? "0.4s"
                        : "0s",
                    textShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {drink.name}
                </h1>
                <p
                  className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out"
                  style={{
                    opacity:
                      imageLoaded[index] && index === currentSlide ? 1 : 0,
                    transform:
                      imageLoaded[index] && index === currentSlide
                        ? "translateY(0) scale(1)"
                        : "translateY(30px) scale(0.96)",
                    transitionDelay:
                      imageLoaded[index] && index === currentSlide
                        ? "0.8s"
                        : "0s",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {drink.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {featuredDrinks.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredDrinks.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
