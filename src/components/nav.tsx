"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { NavLink } from "./nav-link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useState } from "react";
import Link from "next/link";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50">
      <NavigationMenu.Root className="relative z-10 flex w-full justify-between items-center p-4">
        <div className="flex items-center space-x-6">
          <NavLink
            href="/"
            exact
            className="text-2xl md:text-3xl font-medium tracking-wide px-2 py-1"
          >
            <span
              style={{ fontFamily: "var(--font-luxurious-script), cursive" }}
              className="inline-block animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0"
            >
              Zephyr
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu.List className="hidden md:flex items-center space-x-4">
          <NavigationMenu.Item>
            <SignedIn>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </SignedIn>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <ThemeToggle />
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="flex flex-col space-y-1">
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>

        <NavigationMenu.Viewport className="absolute left-0 top-full flex justify-center w-full" />
      </NavigationMenu.Root>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Navigation */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l shadow-xl z-50 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-semibold">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <nav className="flex flex-col p-4 space-y-4 flex-1">
            <Link 
              href="/" 
              className="block py-3 px-4 text-lg hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <SignedIn>
              <Link 
                href="/dashboard" 
                className="block py-3 px-4 text-lg hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
            
            <div className="pt-4 mt-4 border-t space-y-4">
              <div 
                className="flex items-center justify-between py-3 px-4 hover:bg-accent rounded-lg transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const themeButton = e.currentTarget.querySelector('button');
                  if (themeButton) themeButton.click();
                }}
              >
                <span className="text-lg">Theme</span>
                <ThemeToggle />
              </div>
              
              <SignedOut>
                <div onClick={() => setIsMobileMenuOpen(false)}>
                  <SignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <div 
                  className="flex items-center justify-between py-3 px-4 hover:bg-accent rounded-lg transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const userButton = e.currentTarget.querySelector('[data-testid="user-button"]') || 
                                      e.currentTarget.querySelector('button');
                    if (userButton && userButton instanceof HTMLElement) {
                      userButton.click();
                    }
                  }}
                >
                  <span className="text-lg">Account</span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
