// src/pages/Dashboard.tsx
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { BarChartOutlined, DollarOutlined, FileOutlined } from '@ant-design/icons';
import BillAnalytics from '../components/BillAnalytics';
import useBillData from '../hooks/useBillData';

const Dashboard: React.FC = () => {
  const { bills } = useBillData();

  const totalBills = bills.length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueCount = bills.filter((bill) => bill.status === 'Overdue').length;

  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Bills"
              value={totalBills}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Amount"
              value={totalAmount}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Overdue Bills"
              value={overdueCount}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <BillAnalytics bills={bills} />
    </div>
  );
};

export default Dashboard;
