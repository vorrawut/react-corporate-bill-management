import React from 'react';
import { Layout, Menu, Switch, Tooltip, Select } from 'antd';
import { BulbOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const SettingsMenu: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff' }}>
      <Header style={{ backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Settings</h1>
      </Header>
      <Content style={{ margin: '20px', padding: '20px', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
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
          <Tooltip title="Select Language">
            <GlobalOutlined style={{ marginRight: '10px', color: theme === 'dark' ? '#ffffff' : '#000000' }} />
            <Select defaultValue="en" style={{ width: 120 }} onChange={changeLanguage}>
              <Option value="en">English</Option>
              <Option value="th">ไทย</Option>
            </Select>
          </Tooltip>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: theme === 'dark' ? '#141414' : '#f0f2f5', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
        Settings Page ©2024
      </Footer>
    </Layout>
  );
};

export default SettingsMenu;
