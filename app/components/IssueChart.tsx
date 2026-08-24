"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open",        count: open,        color: "var(--red-9)"    },
    { label: "In Progress", count: inProgress,  color: "var(--orange-9)" },
    { label: "Closed",      count: closed,       color: "var(--green-9)"  },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={44}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--gray-a4)" />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--gray-11)", fontSize: 12 }}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--gray-11)", fontSize: 12 }}
          width={28}
        />
        <Tooltip
          cursor={{ fill: "var(--gray-a3)" }}
          contentStyle={{
            borderRadius: "var(--radius-3)",
            border: "1px solid var(--gray-a5)",
            background: "var(--color-panel-solid)",
            color: "var(--gray-12)",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssueChart;
