import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import Dashboard from '../../pages/Dashboard';
import BillTrackingApp from '../../pages/BillTrackingApp';
import LoginPage from '../../pages/login/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import SideMenu from './SideMenu';
import TopBar from './TopBar';
import SettingsMenu from '../../pages/SettingsMenu';

const { Content, Footer, Sider } = Layout;

const InnerApp: React.FC = () => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f8f9fb' }}>

        {/* Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={theme === 'dark' ? 'dark' : 'light'}
          width={250}
          collapsedWidth={80}
          style={{
            transition: 'all 0.4s ease-in-out',
            boxShadow: theme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #1f1f1f, #2b2b2b)'
              : 'linear-gradient(135deg, #ffffff, #e6e9f0)',
          }}
        >
          {/* Logo */}
          <div
            className="logo"
            style={{
              color: theme === 'dark' ? '#ffffff' : '#000000',
              padding: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: collapsed ? '1.5rem' : '1.2rem',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {!collapsed ? "Bill Management System" : "BMS"}
          </div>

          {/* Side Menu */}
          <SideMenu collapsed={collapsed} />
        </Sider>

        {/* Main Layout */}
        <Layout
          style={{
            transition: 'all 0.4s ease-in-out',
            overflow: 'hidden',
          }}
        >
          {/* TopBar with Sidebar Toggle Button */}
          <div
            style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme === 'dark' ? '#141414' : '#ffffff',
              padding: '0 24px',
              borderBottom: theme === 'dark' ? '1px solid #333' : '1px solid #ddd',
              boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.4s ease-in-out',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '1.5rem',
                color: theme === 'dark' ? '#ffffff' : '#000000',
                transition: 'color 0.3s ease',
              }}
            />
            <TopBar />
          </div>

          {/* Content */}
          <Content
            style={{
              margin: '24px 16px',
              padding: '24px',
              backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#000000',
              borderRadius: '10px',
              boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bills" element={<BillTrackingApp />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/settings" element={<SettingsMenu />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Content>

          {/* Footer */}
          <Footer
            style={{
              textAlign: 'center',
              backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5',
              color: theme === 'dark' ? '#ffffff' : '#000000',
              padding: '12px 20px',
              borderTop: theme === 'dark' ? '1px solid #333' : '1px solid #ddd',
              transition: 'all 0.4s ease',
            }}
          >
            Bill Management System ©2024
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default InnerApp;
