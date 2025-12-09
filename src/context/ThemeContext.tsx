// src/context/ThemeContext.tsx
import React, { createContext, useEffect, useState } from 'react';

// Define the shape of our context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: (checked: boolean) => void;
};

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Initialize State from LocalStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // 2. The Toggle Function
  const toggleTheme = (checked: boolean) => {
    console.log("Toggling Theme to:", checked ? "Dark" : "Light"); // Debug Log
    setIsDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  // 3. Effect: Applies the class to the <body> tag
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};