"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import TranslatedText from "@/components/Shared/TranslatedText";
import { AppNotification } from "@/types/notifications";
import { TablePagination } from "@/components/Shared/TablePagination";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationDetailsModal from "./NotificationDetailsModal";
import { toast } from "sonner";
import { CircleHelp, X, Bell } from "lucide-react";
import { useGetNotificationsQuery } from "@/redux/services/notificationsApi";
import { useApproveWithdrawalMutation, useRejectWithdrawalMutation } from "@/redux/services/withdrawalsApi";

export default function NotificationsClient() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({
    page: currentPage,
  });

  const [selectedNotification, setSelectedNotification] = useState<AppNotification | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [approveWithdrawal] = useApproveWithdrawalMutation();
  const [rejectWithdrawal] = useRejectWithdrawalMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openDetails = (notification: AppNotification) => {
    setSelectedNotification(notification);
    setIsDetailsOpen(true);
  };

  const openReject = (notification: AppNotification) => {
    setSelectedNotification(notification);
    setIsRejectModalOpen(true);
  };

  const handleAccept = async () => {
    if (!selectedNotification || !selectedNotification.reference_id) return;
    
    setIsActionLoading(true);
    try {
      await approveWithdrawal(selectedNotification.reference_id).unwrap();
      toast.success(<TranslatedText text="Withdrawal approved successfully" />);
      refetch(); // refresh notifications just in case there's server-side logic changing status
      setIsDetailsOpen(false);
    } catch (err: any) {
      const msg = err?.data?.detail || "Failed to approve withdrawal";
      toast.error(<TranslatedText text={msg} />);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedNotification || !selectedNotification.reference_id) return;
    
    setIsActionLoading(true);
    try {
      await rejectWithdrawal(selectedNotification.reference_id).unwrap();
      toast.success(<TranslatedText text="Withdrawal rejected successfully" />);
      refetch();
      setIsRejectModalOpen(false);
    } catch (err: any) {
      const msg = err?.data?.detail || "Failed to reject withdrawal";
      toast.error(<TranslatedText text={msg} />);
    } finally {
      setIsActionLoading(false);
    }
  };

  const notifications = data?.data || [];
  const totalPages = data?.total_pages || 1;
  const totalItems = data?.total_records || 0;
  const itemsPerPage = data?.page_size || 10;

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Notifications"
        description="Get all your notification from here"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
          <button
          aria-label="all"
            className={`px-10 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "All"
                ? "border-primary text-primary"
                : "border-transparent text-secondary hover:text-foreground"
            }`}
            onClick={() => setActiveTab("All")}
          >
            <TranslatedText text="All" />
          </button>
        </div>

        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
             <p className="text-red-500 font-medium">
               <TranslatedText text="Failed to load notifications." />
             </p>
             <button onClick={() => refetch()} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-[#1e4080] transition" aria-label="Retry Loading Notifications">
               <TranslatedText text="Retry" />
             </button>
          </div>
        )}

        {isLoading && !isError && (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className="h-32 w-full rounded-2xl bg-gray-100/50"
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && notifications.length === 0 && (
          <div className="flex flex-col justify-center items-center py-20 text-center">
            <Bell className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-lg"><TranslatedText text="No notifications found" /></p>
          </div>
        )}

        {/* Notifications List */}
        {!isLoading && !isError && notifications.length > 0 && (
          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-6 shadow-[0px_0px_25px_0px_#6565651A] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-hover hover:shadow-[0px_0px_35px_0px_#65656526] ${!notification.is_read ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                      <TranslatedText text={notification.title} />
                      {!notification.is_read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                      )}
                    </h4>
                    
                    <p className="text-secondary text-sm line-clamp-2 md:max-w-xl">
                      <TranslatedText text={notification.message} />
                    </p>

                    <div className="flex gap-4 pt-2">
                       <button
                         onClick={() => openDetails(notification)}
                         className="px-6 py-2 bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg text-sm font-bold text-[#344054] hover:bg-gray-100 transition-colors cursor-pointer"
                         aria-label="View Notification Details"
                       >
                         <TranslatedText text="View" />
                       </button>

                       {notification.type === "WITHDRAWAL_REQUEST" && (
                         <button
                           onClick={() => openReject(notification)}
                           aria-label="Reject Notification"
                           className="px-6 py-2 text-sm font-bold text-[#D92D20] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                         >
                           <TranslatedText text="Reject" />
                         </button>
                       )}
                    </div>
                  </div>
                </div>

                <div className="text-[#667085] text-sm text-right shrink-0">
                  {new Date(notification.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Container */}
        {!isLoading && !isError && notifications.length > 0 && (
          <div className="mt-12 w-full">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              className="bg-transparent border-none px-0"
            />
          </div>
        )}
      </main>

      {/* Details Modal */}
      <NotificationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        notification={selectedNotification}
        onAccept={handleAccept}
        isLoadingAction={isActionLoading}
      />

      {/* Reject Confirmation Modal - Dynamic version matching Image 3 */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isRejectModalOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={isActionLoading ? undefined : () => setIsRejectModalOpen(false)}
        />
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300">
          <button
            onClick={isActionLoading ? undefined : () => setIsRejectModalOpen(false)}
            disabled={isActionLoading}
            className="absolute right-4 top-4 text-secondary hover:text-red-500 transition-all p-2 rounded-full cursor-pointer disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-3 bg-blue-50/50 rounded-full border border-gray-100">
              <CircleHelp className="w-10 h-10 text-[#0B3154]" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              <TranslatedText text="Are you sure you want to reject?" />
            </h3>
            <div className="flex gap-4 w-full pt-4">
              <button
                onClick={isActionLoading ? undefined : () => setIsRejectModalOpen(false)}
                disabled={isActionLoading}
                aria-label="Cancel"
                className="flex-1 py-4 border border-gray-200 rounded-full font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
              >
                <TranslatedText text="Cancel" />
              </button>
              <button
                onClick={handleReject}
                disabled={isActionLoading}
                className="flex flex-1 justify-center py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 cursor-pointer disabled:opacity-50"
              >
               {isActionLoading ? (
                  <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
               ) : (
                  <TranslatedText text="Reject" />
               )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
