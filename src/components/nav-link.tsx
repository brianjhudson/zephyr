"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}

export function NavLink({
  href,
  children,
  className,
  exact = false,
}: NavLinkProps) {
  const pathname = usePathname();

  // Determine if this link is active
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  // Special case for home route to avoid matching all routes
  const isHomeActive = href === "/" ? pathname === "/" : isActive;
  const finalIsActive = href === "/" ? isHomeActive : isActive;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className={cn(
          "relative hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2",
          finalIsActive && "text-primary",
          className
        )}
      >
        {children}
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-1000 ease-out",
            finalIsActive && isAnimating
              ? "w-[80%] opacity-100"
              : "w-0 opacity-0"
          )}
        />
      </Link>
    </NavigationMenu.Link>
  );
}
