// BillTableColumns.tsx

import { ColumnsType } from 'antd/es/table';
import { Button, Space, Tooltip, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Bill } from '../../../../types/Bill';
import dayjs from 'dayjs';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext'; // Import translation hook
import { BillTableColumnConstants, STATUS_TRANSLATION_MAP } from './BillTableColumnConstants'; // Import constants

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
      title: t(BillTableColumnConstants.billId), // Translated title
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: t(BillTableColumnConstants.vendorName), // Translated title
      dataIndex: 'vendorName',
      key: 'vendorName',
      sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.vendorName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.vendorName.includes(value as string),
    },
    {
      title: t(BillTableColumnConstants.typeOfBill), // Translated title
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.type))).map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: t(BillTableColumnConstants.description), // Translated title
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ color: theme === 'dark' ? '#e0e0e0' : '#000' }}>
          {text}
        </Text>
      ),
    },
    {
      title: t(BillTableColumnConstants.invoiceNumber), // Translated title
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: t(BillTableColumnConstants.billDate), // Translated title
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
      title: t(BillTableColumnConstants.dueDate), // Translated title
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
      title: t(BillTableColumnConstants.amount), // Translated title
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => {
        const numericAmount = Number(amount);
        return isNaN(numericAmount)
          ? <Text type="secondary" style={{ color: theme === 'dark' ? '#a0a0a0' : '#8c8c8c' }}>{t(BillTableColumnConstants.na)}</Text> // Translate 'N/A'
          : <Text strong style={{ color: theme === 'dark' ? '#3cb371' : '#000' }}>{`$${numericAmount.toFixed(2)}`}</Text>;
      },
    },
    {
      title: t(BillTableColumnConstants.currency), // Translated title
      dataIndex: 'currency',
      key: 'currency',
      filters: Array.from(new Set(bills.map((bill: Bill) => bill.currency))).map(currency => ({ text: currency, value: currency })),
      onFilter: (value, record) => record.currency === value,
    },
    {
      title: t(BillTableColumnConstants.status), // Translated title
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t(BillTableColumnConstants.pending), value: 'Pending' },
        { text: t(BillTableColumnConstants.paid), value: 'Paid' },
        { text: t(BillTableColumnConstants.overdue), value: 'Overdue' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = status === 'Pending' ? (theme === 'dark' ? '#ffcc00' : 'orange')
          : status === 'Paid' ? (theme === 'dark' ? '#3cb371' : 'green')
            : (theme === 'dark' ? '#ff4d4f' : 'red');

        // Safely access the translation key from the status map
        const translationKey = STATUS_TRANSLATION_MAP[status.toLowerCase() as keyof typeof STATUS_TRANSLATION_MAP];

        return <Text style={{ color }}>{t(translationKey)}</Text>;
      },
    },
    {
      title: t(BillTableColumnConstants.actions), // Translated title
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title={t(BillTableColumnConstants.editBill)}> {/* Translate 'Edit Bill' */}
            <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title={t(BillTableColumnConstants.deleteBill)}> {/* Translate 'Delete Bill' */}
            <Popconfirm
              title={t(BillTableColumnConstants.deleteConfirmation)} // Translate confirmation message
              onConfirm={() => onDelete(record.id)}
              okText={t(BillTableColumnConstants.yes)} // Translate 'Yes'
              cancelText={t(BillTableColumnConstants.no)} // Translate 'No'
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
};
