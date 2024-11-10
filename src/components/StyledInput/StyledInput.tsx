import React from 'react';
import { Input, InputProps } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import './StyledInput.css'; // Add CSS for dark mode

interface StyledInputProps extends InputProps {
  darkMode?: boolean;
}

const StyledInput: React.FC<StyledInputProps> = (props) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Input
      {...props}
      className={`styled-input ${isDarkMode ? 'dark-mode' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        border: isDarkMode ? '1px solid #555' : '1px solid #d9d9d9',
      }}
    />
  );
};

export default StyledInput;
