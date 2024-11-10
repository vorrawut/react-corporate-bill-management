import React, { useEffect, useState } from 'react';
import { Typography, Tooltip, Switch, Row, Col, Card } from 'antd';
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
    toggleTheme();
  };

  if (initialLoad) {
    return null; // Optionally, return a loading state while checking local storage
  }

  return (
    <Card
      style={{
        borderRadius: '12px',
        padding: '20px',
        backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
        boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4} style={{ color: theme === 'dark' ? '#ffffff' : '#000000', marginBottom: '10px' }}>
            Appearance
          </Title>
          <Text style={{ color: theme === 'dark' ? '#d1d1d1' : '#333' }}>
            Toggle between light and dark mode:
          </Text>
        </Col>
        <Col>
          <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} placement="top">
            <Switch
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              style={{
                backgroundColor: theme === 'dark' ? '#4f4f4f' : '#f0f0f0',
                borderColor: theme === 'dark' ? '#4f4f4f' : '#d9d9d9',
                transition: 'all 0.3s ease',
              }}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

export default AppearanceSettings;
