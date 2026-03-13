"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import TranslatedText from "@/components/Shared/TranslatedText";
import { notificationsData } from "@/data/notificationsData";
import { AppNotification } from "@/types/notifications";
import Image from "next/image";
import { Pagination } from "@/components/Shared/Pagination";
import NotificationDetailsModal from "./NotificationDetailsModal";
import { ConfirmationModal } from "@/components/Shared/ConfirmationModal";
import { toast } from "sonner";
import { CircleHelp } from "lucide-react";

export default function NotificationsClient() {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(notificationsData);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedNotification, setSelectedNotification] =
    useState<AppNotification | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

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

  const handleAccept = () => {
    toast.success("Notification request accepted successfully");
    setIsDetailsOpen(false);
  };

  const handleReject = () => {
    if (selectedNotification) {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== selectedNotification.id),
      );
      toast.success("Notification request rejected successfully");
      setIsRejectModalOpen(false);
    }
  };

  // Calculate dynamic pagination values
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="pb-10 min-h-screen ">
      <DashboardHeader
        title="Notifications"
        description="Get all your notification from here"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
          <button
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

        {/* Notifications List */}
        <div className="space-y-6">
          {currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-2xl p-6 shadow-[0px_0px_25px_0px_#6565651A] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-hover hover:shadow-[0px_0px_35px_0px_#65656526]"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={notification.user?.image || "/images/user.webp"}
                    alt="Admin"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-primary">
                    <TranslatedText text={notification.title} />
                  </h4>
                  <p className="text-secondary text-sm">
                    {notification.user?.name}{" "}
                    <TranslatedText text="want to withdraw" />
                  </p>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => openDetails(notification)}
                      className="px-6 py-2 bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg text-sm font-bold text-[#344054] hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <TranslatedText text="View" />
                    </button>
                    <button
                      onClick={() => openReject(notification)}
                      className="px-6 py-2 text-sm font-bold text-[#D92D20] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <TranslatedText text="Reject" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[#667085] text-sm text-right">
                {notification.timestamp}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Container */}
        <div className="mt-12 flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={notifications.length}
            itemsPerPage={itemsPerPage}
            currentItemsCount={currentNotifications.length}
          />
        </div>
      </main>

      {/* Details Modal */}
      <NotificationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        notification={selectedNotification}
        onAccept={handleAccept}
      />

      {/* Reject Confirmation Modal - Dynamic version matching Image 3 */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isRejectModalOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsRejectModalOpen(false)}
        />
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300">
          <button
            onClick={() => setIsRejectModalOpen(false)}
            className="absolute right-4 top-4 text-secondary hover:text-red-500 transition-all p-2 rounded-full cursor-pointer"
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
                onClick={() => setIsRejectModalOpen(false)}
                className="flex-1 py-4 border border-gray-200 rounded-full font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer"
              >
                <TranslatedText text="Cancel" />
              </button>
              <button
                onClick={handleReject}
                className="flex-1 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 cursor-pointer"
              >
                <TranslatedText text="Reject" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline icons for reuse if needed, but imported Lucide instead
const X = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
