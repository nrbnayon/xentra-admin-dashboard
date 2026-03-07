"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DynamicTable } from "@/components/Shared/DynamicTable";
import { withdrawalsData } from "@/data/withdrawalsData";
import { Withdrawal, WithdrawalStatus } from "@/types/withdrawals";
import { MoreVertical } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type TabType = "All" | WithdrawalStatus;

export default function WithdrawalsClient() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(withdrawalsData);
  const [activeTab, setActiveTab] = useState<TabType>("All");

  const handleStatusChange = (id: string, newStatus: WithdrawalStatus) => {
    setWithdrawals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
    toast.success(`Withdrawal ${newStatus.toLowerCase()} successfully`);
  };

  const filteredData = withdrawals.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      className: "font-medium text-gray-900 dark:text-white",
    },
    {
      key: "moncashNumber",
      header: "Moncash Number",
      render: (val: string) => val || "—",
      className: "text-gray-600 dark:text-gray-400",
    },
    {
      key: "natcashNumber",
      header: "Natcash Number",
      render: (val: string) => val || "—",
      className: "text-gray-600 dark:text-gray-400",
    },
    {
      key: "amount",
      header: "Amount",
      render: (val: number) => `${val} HTG`,
      sortable: true,
      className: "text-gray-600 dark:text-gray-400",
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      className: "text-gray-600 dark:text-gray-400",
    },
    {
      key: "status",
      header: "Status",
      render: (status: WithdrawalStatus) => {
        let colors = "";
        switch (status) {
          case "Approved":
            colors = "bg-[#D1FADF] text-[#027A48]";
            break;
          case "Pending":
            colors = "bg-[#FEF0C7] text-[#B54708]";
            break;
          case "Rejected":
            colors = "bg-[#FEE2E2] text-[#B91C1C]";
            break;
        }
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors}`}
          >
            {status}
          </span>
        );
      },
      sortable: true,
    },
  ];

  const actions = [
    {
      label: "More",
      icon: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition outline-none border-none cursor-pointer">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-2 space-y-1"
          >
            <DropdownMenuItem
              className="flex items-center justify-center py-2 px-3 rounded-lg bg-[#D92D20] text-white hover:bg-[#B42318] cursor-pointer text-sm font-medium focus:bg-[#B42318] focus:text-white outline-none"
              onClick={(e) => {
                // The actual item is passed via row in the DynamicTable action handler,
                // but since I'm using a custom trigger, I need to handle it carefully.
                // However, DynamicTable maps actions to rows.
              }}
            >
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-center py-2 px-3 rounded-lg bg-[#32D583] text-white hover:bg-[#12B76A] cursor-pointer text-sm font-medium focus:bg-[#12B76A] focus:text-white outline-none"
              onClick={() => {}}
            >
              Approve
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      // Overriding the default action logic to use the dropdown content correctly
      onClick: (row: Withdrawal) => {
        // This is called when the icon itself is clicked if it wasn't a DropdownTrigger
      },
    },
  ];

  // Since DynamicTable might not support custom components in 'icon' correctly for triggers,
  // I'll adjust the columns to include a custom Action column if standard actions don't suffice.
  // Actually, I'll use a custom render for the Action column to match the exact design.

  const columnsWithAction = [
    ...columns,
    {
      key: "action",
      header: "Action",
      align: "center" as const,
      render: (_: any, row: Withdrawal) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition outline-none border-none cursor-pointer">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-2 space-y-2"
          >
            <DropdownMenuItem
              className="flex items-center justify-center py-2 px-4 rounded-full bg-[#D92D20] text-white hover:bg-[#B42318] cursor-pointer text-sm font-medium focus:bg-[#B42318] focus:text-white outline-none"
              onClick={() => handleStatusChange(row.id, "Rejected")}
            >
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-center py-2 px-4 rounded-full bg-[#12B76A] text-white hover:bg-[#0E9355] cursor-pointer text-sm font-medium focus:bg-[#0E9355] focus:text-white outline-none"
              onClick={() => handleStatusChange(row.id, "Approved")}
            >
              Approve
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Withdrawal Management"
        description="Here is the list of all the withdrawals details"
      />

      <main className="p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
          {["All", "Approved", "Pending", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`px-8 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer min-w-[120px] ${
                activeTab === tab
                  ? "border-[#1a365d] text-[#1a365d] dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-[#1C5898] hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <TranslatedText text={tab} />
            </button>
          ))}
        </div>

        <DynamicTable<Withdrawal>
          data={filteredData}
          config={{
            columns: columnsWithAction as any,
            showActions: false, // Using custom column instead
          }}
          pagination={{ enabled: true, pageSize: 10 }}
          className="shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] border-none rounded-2xl overflow-hidden"
          headerClassName="bg-[#E5F3FC] dark:bg-gray-700 text-[#475467] dark:text-gray-200 font-medium"
        />
      </main>
    </div>
  );
}
