import React from 'react';
import { Menu, Tooltip, Avatar, Badge, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalTranslation } from 'src/contexts/TranslationContext';

const { SubMenu } = Menu;

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const { theme } = useTheme();
  const t = useGlobalTranslation();

  // User Profile Dropdown Menu
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">{t('Profile')}</Link> {/* Translated label */}
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">{t('Settings')}</Link> {/* Translated label */}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/logout">{t('Logout')}</Link> {/* Translated label */}
      </Menu.Item>
    </Menu>
  );

  // Define the menu items
  const menuItems = [
    {
      key: 'dashboard',
      icon: (
        <DashboardOutlined
          style={{
            fontSize: '1.5rem',
          }}
        />
      ),
      label: collapsed ? null : <Link to="/">{t('Dashboard')}</Link>, // Translated label
    },
    {
      key: 'billTracking',
      icon: (
        <Tooltip title={collapsed ? t('Bill Tracking') : ''} placement="right">
          <Badge count={5} size="small" offset={[10, 0]}>
            <FileTextOutlined
              style={{
                fontSize: '1.5rem',
              }}
            />
          </Badge>
        </Tooltip>
      ),
      label: collapsed ? null : <Link to="/bills">{t('Bill Tracking')}</Link>, // Translated label
    },
    {
      key: 'notifications',
      icon: (
        <Tooltip title={collapsed ? t('Notifications') : ''} placement="right">
          <Badge count={3} size="small" offset={[10, 0]}>
            <NotificationOutlined
              style={{
                fontSize: '1.5rem',
              }}
            />
          </Badge>
        </Tooltip>
      ),
      label: collapsed ? null : <Link to="/notifications">{t('Notifications')}</Link>, // Translated label
    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        background: theme === 'dark' ? '#1f1f1f' : '#ffffff',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Profile Section */}
      <div
        style={{
          textAlign: 'center',
          padding: collapsed ? '20px 0' : '30px 10px',
          transition: 'padding 0.4s ease',
          cursor: 'pointer',
        }}
      >
        <Dropdown overlay={profileMenu} placement="bottomCenter">
          <Avatar
            size={collapsed ? 40 : 60}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#1890ff',
              transition: 'all 0.4s ease',
              boxShadow: collapsed ? '' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Dropdown>
        {!collapsed && (
          <div style={{ color: theme === 'dark' ? '#ffffff' : '#000000', marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>John Doe</span>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa' }}>@johndoe</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <Menu
        theme={theme === 'dark' ? 'dark' : 'light'}
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{
          borderRadius: '15px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{
              marginBottom: '12px', // Uniform gap between items
              height: '60px', // Uniform height to ensure consistency
              display: 'flex',
              alignItems: 'center', // Vertical center alignment for both icon and label
              justifyContent: collapsed ? 'center' : 'flex-start', // Center items when collapsed
              lineHeight: 'normal',
            }}
          >
            {item.label}
          </Menu.Item>
        ))}

        {/* Collapsible Submenu */}
        <SubMenu
          key="settings"
          icon={
            <SettingOutlined
              style={{
                fontSize: '1.5rem',
              }}
            />
          }
          title={!collapsed ? t('Settings') : ''}
          style={{
            marginBottom: '12px', // Gap between SubMenu and other items
            height: '60px',
            display: 'flex',
            alignItems: 'center', // Align icon vertically in the submenu
          }}
        >
          <Menu.Item key="settings:1">
            <Link to="/settings/general">{t('General Settings')}</Link> {/* Translated label */}
          </Menu.Item>
          <Menu.Item key="settings:2">
            <Link to="/settings/security">{t('Security')}</Link> {/* Translated label */}
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideMenu;