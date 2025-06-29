"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Cell,
} from "recharts";

const data = [
  { category: "Health care (including Medicaid)", value: -1.2 },
  { category: "Education", value: -0.8 },
  { category: "Agriculture", value: -0.6 },
  { category: "Other (energy, transport, infrastructure)", value: -0.9 },
  { category: "Tax revisions", value: 1.9 },
  { category: "New tax cuts", value: 0.6 },
  { category: "Defence", value: 1.3 },
  { category: "Homeland security (including immigration)", value: 0.4 },
  { category: "Judiciary", value: 0.1 },
];

export function BudgetImpactChart() {
  return (
    <div style={{ width: "100%", minWidth: 320, maxWidth: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 30, right: 30, left: 150, bottom: 30 }}
        >
          <XAxis
            type="number"
            domain={[-3, 3]}
            tick={{ fontSize: 13 }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={false}
          />
          <YAxis
            dataKey="category"
            type="category"
            width={150}
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            formatter={(value: number) =>
              value < 0
                ? [`-$${Math.abs(value)} trillion`, "Savings"]
                : [`+$${value} trillion`, "Cost"]
            }
          />
          <Legend />
          <Bar
            dataKey="value"
            name="Budget Impact"
            isAnimationActive={true}
          >
            {data.map((entry, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={entry.value < 0 ? "#60a5fa" : "#f87171"}
              />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(val: number) =>
                val > 0 ? `+${val}` : val < 0 ? `${val}` : val
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 