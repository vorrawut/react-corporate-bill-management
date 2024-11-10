import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useGlobalTranslation } from 'src/contexts/TranslationContext';
import styles from './TopBar.module.css';

const ProfileMenu: React.FC = () => {
    const { theme } = useTheme();
    const t = useGlobalTranslation();

    // State to control visibility of the profile menu
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Toggle menu visibility
    const toggleMenu = () => setIsMenuVisible((prev) => !prev);

    // Close the menu if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Dynamic class based on theme
    const themeClass = theme === 'dark' ? styles.dark : styles.light;

    return (
        <div className={`${styles.profileSection} ${themeClass}`} ref={menuRef}>
            {/* Profile Avatar */}
            <div onClick={toggleMenu} className={`${styles.profileAvatar} ${themeClass}`}>
                <UserOutlined className={styles.profileIcon} />
            </div>

            {/* Profile Menu */}
            {isMenuVisible && (
                <div className={`${styles.profileMenu} ${themeClass}`}>
                    <div className={`${styles.menuItem} ${themeClass}`}>
                        <Link to="/profile" className={`${styles.menuLink} ${themeClass}`}>
                            <UserOutlined /> {t('Profile')}
                        </Link>
                    </div>
                    <div className={`${styles.menuItem} ${themeClass}`}>
                        <Link to="/settings" className={`${styles.menuLink} ${themeClass}`}>
                            <SettingOutlined /> {t('Settings')}
                        </Link>
                    </div>
                    <div className={`${styles.menuItem} ${themeClass}`}>
                        <Link to="/logout" className={`${styles.menuLink} ${themeClass}`}>
                            <LogoutOutlined /> {t('Logout')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
