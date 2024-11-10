import React from 'react';
import { Form, Input } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';
import { BillFormModalConstants } from './BillFormModalConstants'; // Import the constants
import styles from './BillFormModal.module.css'; // Import CSS module

const VendorDetails: React.FC<{ form: any; isDarkMode: boolean }> = ({ isDarkMode }) => {
    const t = useGlobalTranslation();

    return (
        <>
            <Form.Item
                name="vendorName"
                label={t(BillFormModalConstants.vendorName)}
                rules={[{ required: true, message: t(BillFormModalConstants.vendorNameRequired) }]}
            >
                <Input
                    placeholder={t(BillFormModalConstants.vendorNamePlaceholder)}
                    prefix={<ShopOutlined />}
                    size="large"
                    className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                />
            </Form.Item>

            <Form.Item
                name="description"
                label={t(BillFormModalConstants.description)}
                rules={[{ message: t(BillFormModalConstants.descriptionRequired) }]}
            >
                <Input.TextArea
                    placeholder={t(BillFormModalConstants.descriptionPlaceholder)}
                    rows={3}
                    size="large"
                    className={`${styles.textarea} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
                />
            </Form.Item>
        </>
    );
};

export default VendorDetails;
