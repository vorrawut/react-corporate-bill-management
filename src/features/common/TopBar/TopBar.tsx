import React from 'react';
import { Layout, Dropdown, Button, Menu, Avatar, Tooltip, Badge } from 'antd';
import { SettingOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.css';

const { Header } = Layout;

const TopBar: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Define a menu structure for the settings dropdown
  const menuItems = [
    { key: '1', label: 'Settings Page', onClick: () => navigate('/settings') },
    { key: '2', label: 'Profile Settings', onClick: () => navigate('/profile') },
    { key: '3', label: 'Account Preferences', onClick: () => navigate('/preferences') },
    { key: '4', label: 'Logout', onClick: () => navigate('/logout') }
  ];

  // Create menu items dynamically
  const settingsMenu = (
    <Menu
      className={`${styles.settingsMenu} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
      {menuItems.map((item, index) => (
        <Menu.Item
          key={`TopBar_${index}`} // Unique key with class name prefix and index
          className={`${styles.menuItem} ${theme === 'dark' ? styles.dark : styles.light}`}
          onClick={item.onClick}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header
      className={`${styles.topBar} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
      <div className={styles.headerPlaceholder}></div>

      {/* Notification Bell */}
      <Tooltip title="Notifications">
        <Badge count={3} size="small" offset={[0, 8]}>
          <Button
            type="text"
            icon={<BellOutlined />}
            className={`${styles.iconButton} ${theme === 'dark' ? styles.dark : styles.light}`}
          />
        </Badge>
      </Tooltip>

      {/* User Avatar */}
      <Tooltip title="Profile">
        <Avatar
          icon={<UserOutlined />}
          className={`${styles.avatar} ${theme === 'dark' ? styles.dark : styles.light}`}
          onClick={() => navigate('/profile')}
        />
      </Tooltip>

      {/* Settings Button */}
      <Dropdown overlay={settingsMenu} trigger={['click']} placement="bottomRight" arrow>
        <Tooltip title="Settings">
          <Button
            type="text"
            icon={<SettingOutlined />}
            className={`${styles.settingsButton} ${theme === 'dark' ? styles.dark : styles.light}`}
          >
            Settings
          </Button>
        </Tooltip>
      </Dropdown>
    </Header>
  );
};

export default TopBar;