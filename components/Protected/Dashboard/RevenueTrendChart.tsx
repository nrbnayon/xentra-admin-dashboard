"use client";

import { RevenueData } from "@/types/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import TranslatedText from "@/components/Shared/TranslatedText";

interface RevenueTrendChartProps {
  data: RevenueData[];
}

const CustomDot = (props: any) => {
  const { cx, cy, stroke, payload } = props;

  return <circle cx={cx} cy={cy} r={5} fill="#0095FF" stroke="none" />;
};

export default function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0px_0px_45px_0px_#6565652E] w-full mb-8 border-none">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">
          <TranslatedText text="Revenue" />
        </h2>
        <p className="text-sm text-secondary mt-1">
          <TranslatedText text="Monthly revenue overview" />
        </p>
      </div>

      <div className="h-[400px] w-full">
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
              dataKey="month"
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={true}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              dy={15}
            />
            <YAxis
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={true}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              ticks={[0, 35000, 70000, 105000, 140000]}
              domain={[0, 140000]}
              dx={-15}
            />
            <Line
              type="linear"
              dataKey="revenue"
              stroke="#0095FF"
              strokeWidth={2}
              dot={<CustomDot />}
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
                stroke="#0095FF"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              <circle cx="12" cy="6" r="4" fill="#0095FF" />
            </svg>
          </div>
          <span className="text-sm text-[#0095FF] font-medium">
            <TranslatedText text="Revenue" />
          </span>
        </div>
      </div>
    </div>
  );
}
