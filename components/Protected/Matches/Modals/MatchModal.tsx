import { Match } from "@/types/matches";
import { X, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (match: Partial<Match>) => void;
  match?: Match | null;
}

export default function MatchModal({
  isOpen,
  onClose,
  onSave,
  match,
}: MatchModalProps) {
  const [formData, setFormData] = useState({
    sport: "Football",
    league: "",
    date: "",
    time: "",
    teamA: "",
    teamB: "",
    entryFee: 50,
    platformFee: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (match) {
      setFormData({
        sport: match.sport,
        league: match.league,
        date: match.date,
        time: match.time,
        teamA: match.teamA,
        teamB: match.teamB,
        entryFee: match.entryFee,
        platformFee: match.platformFee.toString(),
        image: null,
      });
    } else {
      setFormData({
        sport: "Football",
        league: "",
        date: "",
        time: "",
        teamA: "",
        teamB: "",
        entryFee: 50,
        platformFee: "",
        image: null,
      });
    }
    setErrors({});
  }, [match, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.league) newErrors.league = "League Name is required";
    if (!formData.date) newErrors.date = "Match Date is required";
    if (!formData.time) newErrors.time = "Match Time Start is required";
    if (!formData.teamA) newErrors.teamA = "Team A is required";
    if (!formData.teamB) newErrors.teamB = "Team B is required";
    if (!formData.platformFee)
      newErrors.platformFee = "Platform fee is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const { image, ...restData } = formData;

    onSave({
      ...restData,
      sport: restData.sport as Match["sport"],
      platformFee: Number(restData.platformFee),
      image: match?.image || "/images/bg.webp", // Mock uploading
    });
    toast.success(
      match ? "Match updated successfully!" : "Match created successfully!",
    );
    onClose();
  };

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-foreground dark:text-white">
            {match ? "Edit Match" : "Create Match"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
              Sport Name <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.sport}
              onChange={(e) =>
                setFormData({ ...formData, sport: e.target.value })
              }
              className="w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
              League Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.league}
              onChange={(e) =>
                setFormData({ ...formData, league: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.league ? "border-red-500" : ""}`}
            />
            {errors.league && (
              <p className="text-red-500 text-xs mt-1">{errors.league}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Match Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Match Time Start <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.time ? "border-red-500" : ""}`}
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team A <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.teamA}
                onChange={(e) =>
                  setFormData({ ...formData, teamA: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamA ? "border-red-500" : ""}`}
              />
              {errors.teamA && (
                <p className="text-red-500 text-xs mt-1">{errors.teamA}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Team B <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.teamB}
                onChange={(e) =>
                  setFormData({ ...formData, teamB: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamB ? "border-red-500" : ""}`}
              />
              {errors.teamB && (
                <p className="text-red-500 text-xs mt-1">{errors.teamB}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
                Entry Fee <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                {[50, 100, 250, 500].map((fee) => (
                  <label
                    key={fee}
                    className="flex items-center gap-2 cursor-pointer text-sm dark:text-white"
                  >
                    <input
                      type="radio"
                      name="entryFee"
                      value={fee}
                      checked={formData.entryFee === fee}
                      onChange={() =>
                        setFormData({ ...formData, entryFee: fee })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    {fee} HTG
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                Platform fee <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.platformFee}
                onChange={(e) =>
                  setFormData({ ...formData, platformFee: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.platformFee ? "border-red-500" : ""}`}
                placeholder="10"
              />
              {errors.platformFee && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.platformFee}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1 flex justify-between">
              <span>Upload Image</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, image: null });
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </label>
            <div className="border-2 border-dashed border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
              <UploadCloud className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
              <p className="text-sm font-medium text-foreground dark:text-gray-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max. File Size: 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2.5 border rounded-full text-foreground dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-primary hover:bg-[#2a4365] text-white rounded-full font-medium shadow transition-colors"
          >
            {match ? "Save" : "+ Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
