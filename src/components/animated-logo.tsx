"use client";
import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  isScrolled: boolean;
  className?: string;
}

export function AnimatedLogo({
  isScrolled,
  className = "",
}: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <h1
        className={`text-2xl md:text-3xl transition-all duration-300 ${
          isScrolled
            ? "text-foreground"
            : "text-background dark:text-foreground"
        }`}
        style={{
          fontFamily: "'Luxurious Script', cursive",
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s, color 0.3s ease",
          letterSpacing: "0.05em",
          textShadow: isScrolled
            ? "none"
            : "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        Zephyr
      </h1>

      {/* Optional decorative underline */}
      <div
        className={`absolute -bottom-2 left-1/2 h-0.5 transition-all duration-500 ${
          isScrolled ? "bg-foreground" : "bg-background dark:bg-foreground"
        }`}
        style={{
          width: isAnimating ? "80%" : "0%",
          transform: "translateX(-50%)",
          transition: "width 1.2s ease-out 1.8s, background 0.3s ease",
        }}
      />
    </div>
  );
}
