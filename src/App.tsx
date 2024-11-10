import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, FileTextOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import store from './state/store';
import Dashboard from './pages/Dashboard';
import BillTrackingApp from './pages/BillTrackingApp';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeContextProvider } from './contexts/ThemeContext';
import SettingsMenu from './pages/SettingsMenu';
import { useTheme } from './contexts/ThemeContext';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <InnerApp />
      </ThemeContextProvider>
    </Provider>
  );
};

const InnerApp: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff' }}>
        <Sider collapsible theme={theme === 'dark' ? 'dark' : 'light'}>
          <div className="logo" style={{ color: theme === 'dark' ? '#ffffff' : 'black', padding: '20px', textAlign: 'center' }}>
             Bill Management System
          </div>
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
        </Sider>
        <Layout>
          <Header style={{ background: theme === 'dark' ? '#141414' : '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          </Header>
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

export default App;
