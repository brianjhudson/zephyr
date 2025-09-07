'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    let initialDark = false
    if (savedTheme) {
      initialDark = savedTheme === 'dark'
    } else {
      initialDark = systemPrefersDark
    }

    setIsDark(initialDark)
    
    // Apply initial theme immediately
    if (initialDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Update theme when state changes
  useEffect(() => {
    if (!mounted) return

    // Apply theme to document element
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="inline-flex items-center justify-center rounded-md p-2 w-10 h-10">
        <div className="h-4 w-4 animate-pulse bg-gray-300 rounded" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <SunIcon className="h-4 w-4 transition-transform duration-300" />
      ) : (
        <MoonIcon className="h-4 w-4 transition-transform duration-300" />
      )}
    </button>
  )
}