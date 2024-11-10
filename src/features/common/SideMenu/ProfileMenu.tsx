import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useGlobalTranslation } from 'src/contexts/TranslationContext';
import styles from './SideMenu.module.css';

const ProfileMenu: React.FC = () => {
    const { theme } = useTheme();
    const t = useGlobalTranslation();

    return (
        <Menu
            className={`${styles.profileMenu} ${theme === 'dark' ? styles.dark : styles.light}`}
        >
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile" className={`${styles.menuLink} ${theme === 'dark' ? styles.dark : styles.light}`}>
                    {t('Profile')}
                </Link>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to="/settings" className={`${styles.menuLink} ${theme === 'dark' ? styles.dark : styles.light}`}>
                    {t('Settings')}
                </Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <Link to="/logout" className={`${styles.menuLink} ${theme === 'dark' ? styles.dark : styles.light}`}>
                    {t('Logout')}
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default ProfileMenu;