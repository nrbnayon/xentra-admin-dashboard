"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStatSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0px_0px_45px_0px_#6565652E] flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <Skeleton className="w-12 h-12 rounded-xl bg-gray-100" />
        <Skeleton className="w-20 h-4 bg-gray-100" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-24 h-8 bg-gray-200" />
        <Skeleton className="w-32 h-4 bg-gray-100" />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = "300px" }: { height?: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-[0px_0px_45px_0px_#6565652E] w-full">
      <div className="space-y-4">
        <Skeleton className="w-48 h-8 bg-gray-200" />
        <Skeleton className="w-64 h-4 bg-gray-100" />
        <Skeleton style={{ height }} className="w-full bg-gray-50 rounded-xl" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Row Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <DashboardStatSkeleton key={i} />
        ))}
      </div>

      {/* Bottom Row Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <DashboardStatSkeleton key={i} />
        ))}
      </div>

      {/* Chart Skeleton */}
      <ChartSkeleton height="300px" />
    </div>
  );
}
