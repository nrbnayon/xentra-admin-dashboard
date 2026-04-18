import { Match } from "@/types/matches";
import { X, Search } from "lucide-react";
import { useState } from "react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useGetMatchLeaderboardQuery } from "@/redux/services/matchesApi";
import { TablePagination } from "@/components/Shared/TablePagination";
import { DashboardSkeleton } from "@/components/Skeleton/DashboardSkeleton";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
  match,
}: LeaderboardModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isFetching } = useGetMatchLeaderboardQuery(
    { id: match?.id as number, page, pageSize },
    { skip: !isOpen || !match?.id }
  );

  if (!isOpen || !match) return null;

  const handleClose = () => {
    setSearchTerm("");
    setPage(1);
    onClose();
  };

  // Safe checks since RTK returns 'any' for the wrapper currently
  const leaderboardData = data?.data?.leaderboard || [];
  const totalItems = data?.total_records || 0;
  const totalPages = data?.total_pages || 0;

  // Let local search filter current page if backend doesn't support search param yet
  // If backend implements search, you should pass 'searchTerm' into API
  const filteredData = leaderboardData.filter(
    (entry: any) =>
      entry.player_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(entry.player_phone).includes(searchTerm),
  );

  let displayDate = "";
  let displayTime = "";
  if (match?.match_time_start) {
    const d = new Date(`${match.match_time_start}Z`);
    if (!isNaN(d.getTime())) {
      displayDate = d.toLocaleDateString("en-CA"); // Gets YYYY-MM-DD local
      displayTime = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    } else {
      displayDate = match.match_date ? match.match_date.split("T")[0] : "";
      const timeParts = match.match_time_start.split("T");
      displayTime = timeParts.length > 1 ? timeParts[1].substring(0, 5) : timeParts[0].substring(0, 5);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-bold text-foreground dark:text-white">
            <TranslatedText text="Leaderboard Details" />
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close Leaderboard Modal"
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto w-full">
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <TranslatedText text="Sport Name" />
                </label>
                <input
                  type="text"
                  disabled
                  value={match.sport_name}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="Sport Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <TranslatedText text="League Name" />
                </label>
                <input
                  type="text"
                  disabled
                  value={match.league_name}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="League Name"
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
                  value={match.team_a}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="Team A"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <TranslatedText text="Team B" />
                </label>
                <input
                  type="text"
                  disabled
                  value={match.team_b}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="Team B"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <TranslatedText text="Date" />
                </label>
                <input
                  type="text"
                  disabled
                  value={displayDate}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="Date"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <TranslatedText text="Time" />
                </label>
                <input
                  type="text"
                  disabled
                  value={displayTime}
                  className="w-full border rounded p-2.5 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300"
                  aria-label="Time"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-foreground dark:text-white">
              <TranslatedText text="Leaderboard" />
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 items-center flex justify-between">
              <span><TranslatedText text="Total Participants" />: {match.participants_count}</span>
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

            {isLoading || isFetching ? (
              <div className="py-12 flex justify-center w-full min-h-[150px]">
                 <div className="text-gray-500 animate-pulse font-medium">Loading Leaderboard...</div>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-xl border dark:border-gray-700">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-[#D9EAF7] dark:bg-[#1f2937] text-foreground dark:text-gray-200">
                    <tr>
                      <th className="p-3 font-semibold">
                        <TranslatedText text="Rank" />
                      </th>
                      <th className="p-3 font-semibold">
                        <TranslatedText text="Player Name" />
                      </th>
                      <th className="p-3 font-semibold">
                        <TranslatedText text="Player Phone" />
                      </th>
                      <th className="p-3 font-semibold">
                        <TranslatedText text="Predicted Team" />
                      </th>
                      <th className="p-3 font-semibold">
                        <TranslatedText text="Status" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {filteredData.map((entry: any, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="p-3 text-foreground dark:text-gray-300">
                          {entry.rank}
                        </td>
                        <td className="p-3 text-foreground dark:text-gray-300">
                          {entry.player_name}
                        </td>
                        <td className="p-3 text-foreground dark:text-gray-300">
                          {entry.player_phone}
                        </td>
                        <td className="p-3 text-foreground dark:text-gray-300">
                          {entry.predicted_team}
                        </td>
                        <td className="p-3 text-foreground dark:text-gray-300">
                          <TranslatedText text={entry.status} />
                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          <TranslatedText text="No participants found." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {totalPages > 0 && !(isLoading || isFetching) && (
              <TablePagination 
                showPageSize={false}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={pageSize}
                onPageChange={(p) => setPage(p)}
                className="mt-2 border-t-0 bg-transparent px-0"
              />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
