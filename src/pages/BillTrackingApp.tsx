// src/pages/BillTrackingApp.tsx
import React, { useState } from 'react';
import { Button, Space, Modal } from 'antd';
import { PlusOutlined, FileExcelOutlined } from '@ant-design/icons';
import { BillTable } from '../components/BillTable';
import BillFormModal from '../components/BillFormModal';
import { Bill } from '../types/Bill';
import useBillData from '../hooks/useBillData';
import { useExport } from '../hooks/useExport';

const BillTrackingApp: React.FC = () => {
  const { bills, addBill, updateBill, deleteBill } = useBillData();
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [editBill, setEditBill] = useState<Bill | null>(null);
  const { exportToExcel } = useExport();

  const handleAddBill = () => {
    setEditBill(null);
    setFormModalVisible(true);
  };

  const handleEditBill = (bill: Bill) => {
    setEditBill(bill);
    setFormModalVisible(true);
  };

  const handleFormSubmit = (billData: Bill) => {
    if (editBill) {
      updateBill(billData);
    } else {
      addBill(billData);
    }
    setFormModalVisible(false);
  };

  return (
    <div>
      <h1>Bill Tracking Management</h1>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBill}>
          Add Bill
        </Button>
        <Button type="default" icon={<FileExcelOutlined />} onClick={() => exportToExcel(bills)}>
          Export to Excel
        </Button>
      </Space>
      <BillTable bills={bills} onEdit={handleEditBill} onDelete={deleteBill} />
      <Modal
        title={editBill ? 'Edit Bill' : 'Add Bill'}
        visible={isFormModalVisible}
        onCancel={() => setFormModalVisible(false)}
        footer={null}
      >
        <BillFormModal
          initialValues={editBill}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default BillTrackingApp;
