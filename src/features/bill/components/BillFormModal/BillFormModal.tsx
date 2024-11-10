import React from 'react';
import { Form, Input, DatePicker, Select, Button, Row, Col, Space } from 'antd';
import { DollarOutlined, FieldNumberOutlined, CalendarOutlined, ShopOutlined } from '@ant-design/icons';
import { Bill } from '../../../../types/Bill';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';
import { BillFormModalConstants } from './BillFormModalConstants'; // Import the constants
import { useTheme } from '../../../../contexts/ThemeContext'; // For dark mode support
import styles from './BillFormModal.module.css'; // Import CSS module

interface BillFormModalProps {
  initialValues?: Bill | null;
  onSubmit: (billData: Bill) => void;
  onCancel: () => void;
}

const { Option } = Select;

const BillFormModal: React.FC<BillFormModalProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const t = useGlobalTranslation(); // Translation hook for multilingual support
  const { theme } = useTheme(); // Use the theme context to determine dark or light mode
  const isDarkMode = theme === 'dark';

  const handleFinish = (values: any) => {
    const billData: Bill = {
      ...initialValues,
      ...values,
      id: initialValues?.id || `${Date.now()}`,
    };
    onSubmit(billData);
    form.resetFields();
  };

  return (
    <div className={`${styles.billFormModal} ${isDarkMode ? styles.dark : styles.light}`}>
      <Form
        form={form}
        initialValues={initialValues || {}}
        onFinish={handleFinish}
        layout="vertical"
        className={styles.formContainer}
      >
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
          rules={[{ required: true, message: t(BillFormModalConstants.descriptionRequired) }]}
        >
          <Input.TextArea
            placeholder={t(BillFormModalConstants.descriptionPlaceholder)}
            rows={3}
            size="large"
            className={`${styles.textarea} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label={t(BillFormModalConstants.type)}
          rules={[{ required: true, message: t(BillFormModalConstants.typeRequired) }]}
        >
          <Select
            placeholder={t(BillFormModalConstants.typePlaceholder)}
            size="large"
            className={`${styles.select} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
            popupClassName={`${isDarkMode ? styles.darkDropdown : styles.lightDropdown}`} // Custom dropdown class
          >
            <Option value="Food & Beverage">{t(BillFormModalConstants.foodAndBeverage)}</Option>
            <Option value="Fuel">{t(BillFormModalConstants.fuel)}</Option>
            <Option value="Electricity Bill">{t(BillFormModalConstants.electricityBill)}</Option>
            <Option value="Water Bill">{t(BillFormModalConstants.waterBill)}</Option>
            <Option value="Internet">{t(BillFormModalConstants.internet)}</Option>
            <Option value="Office Supplies">{t(BillFormModalConstants.officeSupplies)}</Option>
            <Option value="Rent">{t(BillFormModalConstants.rent)}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="invoiceNumber"
          label={t(BillFormModalConstants.invoiceNumber)}
          rules={[{ required: true, message: t(BillFormModalConstants.invoiceNumberRequired) }]}
        >
          <Input
            placeholder={t(BillFormModalConstants.invoiceNumberPlaceholder)}
            prefix={<FieldNumberOutlined />}
            size="large"
            className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="billDate"
              label={t(BillFormModalConstants.billDate)}
              rules={[{ required: true, message: t(BillFormModalConstants.billDateRequired) }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder={t(BillFormModalConstants.billDatePlaceholder)}
                size="large"
                suffixIcon={<CalendarOutlined />}
                className={`${styles.datePicker} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dueDate"
              label={t(BillFormModalConstants.dueDate)}
              rules={[{ required: true, message: t(BillFormModalConstants.dueDateRequired) }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder={t(BillFormModalConstants.dueDatePlaceholder)}
                size="large"
                suffixIcon={<CalendarOutlined />}
                className={`${styles.datePicker} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="amount"
          label={t(BillFormModalConstants.amount)}
          rules={[{ required: true, message: t(BillFormModalConstants.amountRequired) }]}
        >
          <Input
            type="number"
            placeholder={t(BillFormModalConstants.amountPlaceholder)}
            prefix={<DollarOutlined />}
            size="large"
            className={`${styles.input} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
          />
        </Form.Item>

        <Form.Item
          name="currency"
          label={t(BillFormModalConstants.currency)}
          rules={[{ required: true, message: t(BillFormModalConstants.currencyRequired) }]}
        >
          <Select
            placeholder={t(BillFormModalConstants.currencyPlaceholder)}
            size="large"
            className={`${styles.select} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
            popupClassName={`${isDarkMode ? styles.darkDropdown : styles.lightDropdown}`} // Custom dropdown class
          >
            <Option value="USD">{t(BillFormModalConstants.currencyUSD)}</Option>
            <Option value="EUR">{t(BillFormModalConstants.currencyEUR)}</Option>
            <Option value="GBP">{t(BillFormModalConstants.currencyGBP)}</Option>
            <Option value="JPY">{t(BillFormModalConstants.currencyJPY)}</Option>
            <Option value="THB">{t(BillFormModalConstants.currencyTHB)}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label={t(BillFormModalConstants.status)}
          rules={[{ required: true, message: t(BillFormModalConstants.statusRequired) }]}
        >
          <Select
            placeholder={t(BillFormModalConstants.statusPlaceholder)}
            size="large"
            className={`${styles.select} ${isDarkMode ? styles.darkInput : styles.lightInput}`}
            popupClassName={`${isDarkMode ? styles.darkDropdown : styles.lightDropdown}`} // Custom dropdown class
          >
            <Option value="Pending">{t(BillFormModalConstants.statusPending)}</Option>
            <Option value="Paid">{t(BillFormModalConstants.statusPaid)}</Option>
            <Option value="Overdue">{t(BillFormModalConstants.statusOverdue)}</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={`${styles.submitButton} ${isDarkMode ? styles.dark : styles.light}`}
            >
              {initialValues ? t(BillFormModalConstants.updateBill) : t(BillFormModalConstants.addBill)}
            </Button>
            <Button
              type="default"
              onClick={onCancel}
              size="large"
              className={`${styles.cancelButton} ${isDarkMode ? styles.dark : styles.light}`}
            >
              {t(BillFormModalConstants.cancel)}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BillFormModal;
