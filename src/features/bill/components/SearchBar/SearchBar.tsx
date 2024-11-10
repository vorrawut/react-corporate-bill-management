// components/SearchBar.tsx
import React from 'react';
import { Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    const { theme } = useTheme();
    const t = useGlobalTranslation();
    const isDarkMode = theme === 'dark';

    return (
        <Tooltip title={t('bill_tracking.searchVendorName')}>
            <Input
                placeholder={t('bill_tracking.searchVendorName')}
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${styles.placeholderText} ${isDarkMode ? styles.dark : styles.light}`}
                style={{ maxWidth: 300 }}
            />
        </Tooltip>
    );
};

export default SearchBar;
