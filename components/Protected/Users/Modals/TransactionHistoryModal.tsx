import { X, Loader2 } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetUserTransactionsQuery } from "@/redux/services/usersApi";

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number | null;
}

export default function TransactionHistoryModal({
  isOpen,
  onClose,
  userId,
}: TransactionHistoryModalProps) {
  const { data: transactions, isLoading, isError } = useGetUserTransactionsQuery(userId!, {
    skip: !isOpen || !userId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-transparent shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <TranslatedText text="Transaction History" />
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-0 overflow-y-auto w-full no-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center py-10 text-gray-500">
              <TranslatedText text="Failed to load transactions." />
            </div>
          ) : (
            <div className="w-full rounded-xl overflow-hidden overflow-x-auto border-none">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-[#E5F3FC] dark:bg-[#1f2937] text-gray-600 dark:text-gray-200">
                  <tr>
                    <th className="p-4 font-normal py-3 rounded-l-md">
                      <TranslatedText text="Date" />
                    </th>
                    <th className="p-4 font-normal py-3">
                      <TranslatedText text="Type" />
                    </th>
                    <th className="p-4 font-normal py-3">
                      <TranslatedText text="Amount" />
                    </th>
                    <th className="p-4 font-normal py-3 rounded-r-md">
                      <TranslatedText text="Match" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  <tr className="h-2"></tr> {/* Spacer after header */}
                  {transactions?.map((t, idx) => (
                    <tr
                      key={idx}
                      className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-3">{new Date(t.date).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <TranslatedText text={t.type} />
                      </td>
                      <td className="px-4 py-3">{t.amount} HTG</td>
                      <td className="px-4 py-3">
                        {t.match_name ? <TranslatedText text={t.match_name} /> : "-"}
                      </td>
                    </tr>
                  ))}
                  {(!transactions || transactions.length === 0) && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        <TranslatedText text="No transactions found." />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="pb-8"></div>
        </div>
      </div>
    </div>
  );
}
