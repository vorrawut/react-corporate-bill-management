import React, { useEffect, useState } from 'react';
import { Typography, Tooltip, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorageHelper';

const { Title, Text } = Typography;

const AppearanceSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const savedTheme = loadFromLocalStorage<string>('theme');
    if (savedTheme && savedTheme !== theme) {
      toggleTheme();
    }
    setInitialLoad(false);
  }, [theme, toggleTheme]);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    saveToLocalStorage('theme', newTheme);
    toggleTheme(); // Call the toggle function to update the theme in the app
  };

  if (initialLoad) {
    return null; // Optionally, return a loading state while checking local storage
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <Title level={4} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Appearance</Title>
      <Text style={{ display: 'block', marginBottom: '10px', color: theme === 'dark' ? '#d1d1d1' : '#333' }}>
        Toggle between light and dark mode:
      </Text>
      <Tooltip title="Toggle Dark/Light Mode">
        <Switch
          checked={theme === 'dark'}
          onChange={handleThemeChange}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
      </Tooltip>
    </div>
  );
};

export default AppearanceSettings;
