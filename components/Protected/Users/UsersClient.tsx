"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DynamicTable } from "@/components/Shared/DynamicTable";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import PredictionModal from "./Modals/PredictionModal";
import WalletModal from "./Modals/WalletModal";
import TransactionHistoryModal from "./Modals/TransactionHistoryModal";
import {
  usersData,
  dummyTransactions,
  dummyPrediction,
  dummyWallet,
} from "@/data/usersData";
import { User, Transaction, Prediction, Wallet } from "@/types/users";
import { Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TranslatedText from "@/components/Shared/TranslatedText";

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Modal States
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [predictionData, setPredictionData] = useState<Prediction | null>(null);
  const [walletData, setWalletData] = useState<Wallet | null>(null);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const openPredictionView = (user: User) => {
    // In real app, fetch user prediction
    setPredictionData(dummyPrediction);
    setIsPredictionModalOpen(true);
  };

  const openWalletView = (user: User) => {
    // In a real app, fetch user wallet data
    setWalletData(dummyWallet);
    setIsWalletModalOpen(true);
  };

  const openTransactionHistory = (user: User) => {
    setTransactionData(dummyTransactions);
    setIsTransactionModalOpen(true);
  };

  const columns = [
    {
      key: "name",
      header: <TranslatedText text="Name" />,
      sortable: true,
      className: "font-medium text-foreground",
    },
    {
      key: "phone_number",
      header: <TranslatedText text="Phone Number" />,
      sortable: true,
      className: "text-foreground font-medium",
    },
    {
      key: "balance",
      header: <TranslatedText text="Balance" />,
      render: (val: number) => `${val} HTG`,
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
      key: "status",
      header: <TranslatedText text="Status" />,
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "active"
              ? "bg-[#D1FADF] text-[#027A48]"
              : "bg-[#FEE2E2] text-[#B91C1C]"
          }`}
        >
          <TranslatedText
            text={status.charAt(0).toUpperCase() + status.slice(1)}
          />
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = [
    {
      label: "Delete",
      icon: (
        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700 transition" />
      ),
      onClick: (user: User) => openDeleteModal(user),
    },
    {
      label: "More",
      icon: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition outline-none border-none cursor-pointer">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white text-gray-600 rounded-xl shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] overflow-hidden border-none absolute -right-6 p-5"
          >
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 cursor-pointer text-sm p-3 border-b border-[#2a4365]/50 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openPredictionView(selectedUser as User)}
            >
              <TranslatedText text="View Prediction" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 mt-2 cursor-pointer text-sm p-3 border-b border-[#2a4365]/50 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openWalletView(selectedUser as User)}
            >
              <TranslatedText text="View Wallet" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white bg-primary hover:bg-primary/80 mt-2 cursor-pointer text-sm p-3 flex items-center justify-center outline-none focus:text-black"
              onClick={() => openTransactionHistory(selectedUser as User)}
            >
              <TranslatedText text="Transaction History" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      onClick: (user: User) => setSelectedUser(user), // just prime the state for dropdown menu actions if needed
    },
  ];

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="User Management"
        description="Here is the list of all the users details"
      />

      <main className="p-4 md:px-6 lg:px-8">
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
            searchKeys: ["name", "phone_number"],
          }}
          pagination={{ enabled: true, pageSize: 10 }}
          className="shadow-[0px_0px_35px_0px_rgba(0,0,0,0.05)] border-none rounded-2xl overflow-hidden"
          headerClassName="bg-[#E6F4FF] text-foreground font-medium"
        />
      </main>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      <PredictionModal
        isOpen={isPredictionModalOpen}
        onClose={() => setIsPredictionModalOpen(false)}
        prediction={predictionData}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={walletData}
      />

      <TransactionHistoryModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transactions={transactionData}
      />
    </div>
  );
}
