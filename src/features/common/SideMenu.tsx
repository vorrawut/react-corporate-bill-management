import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DashboardOutlined, FileTextOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ }) => {
  const { theme } = useTheme();

  return (
    <Menu theme={theme === 'dark' ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextOutlined />}>
        <Link to="/bills">Bill Tracking</Link>
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
