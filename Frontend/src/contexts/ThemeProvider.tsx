
"use client"; 

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the possible theme values
type Theme = 'light' | 'dark' | 'system';

// Define the shape of our context state
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Create the context with a default value
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// Define the props for our provider component
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    // Determine the effective theme
    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    
    // Add the current theme class to the root <html> element
    root.classList.add(effectiveTheme);
    
    // Store the user's preference (light, dark, or system)
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}


// Custom hook to easily use the theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};