import React, { ReactNode, useState } from 'react';
import { Layout, Button, Typography, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useTheme } from 'src/contexts/ThemeContext';
import SideMenu from './SideMenu/SideMenu';
import TopBar from './TopBar/TopBar';

const { Content, Footer, Sider } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
    children: ReactNode; // Add type for children prop
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { theme } = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const isDarkMode = theme === 'dark';

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#1f1f1f' : '#f8f9fb' }}>
            {/* Sidebar */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme={isDarkMode ? 'dark' : 'light'}
                width={250}
                collapsedWidth={80}
                style={{
                    transition: 'all 0.4s ease-in-out',
                    boxShadow: isDarkMode ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #1f1f1f, #2b2b2b)'
                        : 'linear-gradient(135deg, #ffffff, #e6e9f0)',
                }}
            >
                {/* Logo */}
                <div
                    className="logo"
                    style={{
                        color: isDarkMode ? '#ffffff' : '#000000',
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
            <Layout>
                {/* TopBar with Sidebar Toggle Button */}
                <div
                    style={{
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: isDarkMode ? '#141414' : '#ffffff',
                        padding: '0 24px',
                        borderBottom: isDarkMode ? '1px solid #333' : '1px solid #ddd',
                        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.4s ease-in-out',
                    }}
                >
                    <Space size="large" align="center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '1.5rem',
                                color: isDarkMode ? '#ffffff' : '#000000',
                                transition: 'color 0.3s ease',
                            }}
                        />
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                color: isDarkMode ? '#ffffff' : '#000000',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            Dashboard
                        </Title>
                    </Space>
                    {/* Custom TopBar Component (can include profile details, notifications, etc.) */}
                    <TopBar />
                </div>

                {/* Content */}
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: '24px',
                        backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        borderRadius: '10px',
                        boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {/* Render children passed to AppLayout */}
                    {children}
                </Content>

                {/* Footer */}
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: isDarkMode ? '#141414' : '#f0f2f5',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        padding: '12px 20px',
                        borderTop: isDarkMode ? '1px solid #333' : '1px solid #ddd',
                        transition: 'all 0.4s ease',
                    }}
                >
                    Bill Management System ©2024
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
