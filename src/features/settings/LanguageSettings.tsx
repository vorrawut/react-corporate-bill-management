import React, { useEffect, useState } from 'react';
import { Select, Typography, Tooltip } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import i18n from '../../i18n';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorageHelper';

const { Title, Text } = Typography;
const { Option } = Select;

const LanguageSettings: React.FC = () => {
  // State to track the current language
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const savedLanguage = loadFromLocalStorage<string>('appLanguage');
    return savedLanguage || 'en'; // Default to 'en' if no saved language is found
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (value: string) => {
    setCurrentLanguage(value);
    i18n.changeLanguage(value);
    saveToLocalStorage('appLanguage', value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Title level={4} style={{ color: '#000000' }}>Language</Title>
      <Text style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
        Select your preferred language:
      </Text>
      <Tooltip title="Select Language">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GlobalOutlined style={{ marginRight: '10px' }} />
          <Select
            value={currentLanguage}
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
  );
};

export default LanguageSettings;
