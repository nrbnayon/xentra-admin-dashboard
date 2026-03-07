import DashboardHeader from "@/components/Shared/DashboardHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsLoading() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Notifications"
        description="Get all your notification from here"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Skeleton Tabs */}
        <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
          <Skeleton className="w-24 h-10 mb-2" />
        </div>

        {/* Skeleton Notifications List */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="h-32 w-full rounded-2xl bg-gray-100/50"
            />
          ))}
        </div>

        {/* Skeleton Pagination */}
        <div className="mt-12 flex justify-center w-full">
          <Skeleton className="h-12 w-full max-w-lg rounded-lg" />
        </div>
      </main>
    </div>
  );
}
