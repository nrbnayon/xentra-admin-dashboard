"use client";

import { X } from "lucide-react";
import { AppNotification } from "@/types/notifications";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetWithdrawalModalQuery } from "@/redux/services/withdrawalsApi";

interface NotificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: AppNotification | null;
  onAccept: () => void;
  isLoadingAction?: boolean;
}

export default function NotificationDetailsModal({
  isOpen,
  onClose,
  notification,
  onAccept,
  isLoadingAction = false,
}: NotificationDetailsModalProps) {
  // Query fires only when isOpen is true and we have a reference_id
  const skip = !isOpen || !notification || !notification.reference_id || notification.type !== "WITHDRAWAL_REQUEST";

  const { data: withdrawalData, isLoading: isFetching } = useGetWithdrawalModalQuery(
    notification?.reference_id ?? 0,
    { skip }
  );

  if (!isOpen || !notification) return null;

  // Strip negative sign from amount
  const formatAmount = (amount?: string) => {
    if (!amount) return "—";
    return `${Math.abs(parseFloat(amount)).toFixed(2)} HTG`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={isLoadingAction ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in fade-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">
            <TranslatedText text={notification.type === "WITHDRAWAL_REQUEST" ? "Withdrawal Request" : "Notification Details"} />
          </h2>
          <button
            onClick={isLoadingAction ? undefined : onClose}
            disabled={isLoadingAction}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {notification.type !== "WITHDRAWAL_REQUEST" ? (
            <div className="space-y-4">
               <h3 className="font-bold text-lg text-primary"><TranslatedText text={notification.title} /></h3>
               <p className="text-secondary leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <TranslatedText text={notification.message} />
               </p>
                 <div className="text-sm text-gray-500 italic mt-4">
                   <TranslatedText text="Date: " /> 
                   {new Date(notification.created_at).toLocaleString()}
                 </div>
            </div>
          ) : isFetching ? (
            <div className="flex justify-center items-center py-12">
               <svg className="w-8 h-8 animate-spin text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary block">
                  <TranslatedText text="User Name" />
                </label>
                <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
                  {withdrawalData?.user_name || "—"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary block">
                  <TranslatedText text="Payment Method" />
                </label>
                <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
                  {withdrawalData?.method || "—"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary block">
                  <TranslatedText text="Account/Phone Number" />
                </label>
                <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
                  {withdrawalData?.phone_number || "—"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary block">
                  <TranslatedText text="Withdrawal Amount" />
                </label>
                <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic font-medium">
                  {formatAmount(withdrawalData?.amount)}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-8 pt-0 flex gap-4">
          <button
            onClick={isLoadingAction ? undefined : onClose}
            disabled={isLoadingAction}
            className="flex-1 py-4 px-6 border border-gray-200 rounded-full font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
          >
            <TranslatedText text="Cancel" />
          </button>
          
          {notification.type === "WITHDRAWAL_REQUEST" && (
            <button
              onClick={onAccept}
              disabled={isLoadingAction || isFetching || !withdrawalData}
              className="flex-1 py-4 px-6 bg-[#0B3154] text-white rounded-full font-bold hover:bg-[#08223a] transition-all cursor-pointer flex justify-center items-center disabled:opacity-50"
            >
              {isLoadingAction ? (
                <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
              ) : (
                <TranslatedText text="Accept" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
