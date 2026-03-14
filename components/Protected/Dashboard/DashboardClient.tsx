"use client";

import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";
import RevenueTrendChart from "./RevenueTrendChart";
import {
  dashboardStatsTop,
  dashboardStatsBottom,
} from "@/data/dashboardData";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetAdminDashboardOverviewQuery } from "@/redux/services/dashboardApi";
import { DashboardSkeleton } from "@/components/Skeleton/DashboardSkeleton";

export default function DashboardClient() {
  const { data: apiData, isLoading } = useGetAdminDashboardOverviewQuery();

  if (isLoading) {
    return (
      <div className="pb-10 min-h-screen">
        <DashboardHeader
          title="Dashboard"
          description="Here is the overall details of your dashboard"
        />
        <main className="p-4 md:p-6 lg:p-8">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  // Map top stats
  const topStats = [
    {
      ...dashboardStatsTop[0],
      value: apiData?.total_users ?? 0,
    },
    {
      ...dashboardStatsTop[1],
      value: apiData?.active_matches ?? 0,
    },
    {
      ...dashboardStatsTop[2],
      value: `$${apiData?.total_entry_collection ?? "0.00"}`,
    },
    {
      ...dashboardStatsTop[3],
      value: `$${parseFloat(apiData?.total_platform_revenue || "0").toFixed(2)}`,
    },
  ];

  // Map bottom stats
  const bottomStats = [
    {
      ...dashboardStatsBottom[0],
      value: apiData?.active_users_today ?? 0,
    },
    {
      ...dashboardStatsBottom[1],
      value: apiData?.pending_withdrawals ?? 0,
    },
  ];

  // Map chart data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = apiData?.monthly_revenue?.map((val, idx) => ({
    month: months[idx],
    revenue: parseFloat(val) || 0,
  })) || [];

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
            {topStats.map((stat, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bottomStats.map((stat, index) => (
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
          <RevenueTrendChart data={chartData} />
        </div>
      </main>
    </div>
  );
}
