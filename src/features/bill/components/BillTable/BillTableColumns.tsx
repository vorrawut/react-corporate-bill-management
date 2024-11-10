import { ColumnsType } from 'antd/es/table';
import { Button, Space, Tooltip, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../../../../types/Bill';
import dayjs from 'dayjs';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext'; // Import translation hook

const { Text } = Typography;

export const getBillTableColumns = (
  bills: Bill[],
  onEdit: (bill: Bill) => void,
  onDelete: (id: string) => void,
  theme: 'light' | 'dark' // Added theme parameter
): ColumnsType<Bill> => {
  const t = useGlobalTranslation(); // Translation hook for multilingual support

  return [
    {
      title: t('bill_table_column.billId'), // Translated title
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: t('bill_table_column.vendorName'), // Translated title
      dataIndex: 'vendorName',
      key: 'vendorName',
      sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.vendorName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.vendorName.includes(value as string),
    },
    {
      title: t('bill_table_column.typeOfBill'), // Translated title
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.type))).map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: t('bill_table_column.description'), // Translated title
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ color: theme === 'dark' ? '#e0e0e0' : '#000' }}>
          {text}
        </Text>
      ),
    },
    {
      title: t('bill_table_column.invoiceNumber'), // Translated title
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: t('bill_table_column.billDate'), // Translated title
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
      title: t('bill_table_column.dueDate'), // Translated title
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
      title: t('bill_table_column.amount'), // Translated title
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => {
        const numericAmount = Number(amount);
        return isNaN(numericAmount)
          ? <Text type="secondary" style={{ color: theme === 'dark' ? '#a0a0a0' : '#8c8c8c' }}>{t('bill_table_column.na')}</Text> // Translate 'N/A'
          : <Text strong style={{ color: theme === 'dark' ? '#3cb371' : '#000' }}>{`$${numericAmount.toFixed(2)}`}</Text>;
      },
    },
    {
      title: t('bill_table_column.currency'), // Translated title
      dataIndex: 'currency',
      key: 'currency',
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.currency))).map(currency => ({ text: currency, value: currency })),
      onFilter: (value, record) => record.currency === value,
    },
    {
      title: t('bill_table_column.status'), // Translated title
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t('bill_table_column.pending'), value: 'Pending' },
        { text: t('bill_table_column.paid'), value: 'Paid' },
        { text: t('bill_table_column.overdue'), value: 'Overdue' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = status === 'Pending' ? (theme === 'dark' ? '#ffcc00' : 'orange')
          : status === 'Paid' ? (theme === 'dark' ? '#3cb371' : 'green')
            : (theme === 'dark' ? '#ff4d4f' : 'red');
        return <Text style={{ color }}>{t(`bill_table_column.${status.toLowerCase()}`)}</Text>; // Translate status
      },
    },
    {
      title: t('bill_table_column.actions'), // Translated title
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title={t('bill_table_column.editBill')}> {/* Translate 'Edit Bill' */}
            <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title={t('bill_table_column.deleteBill')}> {/* Translate 'Delete Bill' */}
            <Popconfirm
              title={t('bill_table_column.deleteConfirmation')} // Translate confirmation message
              onConfirm={() => onDelete(record.id)}
              okText={t('bill_table_column.yes')} // Translate 'Yes'
              cancelText={t('bill_table_column.no')} // Translate 'No'
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
};
