// src/components/BillTable.tsx
import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../types/Bill';
import type { ColumnsType } from 'antd/es/table';

interface BillTableProps {
  bills: Bill[];
  onEdit: (bill: Bill) => void;
  onDelete: (id: string) => void;
}

const BillTable: React.FC<BillTableProps> = ({ bills, onEdit, onDelete }) => {
  const columns: ColumnsType<Bill> = [
    {
      title: 'Bill ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
      sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
      filters: Array.from(new Set(bills.map(bill => bill.vendorName))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.vendorName.includes(value as string),
    },
    {
      title: 'Type of Bill',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: Array.from(new Set(bills.map(bill => bill.type))).map(type => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Bill Date',
      dataIndex: 'billDate',
      key: 'billDate',
      sorter: (a, b) => new Date(a.billDate).getTime() - new Date(b.billDate).getTime(),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: Array.from(new Set(bills.map(bill => bill.currency))).map(currency => ({
        text: currency,
        value: currency,
      })),
      onFilter: (value, record) => record.currency === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Paid', value: 'Paid' },
        { text: 'Overdue', value: 'Overdue' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm
            title="Are you sure you want to delete this bill?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table dataSource={bills} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
  );
};

interface YearSummaryProps {
  bills: Bill[];
}

const YearSummaryTable: React.FC<YearSummaryProps> = ({ bills }) => {
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
      ),
    },
    {
      title: 'Total Expenditure',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
  ];

  return (
    <Table
      dataSource={summaryData}
      columns={columns}
      rowKey="year"
      pagination={{ pageSize: 5 }}
      title={() => 'Yearly Summary of Bill Expenditure'}
    />
  );
};

export { BillTable, YearSummaryTable };
