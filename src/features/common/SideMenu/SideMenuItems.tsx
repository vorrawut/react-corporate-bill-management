import React from 'react';
import { Tooltip, Badge } from 'antd';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    FileTextOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import { useGlobalTranslation } from 'src/contexts/TranslationContext';
import styles from './SideMenu.module.css';

interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
}

const SideMenuItems = (collapsed: boolean): MenuItem[] => {
    const t = useGlobalTranslation();

    return [
        {
            key: 'dashboard',
            icon: (
                <DashboardOutlined className={`${styles.menuItemIcon} ${styles.dashboard}`} />
            ),
            label: collapsed ? null : <Link to="/">{t('Dashboard')}</Link>,
        },
        {
            key: 'billTracking',
            icon: (
                <Tooltip title={collapsed ? t('Bill Tracking') : ''} placement="right">
                    <Badge count={5} size="small" offset={[10, 0]}>
                        <FileTextOutlined className={`${styles.menuItemIcon} ${styles.billTracking}`} />
                    </Badge>
                </Tooltip>
            ),
            label: collapsed ? null : <Link to="/bills">{t('Bill Tracking')}</Link>,
        },
        {
            key: 'notifications',
            icon: (
                <Tooltip title={collapsed ? t('Notifications') : ''} placement="right">
                    <Badge count={3} size="small" offset={[10, 0]}>
                        <NotificationOutlined className={`${styles.menuItemIcon} ${styles.notifications}`} />
                    </Badge>
                </Tooltip>
            ),
            label: collapsed ? null : <Link to="/notifications">{t('Notifications')}</Link>,
        },
    ];
};

export default SideMenuItems;
