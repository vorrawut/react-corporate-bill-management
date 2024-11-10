import React, { useState, useEffect } from 'react';
import { Space, Modal, Tabs, Typography, Card, Tooltip, message, Skeleton } from 'antd';
import {
  PlusOutlined,
  FileExcelOutlined,
  TableOutlined,
  BarChartOutlined,
  PieChartOutlined,
  SearchOutlined
} from '@ant-design/icons';
import BillTable from '../features/bill/components/BillTable/BillTable';
import YearSummaryTable from '../features/bill/components/YearSummaryTable';
import BillFormModal from '../features/bill/components/BillFormModal';
import ExpensePieChart from '../features/bill/components/ExpensePieChart';
import ExpenseBarChart from '../features/bill/components/ExpenseBarChart';
import StyledButton from '../components/StyledButton/StyledButton';
import StyledInput from '../components/StyledInput/StyledInput';
import { Bill } from '../types/Bill';
import useBillData from '../hooks/useBillData';
import { useExport } from '../hooks/useExport';
import { useTheme } from '../contexts/ThemeContext';
import { useGlobalTranslation } from '../contexts/TranslationContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const BillTrackingApp: React.FC = () => {
  const { theme } = useTheme();
  const t = useGlobalTranslation(); // Translation hook

  const isDarkMode = theme === 'dark';

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
    syncWithBackend();
  }, [syncWithBackend]);

  const handleAddBill = () => {
    setEditBill(null);
    setFormModalVisible(true);
  };

  const handleEditBill = (bill: Bill) => {
    setEditBill(bill);
    setFormModalVisible(true);
  };

  const handleFormSubmit = async (billData: Bill) => {
    if (editBill) {
      updateBill(billData);
      message.success(t('bill_tracking.billUpdatedSuccess')); // Translated message with prefix
    } else {
      addBill(billData);
      message.success(t('bill_tracking.billAddedSuccess')); // Translated message with prefix
    }

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
        boxShadow: isDarkMode ? '0 4px 12px rgba(255, 255, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
        color: isDarkMode ? '#fff' : '#000',
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <Title level={2} style={{ marginBottom: 20, textAlign: 'center' }}>
        {t('bill_tracking.title')} {/* Translated title with prefix */}
      </Title>
      <Space style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title={t('bill_tracking.addNewBill')}>
            <StyledButton type="primary" icon={<PlusOutlined />} onClick={handleAddBill}>
              {t('bill_tracking.addBill')} {/* Translated button text with prefix */}
            </StyledButton>
          </Tooltip>
          <Tooltip title={t('bill_tracking.exportBills')}>
            <StyledButton type="default" icon={<FileExcelOutlined />} onClick={() => exportToExcel(bills)}>
              {t('bill_tracking.exportToExcel')} {/* Translated button text with prefix */}
            </StyledButton>
          </Tooltip>
        </div>
        <StyledInput
          placeholder={t('bill_tracking.searchVendorName')} // Translated placeholder text with prefix
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: 300 }}
        />
      </Space>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Tabs activeKey={activeTab} onChange={handleTabChange} defaultActiveKey="1" tabBarGutter={16}>
          <TabPane
            tab={
              <span>
                <TableOutlined />
                {t('bill_tracking.detailedBills')} {/* Translated tab name with prefix */}
              </span>
            }
            key="1"
          >
            {bills.length > 0 ? (
              <BillTable bills={filteredBills} onEdit={handleEditBill} onDelete={deleteBill} loading={loading} />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Text type="secondary">{t('bill_tracking.noBillsAvailable')}</Text> {/* Translated message with prefix */}
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                {t('bill_tracking.yearlySummary')} {/* Translated tab name with prefix */}
              </span>
            }
            key="2"
          >
            {bills.length > 0 ? (
              <YearSummaryTable bills={bills} />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Text type="secondary">{t('bill_tracking.noYearlySummary')}</Text> {/* Translated message with prefix */}
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <PieChartOutlined />
                {t('bill_tracking.visualizeExpenses')} {/* Translated tab name with prefix */}
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
                <Text type="secondary">{t('bill_tracking.noVisualizationData')}</Text> {/* Translated message with prefix */}
              </div>
            )}
          </TabPane>
        </Tabs>
      )}
      <Modal
        title={editBill ? t('bill_tracking.editBill') : t('bill_tracking.addBill')} // Translated modal title with prefix
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
