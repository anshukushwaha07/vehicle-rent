"use client";

import { useTheme } from '../contexts/ThemeProvider';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground/70">Theme:</span>
      <div className="flex border border-foreground/20 rounded-md overflow-hidden">
        <button 
          onClick={() => setTheme('light')}
          className={`px-3 py-1 text-sm transition-colors ${
            theme === 'light' 
              ? 'bg-primary text-white' 
              : 'bg-background text-foreground hover:bg-secondary'
          }`}
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className={`px-3 py-1 text-sm transition-colors ${
            theme === 'dark' 
              ? 'bg-primary text-white' 
              : 'bg-background text-foreground hover:bg-secondary'
          }`}
        >
          Dark
        </button>
        <button 
          onClick={() => setTheme('system')}
          className={`px-3 py-1 text-sm transition-colors ${
            theme === 'system' 
              ? 'bg-primary text-white' 
              : 'bg-background text-foreground hover:bg-secondary'
          }`}
        >
          System
        </button>
      </div>
    </div>
  );
}