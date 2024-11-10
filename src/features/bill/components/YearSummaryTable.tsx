import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { Bill } from '../../../types/Bill';
import { useTheme } from '../../../contexts/ThemeContext';

interface YearSummaryProps {
  bills: Bill[];
}

const YearSummaryTable: React.FC<YearSummaryProps> = ({ bills }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const summaryData = Array.from(
    bills.reduce((map, bill) => {
      const year = new Date(bill.billDate).getFullYear();
      if (!map.has(year)) {
        map.set(year, { year, totalAmount: 0 });
      }
      const yearData = map.get(year);
      if (yearData) {
        yearData.totalAmount += bill.amount;
      }
      return map;
    }, new Map<number, { year: number; totalAmount: number }>()),
    ([_, value]) => value
  );

  const columns: ColumnsType<{ year: number; totalAmount: number }> = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      render: (year) => (
        <Button type="link" onClick={() => navigate(`/year/${year}`)}>{year}</Button>
      )
    },
    {
      title: 'Total Expenditure',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount
    }
  ];

  return (
    <Table
      dataSource={summaryData}
      columns={columns}
      rowKey="year"
      pagination={{ pageSize: 5 }}
      style={{ backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', padding: '20px', borderRadius: '8px' }}
      title={() => 'Yearly Summary of Bill Expenditure'}
    />
  );
};

export default YearSummaryTable;
