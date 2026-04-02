import { X, Loader2 } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetUserPredictionsQuery } from "@/redux/services/usersApi";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number | null;
}

export default function PredictionModal({
  isOpen,
  onClose,
  userId,
}: PredictionModalProps) {
  const { data: predictions, isLoading, isError } = useGetUserPredictionsQuery(userId!, {
    skip: !isOpen || !userId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 pb-2 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <TranslatedText text="Prediction Details" />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-6 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center py-10 text-gray-500">
              <TranslatedText text="Failed to load prediction data." />
            </div>
          ) : (!predictions || predictions.length === 0) ? (
            <div className="text-center py-10 text-gray-500">
              <TranslatedText text="No predictions found." />
            </div>
          ) : (
            predictions.map((prediction, idx) => (
              <div key={idx} className="space-y-4 border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  <TranslatedText text={`Prediction ${idx + 1}`} />
                </h3>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <TranslatedText text="Sport Name" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={prediction.sport_name}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <TranslatedText text="League Name" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={prediction.league_name}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <TranslatedText text="Match Date" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={prediction.match_date}
                      className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <TranslatedText text="Match Time Start" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={prediction.match_time_start}
                      className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <TranslatedText text="Team A" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={prediction.team_a}
                      className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <TranslatedText text="Team B" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={prediction.team_b}
                      className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <TranslatedText text="Prediction" />
                  </label>
                  <input
                    type="text"
                    disabled
                    value={prediction.prediction}
                    className="w-full border rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>
            ))
          )}
          {/* Added some padding to completely match the image empty space */}
          <div className="pb-4"></div>
        </div>
      </div>
    </div>
  );
}
