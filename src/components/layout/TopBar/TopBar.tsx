import React, { useState } from 'react';
import { Layout, Badge, Tooltip, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';
import ProfileMenu from './ProfileMenu';
import styles from './TopBar.module.css';

const { Header } = Layout;

const TopBar: React.FC = () => {
  const { theme } = useTheme();
  const [notificationCount, _] = useState(3); // Example notifications count

  const themeClass = theme === 'dark' ? styles.dark : styles.light;

  return (
    <Header className={`${styles.topBar} ${themeClass}`}>
      {/* Notification Bell */}
      <div className={`${styles.iconWrapper} ${themeClass}`}>
        <Tooltip title="Notifications">
          <Badge count={notificationCount} size="small" offset={[0, 8]}>
            <Button
              type="text"
              icon={<BellOutlined className={`${styles.notificationIcon} ${themeClass}`} />}
              className={`${styles.iconButton} ${themeClass}`}
            />
          </Badge>
        </Tooltip>
      </div>

      {/* Profile Section */}
      <ProfileMenu />
    </Header>
  );
};

export default TopBar;
