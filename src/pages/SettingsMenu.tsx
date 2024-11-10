import React from 'react';
import { Layout, Card, Typography, Divider } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import AppearanceSettings from '../features/settings/AppearanceSettings';
import LanguageSettings from '../features/settings/LanguageSettings';

const { Header, Content } = Layout;
const { Title } = Typography;

const SettingsMenu: React.FC = () => {
  const { theme } = useTheme();

  // Array of settings components, useful for dynamic rendering and maintaining scalability
  const settingsComponents = [
    { key: 'appearance', component: <AppearanceSettings /> },
    { key: 'language', component: <LanguageSettings /> },
    // Additional settings components can be added here
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff' }}>
      <Header
        style={{
          backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'center',
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
            padding: '20px',
          }}
        >
          {settingsComponents.map((setting, index) => (
            <React.Fragment key={setting.key}>
              {setting.component}
              {index < settingsComponents.length - 1 && (
                <Divider
                  style={{
                    borderColor: theme === 'dark' ? '#2b2b2b' : '#e0e0e0',
                    margin: '20px 0',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Card>
      </Content>
    </Layout>
  );
};

export default SettingsMenu;
