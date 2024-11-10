// BillTrackingApp.tsx

import React, { useState, useEffect } from 'react';
import { Space, Modal, Tabs, Typography, message, Tooltip } from 'antd';
import { PlusOutlined, FileExcelOutlined, TableOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { Bill } from '../../types/Bill';
import useBillData from '../../hooks/useBillData';
import { useExport } from '../../hooks/useExport';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalTranslation } from '../../contexts/TranslationContext';
import BillTrackingCard from '../../features/bill/components/BillTrackingCard/BillTrackingCard';
import SearchBar from '../../features/bill/components/SearchBar/SearchBar';
import DetailedBillsTab from '../../features/bill/components/DetailedBillsTab/DetailedBillsTab';
import BillFormModal from '../../features/bill/components/BillFormModal/BillFormModal';
import StyledButton from '../../components/StyledButton/StyledButton';
import styles from './BillTrackingApp.module.css';
import ExpensePieChart from 'src/features/bill/components/ExpensePieChart';
import ExpenseBarChart from 'src/features/bill/components/ExpenseBarChart';
import YearSummaryTable from 'src/features/bill/components/YearSummaryTable';
import { BillTrackingAppConstants } from './BillTrackingAppConstants'; // Import the constants

const { Title } = Typography;
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
      bills.filter((bill) =>
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

  const handleFormSubmit = async (billData: Bill) => {
    if (editBill) {
      updateBill(billData);
      message.success(t(BillTrackingAppConstants.billUpdatedSuccess));
    } else {
      addBill(billData);
      message.success(t(BillTrackingAppConstants.billAddedSuccess));
    }

    setFormModalVisible(false);
    await syncWithBackend();
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem('activeTab', key);
  };

  return (
    <BillTrackingCard>
      <Title level={2} style={{ marginBottom: 20, textAlign: 'center' }}>
        {t(BillTrackingAppConstants.title)}
      </Title>
      <Space
        style={{
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title={t(BillTrackingAppConstants.addNewBill)}>
            <StyledButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddBill}
            >
              {t(BillTrackingAppConstants.addBill)}
            </StyledButton>
          </Tooltip>
          <Tooltip title={t(BillTrackingAppConstants.exportBills)}>
            <StyledButton
              type="default"
              icon={<FileExcelOutlined />}
              onClick={() => exportToExcel(bills)}
            >
              {t(BillTrackingAppConstants.exportToExcel)}
            </StyledButton>
          </Tooltip>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Space>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        defaultActiveKey="1"
        tabBarGutter={16}
        className={`${styles.customTabs} ${isDarkMode ? styles.dark : styles.light
          }`}
        tabBarStyle={{
          backgroundColor: isDarkMode ? '#2b2b2b' : '#ffffff',
          borderBottom: isDarkMode ? '1px solid #444444' : '1px solid #e8e8e8',
        }}
      >
        <TabPane
          tab={
            <span
              className={`${styles.tabLabel} ${activeTab === '1'
                ? isDarkMode
                  ? styles.activeDarkTab
                  : styles.activeLightTab
                : ''
                }`}
            >
              <TableOutlined />
              {t(BillTrackingAppConstants.detailedBills)}
            </span>
          }
          key="1"
        >
          <DetailedBillsTab
            filteredBills={filteredBills}
            onEdit={(editBill) => setEditBill(editBill)}
            onDelete={deleteBill}
            loading={loading}
          />
        </TabPane>
        <TabPane
          tab={
            <span
              className={`${styles.tabLabel} ${activeTab === '2'
                ? isDarkMode
                  ? styles.activeDarkTab
                  : styles.activeLightTab
                : ''
                }`}
            >
              <BarChartOutlined />
              {t(BillTrackingAppConstants.yearlySummary)}
            </span>
          }
          key="2"
        >
          <YearSummaryTable bills={bills} />
        </TabPane>
        <TabPane
          tab={
            <span
              className={`${styles.tabLabel} ${activeTab === '3'
                ? isDarkMode
                  ? styles.activeDarkTab
                  : styles.activeLightTab
                : ''
                }`}
            >
              <PieChartOutlined />
              {t(BillTrackingAppConstants.visualizeExpenses)}
            </span>
          }
          key="3"
        >
          <div>
            <ExpensePieChart bills={bills} />
            <ExpenseBarChart bills={bills} />
          </div>
        </TabPane>
      </Tabs>

      {/* Modal */}
      <Modal
        title={
          editBill
            ? t(BillTrackingAppConstants.editBill)
            : t(BillTrackingAppConstants.addBill)
        }
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
    </BillTrackingCard>
  );
};

export default BillTrackingApp;
