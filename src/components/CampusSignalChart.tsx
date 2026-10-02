"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  date: string;
  registrations: number;
}

export function CampusSignalChart({ data }: { data: DataPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#687386] font-mono">
        Your campaign is live. The first registration is waiting.
      </div>
    );
  }

  // Format date display (MM-DD)
  const formattedData = data.map((d) => ({
    ...d,
    displayDate: d.date.length > 5 ? d.date.substring(5) : d.date,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="displayDate"
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0B1220",
              border: "1px solid rgba(220, 225, 232, 0.2)",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
            labelStyle={{ color: "#94A3B8" }}
            formatter={(value) => [`${value} Registrations`, "Volume"]}
          />
          <Area
            type="monotone"
            dataKey="registrations"
            stroke="#2563EB"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#blueGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
