import { X } from "lucide-react";
import { Transaction } from "@/types/users";

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export default function TransactionHistoryModal({
  isOpen,
  onClose,
  transactions,
}: TransactionHistoryModalProps) {
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
            Transaction History
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-0 overflow-y-auto w-full no-scrollbar">
          <div className="w-full rounded-xl overflow-hidden overflow-x-auto border-none">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-[#E5F3FC] dark:bg-[#1f2937] text-gray-600 dark:text-gray-200">
                <tr>
                  <th className="p-4 font-normal py-3 rounded-l-md">Date</th>
                  <th className="p-4 font-normal py-3">Type</th>
                  <th className="p-4 font-normal py-3">Amount</th>
                  <th className="p-4 font-normal py-3 rounded-r-md">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                <tr className="h-2"></tr> {/* Spacer after header */}
                {transactions.map((t, idx) => (
                  <tr
                    key={idx}
                    className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    <td className="px-4 py-3">{t.date}</td>
                    <td className="px-4 py-3">{t.type}</td>
                    <td className="px-4 py-3">{t.amount} HTG</td>
                    <td className="px-4 py-3">{t.match || ""}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pb-8"></div>
        </div>
      </div>
    </div>
  );
}
