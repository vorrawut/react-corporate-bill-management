import React, { useState } from 'react';
import { Button, Space, Modal, Tabs, Typography } from 'antd';
import { PlusOutlined, FileExcelOutlined } from '@ant-design/icons';
import BillTable  from '../components/BillTable';
import YearSummaryTable from '../components/YearSummaryTable';
import BillFormModal from '../components/BillFormModal';
import { Bill } from '../types/Bill';
import useBillData from '../hooks/useBillData';
import { useExport } from '../hooks/useExport';

const { Title } = Typography;
const { TabPane } = Tabs;

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
      <Title level={2}>Bill Tracking Management</Title>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBill}>
          Add Bill
        </Button>
        <Button type="default" icon={<FileExcelOutlined />} onClick={() => exportToExcel(bills)}>
          Export to Excel
        </Button>
      </Space>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Detailed Bills" key="1">
          <BillTable bills={bills} onEdit={handleEditBill} onDelete={deleteBill} />
        </TabPane>
        <TabPane tab="Yearly Summary" key="2">
          <YearSummaryTable bills={bills} />
        </TabPane>
      </Tabs>
      <Modal
        title={editBill ? 'Edit Bill' : 'Add Bill'}
        open={isFormModalVisible}
        onCancel={() => setFormModalVisible(false)}
        footer={null}
        destroyOnClose
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
