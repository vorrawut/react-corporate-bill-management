import React from 'react';
import { Table, Skeleton } from 'antd';
import { Bill } from '../../../../types/Bill';
import { useTheme } from '../../../../contexts/ThemeContext';
import { getBillTableColumns } from './BillTableColumns';
import './BillTable.css';

interface BillTableProps {
  bills: Bill[];
  loading: boolean;
  onEdit: (bill: Bill) => void;
  onDelete: (id: string) => void;
}

const BillTable: React.FC<BillTableProps> = ({ bills, loading, onEdit, onDelete }) => {
  const { theme } = useTheme();

  const getRowClassName = (record: Bill) => {
    if (record.isLocal) {
      return theme === 'dark' ? 'highlight-row-dark' : 'highlight-row';
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
          columns={getBillTableColumns(bills, onEdit, onDelete, theme)}
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