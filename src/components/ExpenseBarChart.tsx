import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bill } from '../types/Bill';

interface ExpenseBarChartProps {
  bills: Bill[];
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ bills }) => {
  const data = bills.reduce((acc, bill) => {
    const existingVendor = acc.find(item => item.name === bill.vendorName);
    if (existingVendor) {
      existingVendor.value += bill.amount;
    } else {
      acc.push({ name: bill.vendorName, value: bill.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
