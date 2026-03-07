import { Match, LeaderboardEntry } from "@/types/matches";
import { X, Search } from "lucide-react";
import { useState } from "react";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  leaderboardData: LeaderboardEntry[];
}

export default function LeaderboardModal({
  isOpen,
  onClose,
  match,
  leaderboardData,
}: LeaderboardModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen || !match) return null;

  const filteredData = leaderboardData.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.playerNo.includes(searchTerm),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-bold text-foreground dark:text-white">
            Leaderboard Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto w-full">
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Sport Name
                </label>
                <input
                  type="text"
                  disabled
                  value={match.sport}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                />
              </div>
              <div className="hidden md:block"></div>{" "}
              {/* Spacer to match mockup empty space if needed, or League is full width? Mockup shows Sport Name and League Name full width or split. */}
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                League Name
              </label>
              <input
                type="text"
                disabled
                value={match.league}
                className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Team A
                </label>
                <input
                  type="text"
                  disabled
                  value={match.teamA}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Team B
                </label>
                <input
                  type="text"
                  disabled
                  value={match.teamB}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  disabled
                  value={match.date}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  disabled
                  value={match.time}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-foreground dark:text-white">
              Leaderboard
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Total Participants: {match.participants}
            </p>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="w-full overflow-x-auto rounded-xl border dark:border-gray-700">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-[#D9EAF7] dark:bg-[#1f2937] text-foreground dark:text-gray-200">
                  <tr>
                    <th className="p-3 font-semibold">Pos</th>
                    <th className="p-3 font-semibold">Player no</th>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Predicted Team</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {filteredData.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="p-3 text-foreground dark:text-gray-300">
                        {entry.pos}
                      </td>
                      <td className="p-3 text-foreground dark:text-gray-300">
                        {entry.playerNo}
                      </td>
                      <td className="p-3 text-foreground dark:text-gray-300">
                        {entry.name}
                      </td>
                      <td className="p-3 text-foreground dark:text-gray-300">
                        {entry.predictedTeam}
                      </td>
                      <td className="p-3 text-foreground dark:text-gray-300">
                        {entry.status}
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No participants found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
