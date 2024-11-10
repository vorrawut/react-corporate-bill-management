// Tabs/DetailedBillsTab.tsx
import React from 'react';
import { Typography } from 'antd';
import { Bill } from '../../../../types/Bill';
import BillTable from '../../../../features/bill/components/BillTable/BillTable';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';

const { Text } = Typography;

interface DetailedBillsTabProps {
    filteredBills: Bill[];
    onEdit: (bill: Bill) => void;
    onDelete: (id: string) => void;
    loading: boolean;
}

const DetailedBillsTab: React.FC<DetailedBillsTabProps> = ({ filteredBills, onEdit, onDelete, loading }) => {
    const t = useGlobalTranslation();

    return (
        <>
            {filteredBills.length > 0 ? (
                <BillTable bills={filteredBills} onEdit={onEdit} onDelete={onDelete} loading={loading} />
            ) : (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Text type="secondary">{t('bill_tracking.noBillsAvailable')}</Text>
                </div>
            )}
        </>
    );
};

export default DetailedBillsTab;
