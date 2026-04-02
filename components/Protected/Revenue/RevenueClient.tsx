"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";
import { TrendingUp, ShoppingBag } from "lucide-react";
import { useGetRevenueQuery } from "@/redux/services/revenueApi";
import { DashboardStatSkeleton, ChartSkeleton } from "@/components/Skeleton/DashboardSkeleton";

// Dynamically import the chart — `ssr: false` prevents Recharts from trying
// to measure DOM dimensions before hydration (which causes width/height = -1 warnings).
const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false,
  loading: () => <ChartSkeleton height="400px" />,
});

export default function RevenueClient() {
  const { data: apiData, isLoading } = useGetRevenueQuery();

  // Transform Stats Data
  const statsRow1 = useMemo(() => {
    if (!apiData) return [];
    return [
      {
        title: "Today's Revenue",
        value: `${apiData.todays_revenue} HTG`,
        iconBgColor: "#E8F5E9",
        iconColor: "#4CAF50",
        icon: TrendingUp,
      },
      {
        title: "This Week's Revenue",
        value: `${apiData.this_weeks_revenue} HTG`,
        iconBgColor: "#E8F5E9",
        iconColor: "#4CAF50",
        icon: TrendingUp,
      },
      {
        title: "This Month's Revenue",
        value: `${apiData.this_months_revenue} HTG`,
        iconBgColor: "#E8F5E9",
        iconColor: "#4CAF50",
        icon: TrendingUp,
      },
      {
        title: "Total Revenue",
        value: `${apiData.total_revenue} HTG`,
        iconBgColor: "#E8F5E9",
        iconColor: "#4CAF50",
        icon: TrendingUp,
      },
    ];
  }, [apiData]);

  const statsRow2 = useMemo(() => {
    if (!apiData) return [];
    return [
      {
        title: "Total Entry Collected",
        value: `${apiData.total_entry_collected} HTG`,
        iconBgColor: "#FCE4EC",
        iconColor: "#E91E63",
        icon: ShoppingBag,
      },
      {
        title: "Total Prize Distributed",
        value: `${apiData.total_prize_distributed} HTG`,
        iconBgColor: "#FCE4EC",
        iconColor: "#E91E63",
        icon: ShoppingBag,
      },
    ];
  }, [apiData]);

  // Transform Chart Data
  const monthlyData = useMemo(() => {
    if (!apiData?.monthly_revenue) return [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return apiData.monthly_revenue.map((val, i) => ({
      label: months[i] || `M${i + 1}`,
      revenue: parseFloat(val) || 0,
    }));
  }, [apiData]);

  const weeklyData = useMemo(() => {
    if (!apiData?.weekly_revenue) return [];
    return apiData.weekly_revenue.map((val, i) => ({
      label: `Week ${i + 1}`,
      revenue: parseFloat(val) || 0,
    }));
  }, [apiData]);

  const dailyData = useMemo(() => {
    if (!apiData?.daily_revenue) return [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return apiData.daily_revenue.map((val, i) => ({
      label: days[i] || `D${i + 1}`,
      revenue: parseFloat(val) || 0,
    }));
  }, [apiData]);

  // Helper to calculate smart Y-axis ticks
  const getSmartTicks = (data: any[]) => {
    if (!data.length) return [0, 10, 20, 30, 40];
    
    const max = Math.max(...data.map((d) => d.revenue));
    if (max === 0) return [0, 10, 20, 30, 40];

    // Find a nice step size
    // We want roughly 5 ticks
    const targetTicks = 5;
    const rawStep = max / (targetTicks - 1);
    
    // Handle cases where max is very small (like 5.25) or very large
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const ratio = rawStep / magnitude;

    let step;
    if (ratio < 1.5) step = 1 * magnitude;
    else if (ratio < 3) step = 2 * magnitude;
    else if (ratio < 7) step = 5 * magnitude;
    else step = 10 * magnitude;

    const ticks = [];
    let currentTick = 0;

    // Add ticks until we cover the max value
    while (ticks.length === 0 || ticks[ticks.length - 1] < max) {
      ticks.push(Number(currentTick.toFixed(2)));
      currentTick += step;
    }

    // Ensure we have at least a few ticks for aesthetics
    while (ticks.length < 5) {
      ticks.push(Number(currentTick.toFixed(2)));
      currentTick += step;
    }

    return ticks;
  };

  if (isLoading) {
    return (
      <div className="pb-10 min-h-screen">
        <DashboardHeader title="Revenue" description="Loading revenue details..." />
        <main className="p-4 md:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <DashboardStatSkeleton key={i} />
            ))}
          </div>

          {/* Second Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full ">
            {[1, 2].map((i) => (
              <DashboardStatSkeleton key={i} />
            ))}
          </div>

          {/* Monthly Revenue (Top Chart) */}
          <div className="w-full">
            <ChartSkeleton height="400px" />
          </div>

          {/* Bottom charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartSkeleton height="350px" />
            <ChartSkeleton height="350px" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Revenue"
        description="Here is the revenue details"
      />

      <main className="p-4 md:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsRow1.map((item, index) => (
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
          {statsRow2.map((item, index) => (
            <StatsCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconColor={item.iconColor}
              iconBgColor={item.iconBgColor}
              className="border-none shadow-[0px_0px_45px_0px_#6565652E] flex-1"
            />
          ))}
        </div>

        {/* Monthly Revenue (Top Chart) */}
        <div className="w-full">
          <RevenueChart
            data={monthlyData}
            title="Monthly Revenue"
            description="Monthly revenue overview"
            lineColor="#0190FE"
            dotColor="#0190FE"
            yAxisTicks={getSmartTicks(monthlyData)}
          />
        </div>

        {/* Bottom charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart
            data={weeklyData}
            title="Weekly Revenue"
            description="Weekly revenue overview"
            lineColor="#E53935"
            dotColor="#E53935"
            yAxisTicks={getSmartTicks(weeklyData)}
          />
          <RevenueChart
            data={dailyData}
            title="Daily Revenue"
            description="Daily revenue overview"
            lineColor="#4CAF50"
            dotColor="#4CAF50"
            yAxisTicks={getSmartTicks(dailyData)}
          />
        </div>
      </main>
    </div>
  );
}
