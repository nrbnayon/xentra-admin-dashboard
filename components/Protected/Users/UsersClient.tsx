"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DynamicTable } from "@/components/Shared/DynamicTable";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import PredictionModal from "./Modals/PredictionModal";
import WalletModal from "./Modals/WalletModal";
import TransactionHistoryModal from "./Modals/TransactionHistoryModal";
import AdjustBalanceModal from "./Modals/AdjustBalanceModal";
import { User } from "@/types/users";
import { UserX, UserCheck, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TranslatedText from "@/components/Shared/TranslatedText";
import {
  useGetUsersQuery,
  useToggleUserStatusMutation,
} from "@/redux/services/usersApi";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import { toast } from "sonner";

export default function UsersClient() {
  const { data: usersData, isLoading, refetch } = useGetUsersQuery();
  const [toggleUserStatus] = useToggleUserStatusMutation();

  const users = usersData?.data || [];

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<"active" | "suspended">(
    "suspended",
  );
  const [isAdjustBalanceModalOpen, setIsAdjustBalanceModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Modal States
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // Instead of passing data, we pass userId
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(
    null,
  );

  const handleToggleStatus = async () => {
    if (selectedUser) {
      try {
        const res = await toggleUserStatus(selectedUser.id).unwrap();
        toast.success(res.message || "User status updated successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update user status");
      }
      setIsStatusModalOpen(false);
    }
  };

  const handleAdjustBalance = (userId: string | number, newBalance: number) => {
    // API not provided yet
    toast.info("Balance adjustment feature will be available soon.");
  };

  const openStatusModal = (user: User, status: "active" | "suspended") => {
    setSelectedUser(user);
    setTargetStatus(status);
    setIsStatusModalOpen(true);
  };

  const openPredictionView = (user: User) => {
    setSelectedUserId(user.id);
    setIsPredictionModalOpen(true);
  };

  const openWalletView = (user: User) => {
    setSelectedUserId(user.id);
    setIsWalletModalOpen(true);
  };

  const openTransactionHistory = (user: User) => {
    setSelectedUserId(user.id);
    setIsTransactionModalOpen(true);
  };

  const columns = [
    {
      key: "full_name",
      header: <TranslatedText text="Name" />,
      sortable: true,
      className: "font-medium text-foreground",
    },
    {
      key: "phone",
      header: <TranslatedText text="Phone Number" />,
      sortable: true,
      className: "text-foreground font-medium",
    },
    {
      key: "balance",
      header: <TranslatedText text="Balance" />,
      render: (val: string | number) => `${val} HTG`,
      sortable: true,
      className: "text-foreground font-medium",
    },
    {
      key: "contest_joined",
      header: <TranslatedText text="Contest Joined" />,
      sortable: true,
      align: "center",
      className: "text-foreground font-medium",
    },
    {
      key: "total_win",
      header: <TranslatedText text="Total Win" />,
      sortable: true,
      align: "center",
      className: "text-foreground font-medium",
    },
    {
      key: "total_lose",
      header: <TranslatedText text="Total lose" />,
      sortable: true,
      align: "center",
      className: "text-foreground font-medium",
    },
    {
      key: "is_active",
      header: <TranslatedText text="Status" />,
      render: (is_active: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            is_active
              ? "bg-[#D1FADF] text-[#027A48]"
              : "bg-[#FEE2E2] text-[#B91C1C]"
          }`}
        >
          <TranslatedText text={is_active ? "Active" : "Suspended"} />
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = [
    {
      label: "Suspend",
      icon: (
        <UserX className="w-5 h-5 text-red-500 hover:text-red-700 transition" />
      ),
      onClick: (user: User) => openStatusModal(user, "suspended"),
      show: (user: User) => user.is_active === true,
    },
    {
      label: "Activate",
      icon: (
        <UserCheck className="w-5 h-5 text-green-500 hover:text-green-700 transition" />
      ),
      onClick: (user: User) => openStatusModal(user, "active"),
      show: (user: User) => user.is_active === false,
    },
    {
      label: "More",
      icon: (row: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-1 hover:bg-gray-100 rounded-full transition outline-none border-none cursor-pointer inline-flex items-center justify-center">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white text-gray-600 rounded-xl shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] overflow-hidden border-none absolute -right-6 p-5"
          >
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 cursor-pointer text-sm p-3 border-b border-[#2a4365]/50 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openPredictionView(row)}
            >
              <TranslatedText text="View Prediction" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 mt-2 cursor-pointer text-sm p-3 border-b border-[#2a4365]/50 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openWalletView(row)}
            >
              <TranslatedText text="View Wallet" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 mt-2 cursor-pointer text-sm p-3 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openTransactionHistory(row)}
            >
              <TranslatedText text="Transaction History" />
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 mt-2 cursor-pointer text-sm p-3 flex items-center justify-center outline-none focus:text-black rounded-b-xl"
              onClick={() => {
                setSelectedUser(row);
                setIsAdjustBalanceModalOpen(true);
              }}
            >
              <TranslatedText text="Adjust Balance" />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      onClick: () => {}, // Handled directly inside dropdown icons

    },
  ];

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="User Management"
        description="Here is the list of all the users details"
      />

      <main className="p-4 md:px-6 lg:px-8">
        {isLoading ? (
          <TableSkeleton rowCount={10} />
        ) : (
          <DynamicTable<User>
            data={users}
            config={{
              columns: columns as any,
              actions: actions,
              showActions: true,
              actionsLabel: "Action",
              actionsAlign: "center",
            }}
            filter={{
              enabled: true,
              searchKeys: ["full_name", "phone"],
            }}
            pagination={{ enabled: true, pageSize: 10 }}
            className="shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] border-none rounded-2xl overflow-hidden"
            headerClassName="bg-[#E6F4FF] text-foreground font-medium"
          />
        )}
      </main>

      <DeleteConfirmationModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleToggleStatus}
        title={targetStatus === "suspended" ? "Suspend User" : "Activate User"}
        description={
          targetStatus === "suspended"
            ? "Are you sure you want to suspend this user? This will restrict their access but preserve their history."
            : "Are you sure you want to activate this user? This will restore their access to the platform."
        }
        confirmText={targetStatus === "suspended" ? "Suspend" : "Activate"}
        variant={targetStatus === "suspended" ? "danger" : "success"}
        icon={
          targetStatus === "suspended" ? (
            <UserX size={24} />
          ) : (
            <UserCheck size={24} />
          )
        }
      />

      <PredictionModal
        isOpen={isPredictionModalOpen}
        onClose={() => setIsPredictionModalOpen(false)}
        userId={selectedUserId}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        userId={selectedUserId}
      />

      <TransactionHistoryModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        userId={selectedUserId}
      />

      <AdjustBalanceModal
        isOpen={isAdjustBalanceModalOpen}
        onClose={() => setIsAdjustBalanceModalOpen(false)}
        user={selectedUser}
        onSave={handleAdjustBalance}
      />
    </div>
  );
}
