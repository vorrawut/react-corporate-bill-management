// src/components/BillAnalytics.tsx
import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Bill } from '../types/Bill';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BillAnalyticsProps {
  bills: Bill[];
}

const BillAnalytics: React.FC<BillAnalyticsProps> = ({ bills }) => {
  const billStatusCounts = bills.reduce(
    (acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Paid: 0, Overdue: 0 }
  );

  const data = {
    labels: ['Pending', 'Paid', 'Overdue'],
    datasets: [
      {
        label: 'Number of Bills',
        data: [billStatusCounts.Pending, billStatusCounts.Paid, billStatusCounts.Overdue],
        backgroundColor: ['#FFCC00', '#4CAF50', '#F44336'],
      },
    ],
  };

  return (
    <Card title="Bill Status Analytics" style={{ marginTop: 20 }}>
      <Bar data={data} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bill Status Distribution',
          },
        },
      }} />
    </Card>
  );
};

export default BillAnalytics;
