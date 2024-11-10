import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Bill } from '../../../../types/Bill';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';
import { BillFormModalConstants } from './BillFormModalConstants'; // Import the constants

interface BillFormModalProps {
  initialValues?: Bill | null;
  onSubmit: (billData: Bill) => void;
  onCancel: () => void;
}

const { Option } = Select;

const BillFormModal: React.FC<BillFormModalProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const t = useGlobalTranslation(); // Translation hook for multilingual support

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
    <Form
      form={form}
      initialValues={initialValues || {}}
      onFinish={handleFinish}
      layout="vertical"
    >
      <Form.Item
        name="vendorName"
        label={t(BillFormModalConstants.vendorName)} // Translated label
        rules={[{ required: true, message: t(BillFormModalConstants.vendorNameRequired) }]} // Translated validation message
      >
        <Input placeholder={t(BillFormModalConstants.vendorNamePlaceholder)} /> {/* Translated placeholder */}
      </Form.Item>

      <Form.Item
        name="description"
        label={t(BillFormModalConstants.description)}
        rules={[{ required: true, message: t(BillFormModalConstants.descriptionRequired) }]}
      >
        <Input.TextArea placeholder={t(BillFormModalConstants.descriptionPlaceholder)} rows={3} />
      </Form.Item>

      <Form.Item
        name="type"
        label={t(BillFormModalConstants.type)}
        rules={[{ required: true, message: t(BillFormModalConstants.typeRequired) }]}
      >
        <Select placeholder={t(BillFormModalConstants.typePlaceholder)}>
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
        <Input placeholder={t(BillFormModalConstants.invoiceNumberPlaceholder)} />
      </Form.Item>

      <Form.Item
        name="billDate"
        label={t(BillFormModalConstants.billDate)}
        rules={[{ required: true, message: t(BillFormModalConstants.billDateRequired) }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder={t(BillFormModalConstants.billDatePlaceholder)} />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label={t(BillFormModalConstants.dueDate)}
        rules={[{ required: true, message: t(BillFormModalConstants.dueDateRequired) }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder={t(BillFormModalConstants.dueDatePlaceholder)} />
      </Form.Item>

      <Form.Item
        name="amount"
        label={t(BillFormModalConstants.amount)}
        rules={[{ required: true, message: t(BillFormModalConstants.amountRequired) }]}
      >
        <Input type="number" placeholder={t(BillFormModalConstants.amountPlaceholder)} />
      </Form.Item>

      <Form.Item
        name="currency"
        label={t(BillFormModalConstants.currency)}
        rules={[{ required: true, message: t(BillFormModalConstants.currencyRequired) }]}
      >
        <Select placeholder={t(BillFormModalConstants.currencyPlaceholder)}>
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
        <Select placeholder={t(BillFormModalConstants.statusPlaceholder)}>
          <Option value="Pending">{t(BillFormModalConstants.statusPending)}</Option>
          <Option value="Paid">{t(BillFormModalConstants.statusPaid)}</Option>
          <Option value="Overdue">{t(BillFormModalConstants.statusOverdue)}</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? t(BillFormModalConstants.updateBill) : t(BillFormModalConstants.addBill)} {/* Translated button text */}
        </Button>
        <Button type="default" onClick={onCancel} style={{ marginLeft: 8 }}>
          {t(BillFormModalConstants.cancel)} {/* Translated button text */}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillFormModal;
