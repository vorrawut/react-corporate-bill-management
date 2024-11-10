// src/components/BillFormModal.tsx
import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Bill } from '../types/Bill';

interface BillFormModalProps {
  initialValues?: Bill | null;
  onSubmit: (billData: Bill) => void;
  onCancel: () => void;
}

const { Option } = Select;

const BillFormModal: React.FC<BillFormModalProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

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
        label="Vendor Name"
        rules={[{ required: true, message: 'Please enter the vendor name' }]}
      >
        <Input placeholder="Enter vendor name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please provide a description' }]}
      >
        <Input.TextArea placeholder="Enter description" rows={3} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type of Bill"
        rules={[{ required: true, message: 'Please select the type of bill' }]}
      >
        <Select placeholder="Select type of bill">
          <Option value="Food & Beverage">Food & Beverage</Option>
          <Option value="Fuel">Fuel</Option>
          <Option value="Electricity Bill">Electricity Bill</Option>
          <Option value="Water Bill">Water Bill</Option>
          <Option value="Internet">Internet</Option>
          <Option value="Office Supplies">Office Supplies</Option>
          <Option value="Rent">Rent</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="invoiceNumber"
        label="Invoice Number"
        rules={[{ required: true, message: 'Please enter the invoice number' }]}
      >
        <Input placeholder="Enter invoice number" />
      </Form.Item>

      <Form.Item
        name="billDate"
        label="Bill Date"
        rules={[{ required: true, message: 'Please select the bill date' }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder="Select bill date" />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select the due date' }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder="Select due date" />
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Please enter the amount' }]}
      >
        <Input type="number" placeholder="Enter amount" />
      </Form.Item>

      <Form.Item
        name="currency"
        label="Currency"
        rules={[{ required: true, message: 'Please select the currency' }]}
      >
        <Select placeholder="Select currency">
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
          <Option value="GBP">GBP</Option>
          <Option value="JPY">JPY</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status' }]}
      >
        <Select placeholder="Select status">
          <Option value="Pending">Pending</Option>
          <Option value="Paid">Paid</Option>
          <Option value="Overdue">Overdue</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Bill' : 'Add Bill'}
        </Button>
        <Button type="default" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillFormModal;
