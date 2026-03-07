"use client";

import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";
import RevenueTrendChart from "./RevenueTrendChart";
import {
  dashboardStatsTop,
  dashboardStatsBottom,
  revenueChartData,
} from "@/data/dashboardData";
import TranslatedText from "@/components/Shared/TranslatedText";

export default function DashboardClient() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Dashboard"
        description="Here is the overall details of your dashboard"
      />

      <main className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStatsTop.map((stat, index) => (
              <StatsCard
                key={index}
                title={<TranslatedText text={stat.title} />}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                iconBgColor={stat.iconBgColor}
              />
            ))}
          </div>

          {/* Bottom Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* The second row has only two cards taking up space of 1 each in a 4 col grid, or maybe they just take 1 col each, so we map them normally */}
            {dashboardStatsBottom.map((stat, index) => (
              <StatsCard
                key={index}
                title={<TranslatedText text={stat.title} />}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                iconBgColor={stat.iconBgColor}
              />
            ))}
          </div>

          {/* RevenueCostTrendChart section */}
          <RevenueTrendChart data={revenueChartData} />
        </div>
      </main>
    </div>
  );
}
