import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DashboardOutlined, FileTextOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const { theme } = useTheme();

  return (
    <Menu theme={theme === 'dark' ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextOutlined />}>
        <Link to="/bills">Bill Tracking</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
