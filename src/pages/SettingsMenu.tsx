import React from 'react';
import { Layout, Card, Typography } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import AppearanceSettings from '../features/settings/AppearanceSettings';
import LanguageSettings from '../features/settings/LanguageSettings';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const SettingsMenu: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff' }}>
      <Header
        style={{
          backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={2} style={{ margin: 0, color: theme === 'dark' ? '#ffffff' : '#000000' }}>
          Settings
        </Title>
      </Header>
      <Content style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '12px',
            boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
          }}
          bodyStyle={{ padding: '20px' }}
        >
          <AppearanceSettings />
          <LanguageSettings />
        </Card>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5',
          color: theme === 'dark' ? '#ffffff' : '#000000',
        }}
      >
        ©2024 Bill Management System
      </Footer>
    </Layout>
  );
};

export default SettingsMenu;
