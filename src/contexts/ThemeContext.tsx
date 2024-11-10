import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeContextType } from '../types/ThemeContextType'; // Import the type
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageHelper';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = loadFromLocalStorage<string>('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    saveToLocalStorage('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme === 'light' ? '#1890ff' : '#1f1f1f',
            colorBgContainer: theme === 'light' ? '#ffffff' : '#141414',
            colorText: theme === 'light' ? '#000000' : '#ffffff',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};
