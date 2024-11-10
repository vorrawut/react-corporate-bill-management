import React from 'react';
import { Typography } from 'antd';
import './StyledText.css';

const { Title, Text } = Typography;

interface StyledTextProps {
  darkMode: boolean;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5; // Restrict to the valid levels for Ant Design Title
}

export const StyledTitle: React.FC<StyledTextProps> = ({ darkMode, children, level = 2 }) => {
  return (
    <Title level={level} className={`styled-title ${darkMode ? 'dark-mode' : ''}`}>
      {children}
    </Title>
  );
};

export const StyledText: React.FC<StyledTextProps> = ({ darkMode, children }) => {
  return <Text className={`styled-text ${darkMode ? 'dark-mode' : ''}`}>{children}</Text>;
};
