import { X } from "lucide-react";
import { User } from "@/types/users";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import TranslatedText from "@/components/Shared/TranslatedText";

interface AdjustBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (userId: string | number, newBalance: number) => void;
}

export default function AdjustBalanceModal({
  isOpen,
  onClose,
  user,
  onSave,
}: AdjustBalanceModalProps) {
  const [amount, setAmount] = useState("");
  const [actionType, setActionType] = useState<"add" | "deduct">("add");

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setActionType("add");
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const currentBalance = parseFloat(user.balance as string) || 0;
    let newBalance = currentBalance;

    if (actionType === "add") {
      newBalance += value;
    } else {
      newBalance -= value;
    }

    onSave(user.id, newBalance);
    toast.success("Balance adjusted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-6 pb-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <TranslatedText text="Adjust Balance" />
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <TranslatedText text="User:" />{" "}
              <span className="font-semibold text-foreground dark:text-white">
                {user.full_name}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <TranslatedText text="Current Balance:" />{" "}
              <span className="font-semibold text-foreground dark:text-white">
                {user.balance || 0} HTG
              </span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TranslatedText text="Action" />
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm dark:text-white">
                <input
                  type="radio"
                  name="actionType"
                  value="add"
                  checked={actionType === "add"}
                  onChange={() => setActionType("add")}
                  className="w-4 h-4 text-primary"
                />
                <TranslatedText text="Add Funds" />
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm dark:text-white">
                <input
                  type="radio"
                  name="actionType"
                  value="deduct"
                  checked={actionType === "deduct"}
                  onChange={() => setActionType("deduct")}
                  className="w-4 h-4 text-red-500"
                />
                <TranslatedText text="Deduct Funds" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TranslatedText text="Amount (HTG)" />{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="p-6 pt-0 flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <TranslatedText text="Cancel" />
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 shadow-sm transition-colors cursor-pointer"
          >
            <TranslatedText text="Submit" />
          </button>
        </div>
      </div>
    </div>
  );
}
