import DashboardHeader from "@/components/Shared/DashboardHeader";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";

export default function UsersLoading() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="User Management"
        description="Here is the list of all the users details"
      />

      <main className="p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_3px_0px_#0A0D121A] w-full p-6 mt-6">
          <div className="mb-6 flex">
            <div className="w-full max-w-sm h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          <TableSkeleton rowCount={10} />
        </div>
      </main>
    </div>
  );
}
