import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../types/Bill';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from '../contexts/ThemeContext';

interface BillTableProps {
  bills: Bill[];
  onEdit: (bill: Bill) => void;
  onDelete: (id: string) => void;
}

const BillTable: React.FC<BillTableProps> = ({ bills, onEdit, onDelete }) => {
  const { theme } = useTheme();

  const columns: ColumnsType<Bill> = [
    { title: 'Bill ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id.localeCompare(b.id) },
    { title: 'Vendor Name', dataIndex: 'vendorName', key: 'vendorName', sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
      filters: Array.from(new Set(bills.map(bill => bill.vendorName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.vendorName.includes(value as string)
    },
    { title: 'Type of Bill', dataIndex: 'type', key: 'type', sorter: (a, b) => a.type.localeCompare(b.type),
      filters: Array.from(new Set(bills.map(bill => bill.type))).map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
    { title: 'Bill Date', dataIndex: 'billDate', key: 'billDate', sorter: (a, b) => new Date(a.billDate).getTime() - new Date(b.billDate).getTime() },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount - b.amount },
    { title: 'Currency', dataIndex: 'currency', key: 'currency',
      filters: Array.from(new Set(bills.map(bill => bill.currency))).map(currency => ({ text: currency, value: currency })),
      onFilter: (value, record) => record.currency === value
    },
    { title: 'Status', dataIndex: 'status', key: 'status',
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Paid', value: 'Paid' },
        { text: 'Overdue', value: 'Overdue' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Actions', key: 'actions',
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
      )
    }
  ];

  return (
    <Table
      dataSource={bills}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      style={{ backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', padding: '20px', borderRadius: '8px' }}
    />
  );
};

export default BillTable;
