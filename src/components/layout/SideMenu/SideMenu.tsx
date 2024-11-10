import React, { useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import SideMenuItems from './SideMenuItems';
import styles from './SideMenu.module.css';

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine default selected key based on URL
  const defaultKey = location.pathname.includes('bills')
    ? 'billTracking'
    : location.pathname.includes('notifications')
      ? 'notifications'
      : location.pathname.includes('settings')
        ? 'settings'
        : 'dashboard';

  // State to track which menu item is currently selected
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  // Get side menu items from the SideMenuItems function
  const menuItems = SideMenuItems(collapsed);

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    // Navigate based on the selected menu item
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <div className={`${styles.sideMenuContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      {/* Menu Items */}
      <Menu
        theme={theme === 'dark' ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        className={`${styles.menuContainer} ${theme === 'dark' ? styles.dark : ''}`}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className={`${styles.menuItem} ${selectedKey === item.key
              ? theme === 'dark'
                ? `${styles.menuItemSelected} ${styles.dark}`
                : styles.menuItemSelected
              : ''
              }`}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default SideMenu;
