import DashboardHeader from "@/components/Shared/DashboardHeader";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import TranslatedText from "@/components/Shared/TranslatedText";

export default function WithdrawalsLoading() {
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Withdrawal Management"
        description="Here is the list of all the withdrawals details"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Skeleton Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
          {["All", "Approved", "Pending", "Rejected"].map((tab) => (
            <div
              key={tab}
              className="px-8 py-3 text-sm font-medium border-b-2 border-transparent text-gray-400 min-w-[120px]"
            >
              <TranslatedText text={tab} />
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_3px_0px_#0A0D121A] w-full p-6">
          <TableSkeleton rowCount={10} />
        </div>
      </main>
    </div>
  );
}
