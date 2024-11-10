import React, { useState } from 'react';
import { Card, List, Button, Typography, Avatar, message, Popconfirm, Divider } from 'antd';
import { BellOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalTranslation } from '../../contexts/TranslationContext';
import { NotificationConstants } from './NotificationConstants'; // Import the constants
import styles from './NotificationPage.module.css'; // CSS module for styling

const { Title, Text } = Typography;

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
}

const initialNotifications: Notification[] = [
    { id: '1', title: 'System Update', message: 'Your system update was successful.', timestamp: 'Today, 3:45 PM' },
    { id: '2', title: 'New Message', message: 'You have received a new message from John.', timestamp: 'Yesterday, 11:15 AM' },
    { id: '3', title: 'Payment Reminder', message: 'Your payment is due in 3 days.', timestamp: '3 days ago' },
    { id: '4', title: 'Event Reminder', message: 'Upcoming team meeting tomorrow at 9 AM.', timestamp: '5 days ago' }
];

const NotificationPage: React.FC = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const { theme } = useTheme();
    const t = useGlobalTranslation();
    const isDarkMode = theme === 'dark';

    const handleDeleteNotification = (id: string) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        message.success(t(NotificationConstants.deleteSuccess));
    };

    return (
        <Card
            className={`${styles.notificationCard} ${isDarkMode ? styles.darkCard : styles.lightCard}`}
            style={{ borderRadius: '16px', padding: '20px', boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
            <Title level={2} className={`${styles.title} ${isDarkMode ? styles.darkText : styles.lightText}`}>
                {t(NotificationConstants.title)}
            </Title>
            <Divider className={`${isDarkMode ? styles.darkDivider : styles.lightDivider}`} />
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(notification) => (
                    <List.Item
                        className={`${styles.notificationItem} ${isDarkMode ? styles.darkNotificationItem : styles.lightNotificationItem}`}
                        actions={[
                            <Popconfirm
                                title={t(NotificationConstants.deleteConfirm)}
                                onConfirm={() => handleDeleteNotification(notification.id)}
                                okText={t(NotificationConstants.yes)}
                                cancelText={t(NotificationConstants.no)}
                            >
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    danger
                                    className={`${styles.deleteButton} ${isDarkMode ? styles.darkDelete : styles.lightDelete}`}
                                >
                                    {t(NotificationConstants.delete)}
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size="large"
                                    icon={<BellOutlined />}
                                    className={`${styles.avatar} ${isDarkMode ? styles.darkAvatar : styles.lightAvatar}`}
                                />
                            }
                            title={
                                <Text strong className={`${styles.notificationTitle} ${isDarkMode ? styles.darkText : styles.lightText}`}>
                                    {notification.title}
                                </Text>
                            }
                            description={
                                <div>
                                    <Text className={`${styles.notificationMessage} ${isDarkMode ? styles.darkTextSecondary : styles.lightTextSecondary}`}>
                                        {notification.message}
                                    </Text>
                                    <br />
                                    <Text type="secondary" className={`${styles.notificationTimestamp} ${isDarkMode ? styles.darkTextTimestamp : styles.lightTextTimestamp}`}>
                                        {notification.timestamp}
                                    </Text>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            {notifications.length === 0 && (
                <Text className={`${styles.noNotifications} ${isDarkMode ? styles.darkText : styles.lightText}`}>
                    {t(NotificationConstants.noNotifications)}
                </Text>
            )}
        </Card>
    );
};

export default NotificationPage;
