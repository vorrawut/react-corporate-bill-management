import React from 'react';
import { Button, ButtonProps } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import './StyledButton.css'; // Add CSS for dark mode

interface StyledButtonProps extends ButtonProps {
  darkMode?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, ...props }) => {
  const { theme } = useTheme(); // Access the theme context for dark mode
  const isDarkMode = theme === 'dark';

  return (
    <Button
      {...props}
      className={`styled-button ${isDarkMode ? 'dark-mode' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#333' : '#1890ff',
        color: isDarkMode ? '#fff' : '#000',
        border: isDarkMode ? '1px solid #555' : '1px solid #1890ff',
      }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;