import { X } from "lucide-react";
import { Prediction } from "@/types/users";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: Prediction | null;
}

export default function PredictionModal({
  isOpen,
  onClose,
  prediction,
}: PredictionModalProps) {
  if (!isOpen || !prediction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 pb-2 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Prediction Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-4 w-full">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Prediction 1
          </h3>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Sport Name
            </label>
            <input
              type="text"
              disabled
              value={prediction.sportName}
              className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              League Name
            </label>
            <input
              type="text"
              disabled
              value={prediction.leagueName}
              className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Match Date
              </label>
              <input
                type="text"
                disabled
                value={prediction.matchDate}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Match Time Start
              </label>
              <input
                type="text"
                disabled
                value={prediction.matchTimeStart}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Team A
              </label>
              <input
                type="text"
                disabled
                value={prediction.teamA}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Team B
              </label>
              <input
                type="text"
                disabled
                value={prediction.teamB}
                className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Prediction
            </label>
            <input
              type="text"
              disabled
              value={prediction.prediction}
              className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>
          {/* Added some padding to completely match the image empty space */}
          <div className="pb-4"></div>
        </div>
      </div>
    </div>
  );
}
