"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DynamicTable } from "@/components/Shared/DynamicTable";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import { ConfirmationModal } from "@/components/Shared/ConfirmationModal";
import { MoreVertical } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  useGetWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useRejectWithdrawalMutation,
} from "@/redux/services/withdrawalsApi";
import type {
  Withdrawal,
  WithdrawalStatus,
  WithdrawalStatusFilter,
  GetWithdrawalsParams,
} from "@/types/withdrawals";

// ── Tab definitions ────────────────────────────────────────────────────────────
const TABS: WithdrawalStatusFilter[] = ["All", "Pending", "Completed", "Rejected"];

// Map our tab label to API query params
function tabToParams(tab: WithdrawalStatusFilter): GetWithdrawalsParams {
  if (tab === "All") return {};
  return { status: tab as WithdrawalStatus };
}

// ── Status badge styling ───────────────────────────────────────────────────────
function statusBadge(status: WithdrawalStatus) {
  const colorMap: Record<WithdrawalStatus, string> = {
    Completed: "bg-[#D1FADF] text-[#027A48]",
    Pending: "bg-[#FEF0C7] text-[#B54708]",
    Rejected: "bg-[#FEE2E2] text-[#B91C1C]",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status] ?? "bg-gray-100 text-gray-500"}`}
    >
      <TranslatedText text={status} />
    </span>
  );
}

// ── Format amount (strip negative sign, add HTG) ──────────────────────────────
function formatAmount(amount: string) {
  const num = parseFloat(amount);
  return `${Math.abs(num).toFixed(2)} HTG`;
}

// ── Format date ───────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

// ── Extract payment method from reference string ──────────────────────────────
// reference format: "Natcash - 01725039612" or "Moncash - 01725039612"
function parseReference(reference: string) {
  const parts = reference.split(" - ");
  return {
    method: parts[0]?.trim() ?? "—",
    number: parts[1]?.trim() ?? "—",
  };
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WithdrawalsClient() {
  const [activeTab, setActiveTab] = useState<WithdrawalStatusFilter>("All");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // State for rejecting confirmation
  const [rejectModal, setRejectModal] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  // Fetch withdrawals — separate cache per tab
  const { data, isLoading, isError, refetch } = useGetWithdrawalsQuery(
    tabToParams(activeTab)
  );

  const [approveWithdrawal] = useApproveWithdrawalMutation();
  const [rejectWithdrawal] = useRejectWithdrawalMutation();

  // ── Action handlers ──────────────────────────────────────────────────────────
  const handleApprove = async (id: number) => {
    setLoadingId(id);
    try {
      await approveWithdrawal(id).unwrap();
      toast.success(<TranslatedText text="Withdrawal approved successfully" />);
    } catch (err: any) {
      const msg = err?.data?.detail || "Failed to approve withdrawal";
      toast.error(<TranslatedText text={msg} />);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectClick = (id: number) => {
    setRejectModal({ isOpen: true, id });
  };

  const handleRejectConfirm = async () => {
    if (!rejectModal.id) return;
    const id = rejectModal.id;
    setLoadingId(id);
    setRejectModal({ isOpen: false, id: null });

    try {
      await rejectWithdrawal(id).unwrap();
      toast.success(<TranslatedText text="Withdrawal rejected successfully" />);
    } catch (err: any) {
      const msg = err?.data?.detail || "Failed to reject withdrawal";
      toast.error(<TranslatedText text={msg} />);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Table columns ────────────────────────────────────────────────────────────
  const columns = [
    {
      key: "user",
      header: <TranslatedText text="Name" />,
      sortable: true,
      className: "font-medium text-gray-900 dark:text-white",
      render: (_: any, row: Withdrawal) => row.user.full_name,
    },
    {
      key: "user_phone",
      header: <TranslatedText text="Phone" />,
      className: "text-gray-600 dark:text-gray-400",
      render: (_: any, row: Withdrawal) => row.user.phone,
    },
    {
      key: "reference",
      header: <TranslatedText text="Payment Method" />,
      className: "text-gray-600 dark:text-gray-400",
      render: (val: string) => {
        const { method, number } = parseReference(val);
        return (
          <span className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">{method}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{number}</span>
          </span>
        );
      },
    },
    {
      key: "amount",
      header: <TranslatedText text="Amount" />,
      sortable: true,
      className: "text-gray-600 dark:text-gray-400 font-medium",
      render: (val: string) => formatAmount(val),
    },
    {
      key: "created_at",
      header: <TranslatedText text="Date" />,
      sortable: true,
      className: "text-gray-600 dark:text-gray-400",
      render: (val: string) => formatDate(val),
    },
    {
      key: "status",
      header: <TranslatedText text="Status" />,
      sortable: true,
      render: (status: WithdrawalStatus) => statusBadge(status),
    },
    {
      key: "action",
      header: <TranslatedText text="Action" />,
      align: "center" as const,
      render: (_: any, row: Withdrawal) => {
        const isThisLoading = loadingId === row.id;
        const isPending = row.status === "Pending";

        if (!isPending) {
          return (
            <span className="text-gray-400 font-medium">—</span>
          );
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                disabled={isThisLoading}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition outline-none border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isThisLoading ? (
                  <svg
                    className="w-5 h-5 animate-spin text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-2 space-y-2"
            >
              <DropdownMenuItem
                className="flex items-center justify-center py-2 px-4 rounded-full bg-[#D92D20] text-white hover:bg-[#B42318] cursor-pointer text-sm font-medium focus:bg-[#B42318] focus:text-white outline-none"
                onClick={() => handleRejectClick(row.id)}
              >
                <TranslatedText text="Reject" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-center py-2 px-4 rounded-full bg-[#12B76A] text-white hover:bg-[#0E9355] cursor-pointer text-sm font-medium focus:bg-[#0E9355] focus:text-white outline-none"
                onClick={() => handleApprove(row.id)}
              >
                <TranslatedText text="Approve" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Withdrawal Management"
        description="Here is the list of all the withdrawals details"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-label={`Switch to ${tab} tab`}
              className={`px-8 py-3 font-medium border-b-2 transition-colors cursor-pointer min-w-30 ${
                activeTab === tab
                  ? "border-[#1a365d] text-[#1a365d] dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-[#1C5898] hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <TranslatedText text={tab} />
            </button>
          ))}
        </div>

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-red-500 font-medium">
              <TranslatedText text="Failed to load withdrawals." />
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 text-sm bg-[#1a365d] text-white rounded-lg hover:bg-[#1e4080] transition"
              aria-label="Retry"
            >
              <TranslatedText text="Retry" />
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && !isError && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_3px_0px_#0A0D121A] w-full p-6">
            <TableSkeleton rowCount={10} />
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <DynamicTable<Withdrawal>
            data={data?.data ?? []}
            config={{
              columns: columns as any,
              showActions: false,
            }}
            pagination={{ enabled: true, pageSize: 10 }}
            className="shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] border-none rounded-2xl overflow-hidden"
            headerClassName="bg-[#E5F3FC] dark:bg-gray-700 text-[#475467] dark:text-gray-200 font-medium"
          />
        )}
      </main>

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, id: null })}
        onConfirm={handleRejectConfirm}
        title="Reject Withdrawal"
        message="Are you sure you want to reject this withdrawal request? This action cannot be undone."
        confirmText="Confirm Rejection"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loadingId === rejectModal.id}
      />
    </div>
  );
}
