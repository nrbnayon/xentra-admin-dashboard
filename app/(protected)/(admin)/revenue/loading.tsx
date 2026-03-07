import DashboardHeader from "@/components/Shared/DashboardHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function RevenueLoading() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Revenue"
        description="Here is the revenue details"
      />

      <main className="p-4 md:p-6 lg:p-8 space-y-8">
        {/* Skeleton Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-32 rounded-xl bg-gray-100 shadow-[0px_0px_45px_0px_#6565652E]"
            />
          ))}
        </div>

        {/* Skeleton Second Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton
              key={i}
              className="h-32 rounded-xl bg-gray-100 shadow-[0px_0px_45px_0px_#6565652E]"
            />
          ))}
        </div>

        {/* Skeleton Chart */}
        <Skeleton className="h-[500px] w-full rounded-xl bg-gray-100 shadow-[0px_0px_45px_0px_#6565652E]" />

        {/* Skeleton Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-xl bg-gray-100 shadow-[0px_0px_45px_0px_#6565652E]" />
          <Skeleton className="h-[400px] rounded-xl bg-gray-100 shadow-[0px_0px_45px_0px_#6565652E]" />
        </div>
      </main>
    </div>
  );
}
