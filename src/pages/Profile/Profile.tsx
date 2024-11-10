import React, { useState } from 'react';
import { Button, Form, Input, Avatar, Upload, Typography, Row, Col, Card, Space } from 'antd';
import { UploadOutlined, EditOutlined, PhoneOutlined, MailOutlined, BankOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalTranslation } from '../../contexts/TranslationContext';
import styles from './Profile.module.css';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [lastOnline, setLastOnline] = useState('Yesterday at 4:45 PM');

    const { theme } = useTheme();
    const t = useGlobalTranslation();
    const isDarkMode = theme === 'dark';

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleFormSubmit = (values: any) => {
        console.log('Updated values:', values);
        setIsEditing(false);
        setLastOnline('Just now');
    };

    const handlePhotoChange = (info: any) => {
        if (info.file.status === 'done') {
            const photoURL = URL.createObjectURL(info.file.originFileObj);
            setProfilePhoto(photoURL);
        }
    };

    return (
        <Card
            className={`${styles.profileCard} ${isDarkMode ? styles.darkCard : styles.lightCard}`}
        >
            <div className={styles.header}>
                <Title level={3} className={`${styles.title} ${isDarkMode ? styles.darkText : styles.lightText}`}>
                    {t('profile.title')}
                </Title>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    className={styles.editButton}
                >
                    {isEditing ? t('profile.cancelEdit') : t('profile.editProfile')}
                </Button>
            </div>

            <div className={styles.profileInfo}>
                <Avatar
                    size={120}
                    src={profilePhoto}
                    icon={<UserOutlined />}
                    className={styles.avatar}
                />
                <Upload
                    showUploadList={false}
                    onChange={handlePhotoChange}
                    disabled={!isEditing}
                    className={styles.uploadButton}
                >
                    <Button icon={<UploadOutlined />} disabled={!isEditing}>
                        {isEditing ? t('profile.uploadPhoto') : t('profile.editPhoto')}
                    </Button>
                </Upload>
                <Text className={`${styles.lastOnlineText} ${isDarkMode ? styles.darkText : styles.lightText}`}>
                    {t('profile.lastOnline')}: {lastOnline}
                </Text>
            </div>

            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                className={styles.profileForm}
                initialValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '1234 Elm Street, Apt 101, Cityville, NY 12345',
                    bookBank: 'Bank of Example, Account No. 987654321',
                    phoneNumber: '+1 123-456-7890',
                    email: 'johndoe@example.com',
                    taxId: '123-45-6789',
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label={t('profile.firstName')}
                            rules={[{ required: true, message: t('profile.firstNameRequired') }]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<UserOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label={t('profile.lastName')}
                            rules={[{ required: true, message: t('profile.lastNameRequired') }]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<UserOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label={t('profile.phoneNumber')}
                            rules={[{ required: true, message: t('profile.phoneNumberRequired') }]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<PhoneOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label={t('profile.email')}
                            rules={[
                                { required: true, message: t('profile.emailRequired') },
                                { type: 'email', message: t('profile.validEmail') },
                            ]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<MailOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="taxId"
                            label={t('profile.taxId')}
                            rules={[{ required: true, message: t('profile.taxIdRequired') }]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<IdcardOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="bookBank"
                            label={t('profile.bookBank')}
                            rules={[{ required: true, message: t('profile.bookBankRequired') }]}
                        >
                            <Input
                                disabled={!isEditing}
                                prefix={<BankOutlined />}
                                size="large"
                                className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="address"
                    label={t('profile.address')}
                    rules={[{ required: true, message: t('profile.addressRequired') }]}
                >
                    <Input.TextArea
                        rows={3}
                        disabled={!isEditing}
                        className={`${styles.textarea} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                        style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                    />
                </Form.Item>

                {isEditing && (
                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={`${styles.submitButton} ${isDarkMode ? styles.darkButton : ''}`}
                            >
                                {t('profile.saveChanges')}
                            </Button>
                            <Button
                                type="default"
                                onClick={handleEdit}
                                className={`${styles.cancelButton} ${isDarkMode ? styles.darkButton : ''}`}
                            >
                                {t('profile.cancel')}
                            </Button>
                        </Space>
                    </Form.Item>
                )}
            </Form>
        </Card>
    );
};

export default Profile;
