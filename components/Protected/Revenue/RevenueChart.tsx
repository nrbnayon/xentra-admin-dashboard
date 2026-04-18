"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TranslatedText from "@/components/Shared/TranslatedText";
import { ChartDataPoint } from "@/types/revenue.types";

interface RevenueChartProps {
  data: ChartDataPoint[];
  title: string;
  description: string;
  lineColor?: string;
  dotColor?: string;
  yAxisTicks?: number[];
  height?: number;
}

const CustomDot = ({ cx, cy, fill }: any) => {
  return <circle cx={cx} cy={cy} r={5} fill={fill} stroke="none" />;
};

export default function RevenueChart({
  data,
  title,
  description,
  lineColor = "#0190FE",
  dotColor = "#0190FE",
  yAxisTicks,
  height = 400,
}: RevenueChartProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0px_0px_45px_0px_#6565652E] w-full border-none">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">
          <TranslatedText text={title} />
        </h2>
        <p className="text-sm text-secondary mt-1">
          <TranslatedText text={description} />
        </p>
      </div>

      <div style={{ height: `${height}px` }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="label"
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={true}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              dy={15}
            />
            <YAxis
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={true}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              ticks={yAxisTicks}
              domain={
                yAxisTicks && yAxisTicks.length > 0
                  ? [0, yAxisTicks[yAxisTicks.length - 1]]
                  : ["auto", "auto"]
              }
              dx={-15}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] border-none">
                      <p className="text-sm font-semibold text-foreground">
                        {payload[0].payload.label}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: lineColor }}
                      >
                        {payload[0]?.value !== undefined ? payload[0]?.value.toLocaleString() : null} HTG
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            <Line
              type="linear"
              dataKey="revenue"
              stroke={lineColor}
              strokeWidth={2}
              dot={<CustomDot fill={dotColor} />}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend at bottom */}
      <div className="flex justify-center items-center mt-2 gap-2">
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
          <div className="flex items-center pt-[2px]">
            <svg
              width="24"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6H24"
                stroke={lineColor}
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              <circle
                cx="12"
                cy="6"
                r="4"
                stroke={lineColor}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-sm font-medium" style={{ color: lineColor }}>
            <TranslatedText text="Revenue" />
          </span>
        </div>
      </div>
    </div>
  );
}
