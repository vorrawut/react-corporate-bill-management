import { ColumnsType } from 'antd/es/table';
import { Button, Space, Tooltip, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../../../../types/Bill';
import dayjs from 'dayjs';

const { Text } = Typography;

export const getBillTableColumns = (
  bills: Bill[], 
  onEdit: (bill: Bill) => void,
  onDelete: (id: string) => void,
  theme: 'light' | 'dark' // Added theme parameter
): ColumnsType<Bill> => [
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
    filters: Array.from(new Set(bills.map((bill: Bill) => bill.vendorName))).map(name => ({ text: name, value: name })),
    onFilter: (value, record) => record.vendorName.includes(value as string),
  },
  {
    title: 'Type of Bill',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => a.type.localeCompare(b.type),
    filters: Array.from(new Set(bills.map((bill: Bill) => bill.type))).map(type => ({ text: type, value: type })),
    onFilter: (value, record) => record.type === value,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (
      <Text ellipsis={{ tooltip: text }} style={{ color: theme === 'dark' ? '#e0e0e0' : '#000' }}>
        {text}
      </Text>
    ),
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
    render: (date) => (
      <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#000' }}>
        {dayjs(date).format('DD MMM YYYY')}
      </Text>
    ),
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    render: (date) => (
      <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#000' }}>
        {dayjs(date).format('DD MMM YYYY')}
      </Text>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => Number(a.amount) - Number(b.amount),
    render: (amount) => {
      const numericAmount = Number(amount);
      return isNaN(numericAmount)
        ? <Text type="secondary" style={{ color: theme === 'dark' ? '#a0a0a0' : '#8c8c8c' }}>N/A</Text>
        : <Text strong style={{ color: theme === 'dark' ? '#3cb371' : '#000' }}>{`$${numericAmount.toFixed(2)}`}</Text>;
    },
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    filters: Array.from(new Set(bills.map((bill: Bill) => bill.currency))).map(currency => ({ text: currency, value: currency })),
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
      const color = status === 'Pending' ? (theme === 'dark' ? '#ffcc00' : 'orange') 
                  : status === 'Paid' ? (theme === 'dark' ? '#3cb371' : 'green') 
                  : (theme === 'dark' ? '#ff4d4f' : 'red');
      return <Text style={{ color }}>{status}</Text>;
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