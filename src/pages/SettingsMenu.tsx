import React from 'react';
import { Layout, Card, Switch, Tooltip, Select, Typography } from 'antd';
import { BulbOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const SettingsMenu: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

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
          <div style={{ marginBottom: '20px' }}>
            <Title level={4} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Appearance</Title>
            <Text style={{ display: 'block', marginBottom: '10px', color: theme === 'dark' ? '#d1d1d1' : '#333' }}>
              Toggle between light and dark mode:
            </Text>
            <Tooltip title="Toggle Dark/Light Mode">
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<BulbOutlined />}
              />
            </Tooltip>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Title level={4} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Language</Title>
            <Text style={{ display: 'block', marginBottom: '10px', color: theme === 'dark' ? '#d1d1d1' : '#333' }}>
              Select your preferred language:
            </Text>
            <Tooltip title="Select Language">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <GlobalOutlined style={{ marginRight: '10px', color: theme === 'dark' ? '#ffffff' : '#000000' }} />
                <Select
                  defaultValue="en"
                  style={{ width: 140 }}
                  onChange={changeLanguage}
                  dropdownStyle={{ borderRadius: '8px' }}
                >
                  <Option value="en">English</Option>
                  <Option value="th">ไทย</Option>
                </Select>
              </div>
            </Tooltip>
          </div>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
        ©2024 Bill Management System
      </Footer>
    </Layout>
  );
};

export default SettingsMenu;