import React from 'react';
import { Layout, Dropdown, Button, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const TopBar: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Define a menu structure for the settings dropdown
  const menuItems = [
    { key: '1', label: 'Settings Page', onClick: () => navigate('/settings') },
    { key: '2', label: 'Profile Settings' },
    { key: '3', label: 'Account Preferences' },
    { key: '4', label: 'Logout' }
  ];

  // Create menu items dynamically
  const settingsMenu = (
    <Menu
      style={{
        minWidth: 160,
        backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {menuItems.map((item, index) => (
        <Menu.Item
          key={`TopBar_${index}`} // Unique key with class name prefix and index
          style={{
            color: theme === 'dark' ? '#ffffff' : '#000000',
            padding: '10px 20px'
          }}
          onClick={item.onClick}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header
      style={{
        background: theme === 'dark' ? '#141414' : '#fff',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ flexGrow: 1 }}> {/* Placeholder for any future header content */}</div>
      <Dropdown overlay={settingsMenu} trigger={['click']} placement="bottomRight" arrow>
        <Button
          type="text"
          icon={<SettingOutlined />}
          style={{
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }}
        >
          Settings
        </Button>
      </Dropdown>
    </Header>
  );
};

export default TopBar;
