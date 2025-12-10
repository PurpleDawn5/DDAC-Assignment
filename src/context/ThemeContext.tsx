import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Define the type
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: (checked: boolean) => void;
};

// 2. Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create Provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

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

// 4. THIS IS YOUR MISSING HOOK 👇
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};