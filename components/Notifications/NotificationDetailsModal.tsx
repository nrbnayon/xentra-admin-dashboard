"use client";

import { X } from "lucide-react";
import { AppNotification } from "@/types/notifications";
import TranslatedText from "@/components/Shared/TranslatedText";

interface NotificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: AppNotification | null;
  onAccept: () => void;
}

export default function NotificationDetailsModal({
  isOpen,
  onClose,
  notification,
  onAccept,
}: NotificationDetailsModalProps) {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in fade-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">
            <TranslatedText text="Withdrawal Request" />
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-secondary block">
              <TranslatedText text="User Name" />
            </label>
            <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
              Football
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-secondary block">
              <TranslatedText text="Moncash Number" />
            </label>
            <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
              {notification.user?.moncashNumber || "—"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-secondary block">
              <TranslatedText text="Natcash Number" />
            </label>
            <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
              {notification.user?.natcashNumber || "—"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-secondary block">
              <TranslatedText text="Withdrawal Amount" />
            </label>
            <div className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-secondary italic">
              {notification.details?.amount || "—"}
            </div>
          </div>
        </div>

        <div className="p-8 pt-0 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 border border-gray-200 rounded-full font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer"
          >
            <TranslatedText text="Cancel" />
          </button>
          <button
            onClick={onAccept}
            className="flex-1 py-4 px-6 bg-[#0B3154] text-white rounded-full font-bold hover:bg-[#08223a] transition-all cursor-pointer"
          >
            <TranslatedText text="Accept" />
          </button>
        </div>
      </div>
    </div>
  );
}
