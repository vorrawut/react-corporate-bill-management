import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ConfigProvider } from 'antd';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: theme === 'light' ? '#1890ff' : '#1f1f1f',
          colorBgContainer: theme === 'light' ? '#ffffff' : '#141414',
          colorText: theme === 'light' ? '#000000' : '#ffffff',
        },
      }}>
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
