import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList, Cell
} from 'recharts';
import { Bill } from '../types/Bill';

interface ExpenseBarChartProps {
  bills: Bill[];
  onBarClick?: (vendorName: string) => void; // Optional click event handler
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ bills, onBarClick }) => {
  const data = bills.reduce((acc, bill) => {
    const existingVendor = acc.find(item => item.name === bill.vendorName);
    if (existingVendor) {
      existingVendor.value += bill.amount;
    } else {
      acc.push({ name: bill.vendorName, value: bill.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const colorScale = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0'];

  const formatValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
      // Convert string to number if it's a valid numeric string
      return `$${parseFloat(value).toFixed(2)}`;
    }
    return '$0.00'; // Fallback for non-numeric or undefined values
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Expense Breakdown by Vendor</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          onClick={(e) => {
            if (e && e.activePayload && onBarClick) {
              const clickedVendor = e.activePayload[0].payload.name;
              onBarClick(clickedVendor);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name">
            <Label value="Vendor" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Amount ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #ccc' }}
            formatter={(value) => formatValue(value)}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="value" barSize={50} animationDuration={1000}>
            <LabelList dataKey="value" position="top" formatter={(value: number| string) => formatValue(value)} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorScale[index % colorScale.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
