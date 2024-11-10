import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, PieLabelRenderProps } from 'recharts';
import { Bill } from '../../../types/Bill';

interface ExpensePieChartProps {
  bills: Bill[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ bills }) => {
  // Group expenses by status for pie chart data
  const data = bills.reduce((acc, bill) => {
    const found = acc.find(item => item.name === bill.status);
    if (found) {
      found.value += bill.amount;
    } else {
      acc.push({ name: bill.status, value: bill.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Explicit type for label function parameter
  const renderCustomizedLabel = (props: PieLabelRenderProps): string => {
    const { name, percent } = props;
    return `${name}: ${(percent?? 0 * 100).toFixed(0)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={renderCustomizedLabel}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;