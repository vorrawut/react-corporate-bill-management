// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, FileTextOutlined, LoginOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import store from './state/store';
import Dashboard from './pages/Dashboard';
import BillTrackingApp from './pages/BillTrackingApp';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import {ThemeContextProvider} from './contexts/ThemeContext';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
              <div className="logo" style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
                Bill Manager
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                  <Link to="/">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FileTextOutlined />}>
                  <Link to="/bills">Bill Tracking</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LoginOutlined />}>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '16px' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bills" element={<BillTrackingApp />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Bill Management System ©2024</Footer>
            </Layout>
          </Layout>
        </Router>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
