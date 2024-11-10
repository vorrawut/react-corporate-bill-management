import React, { useState, useEffect } from 'react';
import { Button, Space, Modal, Tabs, Typography, Card, Tooltip, Input, message } from 'antd';
import { PlusOutlined, FileExcelOutlined, TableOutlined, BarChartOutlined, PieChartOutlined, SearchOutlined } from '@ant-design/icons';
import BillTable from '../components/BillTable';
import YearSummaryTable from '../components/YearSummaryTable';
import BillFormModal from '../components/BillFormModal';
import ExpensePieChart from '../components/ExpensePieChart';
import ExpenseBarChart from '../components/ExpenseBarChart';
import { Bill } from '../types/Bill';
import useBillData from '../hooks/useBillData';
import { useExport } from '../hooks/useExport';

const { Title } = Typography;
const { TabPane } = Tabs;

const BillTrackingApp: React.FC = () => {
  const { bills, addBill, updateBill, deleteBill, syncWithBackend, loading } = useBillData();
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [editBill, setEditBill] = useState<Bill | null>(null);
  const { exportToExcel } = useExport();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBills, setFilteredBills] = useState<Bill[]>(bills);
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || '1');

  useEffect(() => {
    setFilteredBills(
      bills.filter(bill =>
        bill.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [bills, searchTerm]);

  useEffect(() => {
    // Attempt to sync with backend on component mount or whenever the bills change
    syncWithBackend();
  }, [bills, syncWithBackend]);

  const handleAddBill = () => {
    setEditBill(null);
    setFormModalVisible(true);
  };

  const handleEditBill = (bill: Bill) => {
    setEditBill(bill);
    setFormModalVisible(true);
  };

  const handleFormSubmit = async (billData: Bill) => {
    addBill(billData);
    message.success('Bill added successfully. Syncing with backend...');
    setFormModalVisible(false);
    await syncWithBackend();
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem('activeTab', key);
  };

  return (
    <Card
      style={{
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <Title level={2} style={{ marginBottom: 20, textAlign: 'center' }}>Bill Tracking Management</Title>
      <Space style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Add a new bill">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBill}>
              Add Bill
            </Button>
          </Tooltip>
          <Tooltip title="Export all bills to Excel">
            <Button type="default" icon={<FileExcelOutlined />} onClick={() => exportToExcel(bills)}>
              Export to Excel
            </Button>
          </Tooltip>
        </div>
        <Input
          placeholder="Search by vendor name"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: 300 }}
        />
      </Space>
      {loading ? (
        <Typography.Text>Loading...</Typography.Text>
      ) : (
        <Tabs activeKey={activeTab} onChange={handleTabChange} defaultActiveKey="1" tabBarGutter={16}>
          <TabPane
            tab={
              <span>
                <TableOutlined />
                Detailed Bills
              </span>
            }
            key="1"
          >
            {bills.length > 0 ? (
              <BillTable bills={filteredBills} onEdit={handleEditBill} onDelete={deleteBill} />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Typography.Text type="secondary">No bills available. Add a new bill to get started.</Typography.Text>
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Yearly Summary
              </span>
            }
            key="2"
          >
            {bills.length > 0 ? (
              <YearSummaryTable bills={bills} />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Typography.Text type="secondary">No data available for the yearly summary.</Typography.Text>
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <PieChartOutlined />
                Visualize Expenses
              </span>
            }
            key="3"
          >
            {bills.length > 0 ? (
              <div>
                <ExpensePieChart bills={bills} />
                <ExpenseBarChart bills={bills} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Typography.Text type="secondary">No data available for visualization.</Typography.Text>
              </div>
            )}
          </TabPane>
        </Tabs>
      )}
      <Modal
        title={editBill ? 'Edit Bill' : 'Add Bill'}
        open={isFormModalVisible}
        onCancel={() => setFormModalVisible(false)}
        footer={null}
        destroyOnClose
        centered
        style={{ borderRadius: '8px' }}
      >
        <BillFormModal
          initialValues={editBill}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormModalVisible(false)}
        />
      </Modal>
    </Card>
  );
};

export default BillTrackingApp;
