"use client";

import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";
import RevenueChart from "./RevenueChart";
import {
  revenueStatsRow1,
  revenueStatsRow2,
  monthlyRevenueData,
  weeklyRevenueData,
  dailyRevenueData,
} from "@/data/revenueData";

export default function RevenueClient() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Revenue"
        description="Here is the revenue details"
      />

      <main className="p-4 md:p-6 lg:p-8 space-y-8">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueStatsRow1.map((item, index) => (
            <StatsCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconBgColor={item.iconBgColor}
              iconColor={item.iconColor}
              className="border-none shadow-[0px_0px_45px_0px_#6565652E]"
            />
          ))}
        </div>

        {/* Second Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full ">
          {revenueStatsRow2.map((item, index) => (
            <StatsCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconBgColor={item.iconBgColor}
              iconColor={item.iconColor}
              className="border-none shadow-[0px_0px_45px_0px_#6565652E] flex-1"
            />
          ))}
        </div>

        {/* Monthly Revenue (Top Chart) */}
        <div className="w-full">
          <RevenueChart
            data={monthlyRevenueData}
            title="Monthly Revenue"
            description="Monthly revenue overview"
            lineColor="#0190FE"
            dotColor="#0190FE"
          />
        </div>

        {/* Bottom charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart
            data={weeklyRevenueData}
            title="Weekly Revenue"
            description="Weekly revenue overview"
            lineColor="#E53935"
            dotColor="#E53935"
            yAxisTicks={[0, 35000, 70000, 105000, 140000]}
          />
          <RevenueChart
            data={dailyRevenueData}
            title="Daily Revenue"
            description="Daily revenue overview"
            lineColor="#4CAF50"
            dotColor="#4CAF50"
            yAxisTicks={[0, 35000, 70000, 105000, 140000]}
          />
        </div>
      </main>
    </div>
  );
}
