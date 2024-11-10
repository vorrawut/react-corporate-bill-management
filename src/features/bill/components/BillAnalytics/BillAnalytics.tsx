import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Bill } from '../../../../types/Bill';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useGlobalTranslation } from '../../../../contexts/TranslationContext';
import { BillAnalyticsConstants, BILL_STATUS_TRANSLATION_MAP } from './BillAnalyticsConstants';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BillAnalyticsProps {
  bills: Bill[];
}

const BillAnalytics: React.FC<BillAnalyticsProps> = ({ bills }) => {
  const t = useGlobalTranslation(); // Translation hook for multilingual support

  const billStatusCounts = bills.reduce(
    (acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Paid: 0, Overdue: 0 }
  );

  // Use translation map for status labels
  const labels = [
    t(BILL_STATUS_TRANSLATION_MAP.Pending),
    t(BILL_STATUS_TRANSLATION_MAP.Paid),
    t(BILL_STATUS_TRANSLATION_MAP.Overdue),
  ];

  const data = {
    labels, // Use translated labels
    datasets: [
      {
        label: t(BillAnalyticsConstants.numberOfBills), // Translate the dataset label
        data: [billStatusCounts.Pending, billStatusCounts.Paid, billStatusCounts.Overdue],
        backgroundColor: ['#FFCC00', '#4CAF50', '#F44336'],
      },
    ],
  };

  return (
    <Card
      title={t(BillAnalyticsConstants.billStatusAnalytics)} // Translate the card title
      style={{
        marginTop: 20,
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: t(BillAnalyticsConstants.billStatusDistribution), // Translate the chart title
            },
          },
        }}
      />
    </Card>
  );
};

export default BillAnalytics;
