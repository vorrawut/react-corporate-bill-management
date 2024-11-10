// components/BillTrackingCard.tsx
import React from 'react';
import { Card, CardProps } from 'antd';
import { useTheme } from '../../../../contexts/ThemeContext';
import styles from './BillTrackingCard.module.css';

interface BillTrackingCardProps extends CardProps {
    children: React.ReactNode;
}

const BillTrackingCard: React.FC<BillTrackingCardProps> = ({ children, ...props }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <Card
            {...props}
            className={`${styles.billTrackingCard} ${isDarkMode ? styles.dark : styles.light}`}
        >
            {children}
        </Card>
    );
};

export default BillTrackingCard;
