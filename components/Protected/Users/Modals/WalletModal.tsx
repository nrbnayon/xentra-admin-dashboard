import { X } from "lucide-react";
import { Wallet } from "@/types/users";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
}

export default function WalletModal({
  isOpen,
  onClose,
  wallet,
}: WalletModalProps) {
  if (!isOpen || !wallet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 pb-4 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Wallet
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-0 space-y-4 w-full">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
              Total Balance
            </label>
            <input
              type="text"
              disabled
              value={`${wallet.totalBalance.toLocaleString()} HTG`}
              className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Total Deposit
              </label>
              <input
                type="text"
                disabled
                value={`${wallet.totalDeposit.toLocaleString()} HTG`}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Total Withdrawal
              </label>
              <input
                type="text"
                disabled
                value={`${wallet.totalWithdrawal.toLocaleString()} HTG`}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Total Winning
              </label>
              <input
                type="text"
                disabled
                value={`${wallet.totalWinning.toLocaleString()} HTG`}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Total Deduction
              </label>
              <input
                type="text"
                disabled
                value={`${wallet.totalDeduction.toLocaleString()} HTG`}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>

          <div className="pb-2"></div>
        </div>
      </div>
    </div>
  );
}
