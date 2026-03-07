import { Match } from "@/types/matches";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (matchId: string, result: any) => void;
  match: Match | null;
}

export default function ResultModal({
  isOpen,
  onClose,
  onSubmit,
  match,
}: ResultModalProps) {
  const [formData, setFormData] = useState({
    teamAScore: "",
    teamBScore: "",
    winningTeam: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (match) {
      setFormData({
        teamAScore: "",
        teamBScore: "",
        winningTeam: "",
      });
      setErrors({});
    }
  }, [match, isOpen]);

  if (!isOpen || !match) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.teamAScore) newErrors.teamAScore = "Required";
    if (!formData.teamBScore) newErrors.teamBScore = "Required";
    if (!formData.winningTeam) newErrors.winningTeam = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    onSubmit(match.id, formData);
    toast.success("Result submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 pb-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team A <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={match.teamA}
                disabled
                className="w-full border rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team A Score <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.teamAScore}
                onChange={(e) =>
                  setFormData({ ...formData, teamAScore: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamAScore ? "border-red-500" : ""}`}
                placeholder="0"
              />
              {errors.teamAScore && (
                <p className="text-red-500 text-xs mt-1">{errors.teamAScore}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team B <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={match.teamB}
                disabled
                className="w-full border rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team B Score <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.teamBScore}
                onChange={(e) =>
                  setFormData({ ...formData, teamBScore: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamBScore ? "border-red-500" : ""}`}
                placeholder="0"
              />
              {errors.teamBScore && (
                <p className="text-red-500 text-xs mt-1">{errors.teamBScore}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
              Winning Team <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.winningTeam}
              onChange={(e) =>
                setFormData({ ...formData, winningTeam: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.winningTeam ? "border-red-500" : ""}`}
            >
              <option value="">Select winner...</option>
              <option value={match.teamA}>{match.teamA}</option>
              <option value={match.teamB}>{match.teamB}</option>
              <option value="Draw">Draw</option>
            </select>
            {errors.winningTeam && (
              <p className="text-red-500 text-xs mt-1">{errors.winningTeam}</p>
            )}
          </div>
        </div>

        <div className="p-8 pb-10 flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-full text-foreground dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-primary hover:bg-[#2a4365] text-white rounded-full font-medium shadow transition-colors"
          >
            Submit & Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
