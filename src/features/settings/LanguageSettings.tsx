import React, { useEffect, useState } from 'react';
import { Select, Typography, Tooltip, Card, Row, Col } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import i18n from '../../i18n';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorageHelper';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalTranslation } from 'src/contexts/TranslationContext';

const { Title, Text } = Typography;
const { Option } = Select;

const LanguageSettings: React.FC = () => {
    const { theme } = useTheme();
    const t = useGlobalTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
        return loadFromLocalStorage<string>('appLanguage') || i18n.language || 'en';
    });

    useEffect(() => {
        const savedLanguage = loadFromLocalStorage<string>('appLanguage');
        if (savedLanguage && i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage).catch((error) => {
                console.error('Error changing language:', error);
            });
        } else if (!savedLanguage) {
            saveToLocalStorage('appLanguage', i18n.language);
        }
    }, []);

    const changeLanguage = (value: string) => {
        setCurrentLanguage(value);
        i18n.changeLanguage(value)
            .then(() => {
                saveToLocalStorage('appLanguage', value);
            })
            .catch((error) => {
                console.error('Error changing language:', error);
            });
    };

    return (
        <Card
            style={{
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
                boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}
        >
            <Row justify="space-between" align="middle" wrap={false}>
                <Col flex="auto">
                    <Title
                        level={4}
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                            marginBottom: '10px',
                        }}
                        aria-label={t('language')}
                    >
                        {t('language')}
                    </Title>
                    <Text
                        style={{ color: theme === 'dark' ? '#d1d1d1' : '#333' }}
                        aria-label={t('selectLanguage')}
                    >
                        {t('selectLanguage')}
                    </Text>
                </Col>
                <Col>
                    <Tooltip title={t('selectLanguageTooltip')}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                                transition: 'transform 0.3s',
                            }}
                            role="region"
                            aria-live="polite"
                        >
                            <GlobalOutlined
                                style={{ marginRight: '10px', color: theme === 'dark' ? '#ffffff' : '#000000' }}
                                aria-hidden="true"
                            />
                            <Select
                                value={currentLanguage}
                                onChange={changeLanguage}
                                style={{
                                    width: 140,
                                    backgroundColor: theme === 'dark' ? '#2b2b2b' : '#f0f0f0',
                                    borderRadius: '8px',
                                    color: theme === 'dark' ? '#ffffff' : '#000000',
                                    border: '1px solid',
                                    borderColor: theme === 'dark' ? '#444' : '#ccc',
                                    transition: 'border-color 0.3s, background-color 0.3s',
                                }}
                                dropdownStyle={{
                                    backgroundColor: theme === 'dark' ? '#2b2b2b' : '#ffffff',
                                    color: theme === 'dark' ? '#ffffff' : '#000000',
                                    borderRadius: '8px',
                                    boxShadow: theme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                }}
                                aria-label={t('languageDropdown')}
                            >
                                <Option value="en" aria-label={t('languageOptionEnglish')}>{t('languageOptionEnglish')}</Option>
                                <Option value="th" aria-label={t('languageOptionThai')}>{t('languageOptionThai')}</Option>
                            </Select>
                        </div>
                    </Tooltip>
                </Col>
            </Row>
        </Card>
    );
};

export default LanguageSettings;
