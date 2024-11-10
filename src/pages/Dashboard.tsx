import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Tooltip, Space, Skeleton } from 'antd';
import { BarChartOutlined, DollarOutlined, FileOutlined } from '@ant-design/icons';
import BillAnalytics from '../features/bill/components/BillAnalytics';
import useBillData from '../hooks/useBillData';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { bills, loading } = useBillData();
  const [totalBills, setTotalBills] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      setTotalBills(bills.length);
      setTotalAmount(bills.reduce((sum, bill) => sum + bill.amount, 0));
      setOverdueCount(bills.filter((bill) => bill.status === 'Overdue').length);
    }
  }, [bills, loading]);

  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>Dashboard</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                }}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))
        ) : (
          <>
            <Col xs={24} sm={12} md={8}>
              <Tooltip title="Total number of bills in the system">
                <Card
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Statistic
                    title="Total Bills"
                    value={totalBills}
                    prefix={<FileOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Tooltip>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Tooltip title="Total amount across all bills">
                <Card
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Statistic
                    title="Total Amount"
                    value={totalAmount}
                    prefix={<DollarOutlined />}
                    precision={2}
                    valueStyle={{ color: totalAmount >= 0 ? '#cf1322' : '#3f8600' }}
                    formatter={value => new Intl.NumberFormat().format(Number(value))}
                  />
                </Card>
              </Tooltip>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Tooltip title="Number of overdue bills">
                <Card
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Statistic
                    title="Overdue Bills"
                    value={overdueCount}
                    prefix={<BarChartOutlined />}
                    valueStyle={{ color: '#d48806' }}
                  />
                </Card>
              </Tooltip>
            </Col>
          </>
        )}
      </Row>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {loading ? <Skeleton active paragraph={{ rows: 4 }} /> : <BillAnalytics bills={bills} />}
      </Space>
    </div>
  );
};

export default Dashboard;
