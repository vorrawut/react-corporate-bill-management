import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import Dashboard from '../pages/Dashboard';
import BillTrackingApp from '../pages/BillTrackingApp';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';
import SettingsMenu from '../pages/SettingsMenu';

const { Content, Footer, Sider } = Layout;

const InnerApp: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff' }}>
        <Sider collapsible theme={theme === 'dark' ? 'dark' : 'light'}>
          <div className="logo" style={{ color: theme === 'dark' ? '#ffffff' : 'black', padding: '20px', textAlign: 'center' }}>
            Bill Management System
          </div>
          <SideMenu collapsed={false} />
        </Sider>
        <Layout>
          <TopBar />
          <Content style={{ margin: '16px', padding: '20px', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000', borderRadius: '8px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bills" element={<BillTrackingApp />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/settings" element={<SettingsMenu />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
            Bill Management System ©2024
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default InnerApp;