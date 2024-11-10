import React, { useState } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';
import ProfileMenu from './ProfileMenu';
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
      {/* Profile Section */}
      <div className={`${styles.profileSection} ${collapsed ? styles.collapsed : ''}`}>
        <Dropdown overlay={<ProfileMenu />} placement="bottomCenter">
          <Avatar
            size={collapsed ? 40 : 70}
            icon={<SettingOutlined />}
            className={`${styles.profileAvatar} ${collapsed ? styles.collapsed : ''}`}
          />
        </Dropdown>
        {!collapsed && (
          <div className={`${styles.profileInfo} ${theme === 'dark' ? styles.dark : ''}`}>
            <span className={styles.profileName}>John Doe</span>
            <p className={`${styles.profileHandle} ${theme === 'dark' ? styles.dark : ''}`}>@johndoe</p>
          </div>
        )}
      </div>

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
