import { X, Loader2 } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetUserWalletQuery } from "@/redux/services/usersApi";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number | null;
}

export default function WalletModal({
  isOpen,
  onClose,
  userId,
}: WalletModalProps) {
  const { data: wallet, isLoading, isError } = useGetUserWalletQuery(userId!, {
    skip: !isOpen || !userId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 pb-4 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <TranslatedText text="Wallet" />
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-0 space-y-4 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : isError || !wallet ? (
            <div className="text-center py-10 text-gray-500">
              <TranslatedText text="Failed to load wallet data." />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                  <TranslatedText text="Total Balance" />
                </label>
                <input
                  type="text"
                  disabled
                  value={`${wallet.total_balance || 0} HTG`}
                  className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    <TranslatedText text="Total Deposit" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${wallet.total_deposit || 0} HTG`}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    <TranslatedText text="Total Withdrawal" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${wallet.total_withdrawal || 0} HTG`}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    <TranslatedText text="Total Winning" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${wallet.total_winning || 0} HTG`}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    <TranslatedText text="Total Deduction" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${wallet.total_deduction || 0} HTG`}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pb-2"></div>
        </div>
      </div>
    </div>
  );
}
