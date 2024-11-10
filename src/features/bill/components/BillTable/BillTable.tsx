import React from 'react';
import { Table, Button, Space, Popconfirm, Tooltip, Typography, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../../../../types/Bill';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from '../../../../contexts/ThemeContext';
import dayjs from 'dayjs';
import './BillTable.css';

const { Text } = Typography;

interface BillTableProps {
  bills: Bill[];
  loading: boolean; // Added loading prop
  onEdit: (bill: Bill) => void;
  onDelete: (id: string) => void;
}

const BillTable: React.FC<BillTableProps> = ({ bills, loading, onEdit, onDelete }) => {
  const { theme } = useTheme();

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
      filters: Array.from(new Set(bills.map(bill => bill.vendorName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.vendorName.includes(value as string),
    },
    {
      title: 'Type of Bill',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: Array.from(new Set(bills.map(bill => bill.type))).map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text ellipsis={{ tooltip: text }}>{text}</Text>,
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
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => {
        const numericAmount = Number(amount);
        return isNaN(numericAmount)
          ? <Text type="secondary">N/A</Text>
          : <Text strong>{`$${numericAmount.toFixed(2)}`}</Text>;
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: Array.from(new Set(bills.map(bill => bill.currency))).map(currency => ({ text: currency, value: currency })),
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
      render: (status) => {
        const color = status === 'Pending' ? 'orange' : status === 'Paid' ? 'green' : 'red';
        return <Text type={status === 'Paid' ? 'success' : 'warning'}>{status}</Text>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Bill">
            <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete Bill">
            <Popconfirm
              title="Are you sure you want to delete this bill?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getRowClassName = (record: Bill) => {
    if (record.isLocal) {
      return 'highlight-row';
    }
    return '';
  };

  return (
    <div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Table
          dataSource={bills}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          rowClassName={getRowClassName}
          style={{ backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', padding: '20px', borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default BillTable;