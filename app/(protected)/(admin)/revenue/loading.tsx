import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DashboardStatSkeleton, ChartSkeleton } from "@/components/Skeleton/DashboardSkeleton";

export default function RevenueLoading() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Revenue"
        description="Loading revenue details..."
      />

      <main className="p-4 md:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
        {/* Skeleton Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <DashboardStatSkeleton key={i} />
          ))}
        </div>

        {/* Skeleton Second Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full ">
          {[1, 2].map((i) => (
            <DashboardStatSkeleton key={i} />
          ))}
        </div>

        {/* Skeleton Chart */}
        <div className="w-full">
          <ChartSkeleton height="400px" />
        </div>

        {/* Skeleton Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartSkeleton height="350px" />
          <ChartSkeleton height="350px" />
        </div>
      </main>
    </div>
  );
}
