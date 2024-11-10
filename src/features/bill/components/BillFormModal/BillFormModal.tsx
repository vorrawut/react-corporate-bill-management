import React, { useEffect } from 'react';
import { Form } from 'antd';
import { Bill } from '../../../../types/Bill';
import VendorDetails from './VendorDetails';
import BillDetails from './BillDetails';
import { useTheme } from '../../../../contexts/ThemeContext';
import styles from './BillFormModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import { BillFormModalConstants } from './BillFormModalConstants';
import ActionButtons from './ActionButtons';

interface BillFormModalProps {
  initialValues: Bill | null;
  onSubmit: (billData: Bill) => void;
  onCancel: () => void;
}

const BillFormModal: React.FC<BillFormModalProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (!initialValues) {
      form.setFieldsValue({
        type: BillFormModalConstants.defaultType,
        currency: BillFormModalConstants.defaultCurrency,
        status: BillFormModalConstants.defaultStatus,
        amount: BillFormModalConstants.defaultAmount,
        billDate: BillFormModalConstants.defaultBillDate,
        dueDate: BillFormModalConstants.defaultDueDate,
        invoiceNumber: `${BillFormModalConstants.invoiceNumberPrefix}${uuidv4().split('-')[0]}`,
      });
    }
  }, [initialValues, form]);

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
        <VendorDetails form={form} isDarkMode={isDarkMode} />
        <BillDetails isDarkMode={isDarkMode} />
        <ActionButtons initialValues={initialValues} isDarkMode={isDarkMode} onCancel={onCancel} />
      </Form>
    </div>
  );
};

export default BillFormModal;
