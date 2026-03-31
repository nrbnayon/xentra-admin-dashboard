"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import MatchCard from "./MatchCard";
import MatchModal from "./Modals/MatchModal";
import ResultModal from "./Modals/ResultModal";
import LeaderboardModal from "./Modals/LeaderboardModal";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import { TablePagination } from "@/components/Shared/TablePagination";
import { Match } from "@/types/matches";
import { Plus } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { toast } from "sonner";
import { MatchCardSkeleton } from "@/components/Skeleton/MatchCardSkeleton";
import {
  useGetMatchesQuery,
  useCreateMatchMutation,
  useUpdateMatchMutation,
  useSubmitMatchResultMutation,
  useToggleMatchFeatureMutation,
  useDeleteMatchMutation,
} from "@/redux/services/matchesApi";

type TabType = "All" | "Upcoming" | "Latest" | "Completed";
type FilterType = "All" | "Football" | "Basketball";

export default function MatchesClient() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Modals state
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const { data, isLoading, isFetching } = useGetMatchesQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    tab: activeTab !== "All" ? activeTab : undefined,
    sport: activeFilter !== "All" ? activeFilter : undefined,
  });

  const [createMatch] = useCreateMatchMutation();
  const [updateMatch] = useUpdateMatchMutation();
  const [deleteMatch] = useDeleteMatchMutation();
  const [submitResult] = useSubmitMatchResultMutation();
  const [toggleFeature] = useToggleMatchFeatureMutation();

  const handleCreateOrEditMatch = async (formData: FormData) => {
    try {
      if (selectedMatch) {
        await updateMatch({ id: selectedMatch.id, data: formData }).unwrap();
        toast.success("Match updated successfully!");
      } else {
        await createMatch(formData).unwrap();
        toast.success("Match created successfully!");
        // Revert to page 1 to see the newly created match, and reset filters if hiding it
        setCurrentPage(1);
        setActiveTab("All");
        setActiveFilter("All");
      }
      setIsMatchModalOpen(false);
    } catch (error) {
      toast.error("Failed to save match.");
    }
  };

  const handleDelete = async () => {
    if (selectedMatch) {
      try {
        await deleteMatch(selectedMatch.id).unwrap();
        toast.success("Match deleted successfully!");
        setIsDeleteModalOpen(false);
      } catch (error) {
        toast.error("Failed to delete match.");
      }
    }
  };

  const handleSubmitResult = async (matchId: number, resultData: { score_a: number; score_b: number; winning_team: string }) => {
    try {
      await submitResult({ id: matchId, ...resultData }).unwrap();
      toast.success("Result updated, prize calculation queued.");
      setIsResultModalOpen(false);
    } catch (error) {
      toast.error("Failed to submit results.");
    }
  };

  const handleToggleFeatured = async (matchId: number, isFeatured: boolean) => {
    try {
      await toggleFeature(matchId).unwrap();
      toast.success(isFeatured ? "Match featured!" : "Match unfeatured!");
    } catch (error) {
      toast.error("Failed to update feature status.");
    }
  };

  const handleNotifyUser = (match: Match) => {
    toast.success(`Notification sent to users for match: ${match.match_title}`);
  };
 
  const openMatchModalForCreation = () => {
    setSelectedMatch(null);
    setIsMatchModalOpen(true);
  };

  const openMatchModalForEditing = (match: Match) => {
    setSelectedMatch(match);
    setIsMatchModalOpen(true);
  };

  const openDeleteModal = (match: Match) => {
    setSelectedMatch(match);
    setIsDeleteModalOpen(true);
  };

  const openResultModal = (match: Match) => {
    setSelectedMatch(match);
    setIsResultModalOpen(true);
  };

  const openLeaderboardModal = (match: Match) => {
    setSelectedMatch(match);
    setIsLeaderboardModalOpen(true);
  };

  const totalPages = data?.total_pages || 0;
  // Local sort just in case backend does not bump latest items to the top
  const paginatedMatches = data?.data ? [...data.data].sort((a, b) => b.id - a.id) : [];
  const totalItems = data?.total_records || 0;

  const showSkeleton = isLoading || isFetching;

  return (
    <div className="pb-10 min-h-screen">
      <DashboardHeader
        title="Matches"
        description="Here is the list of all the matches"
      />

      <main className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setActiveFilter("All"); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeFilter === "All"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              <TranslatedText text="All" />
            </button>
            <button
              onClick={() => { setActiveFilter("Football"); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeFilter === "Football"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              ⚽ <TranslatedText text="Football" />
            </button>
            <button
              onClick={() => { setActiveFilter("Basketball"); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeFilter === "Basketball"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              🏀 <TranslatedText text="Basketball" />
            </button>
          </div>

          <button
            onClick={openMatchModalForCreation}
            className="flex items-center gap-2 bg-primary hover:bg-[#2a4365] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <TranslatedText text="Create Match" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 overflow-x-auto no-scrollbar">
          {["All", "Upcoming", "Latest", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as TabType);
                setCurrentPage(1);
              }}
              className={`flex-1 max-w-50 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-[#1C5898] hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <TranslatedText text={tab} />
            </button>
          ))}
        </div>

        {showSkeleton ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
            {paginatedMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onEdit={openMatchModalForEditing}
                onDelete={openDeleteModal}
                onEnterResult={openResultModal}
                onViewLeaderboard={openLeaderboardModal}
                onToggleFeatured={handleToggleFeatured}
                onNotifyUser={handleNotifyUser}
              />
            ))}
            {paginatedMatches.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                <TranslatedText text="No matches found for the selected view." />
              </div>
            )}
          </div>
        )}

        {/* Improved Table Pagination */}
        {totalPages > 0 && !showSkeleton && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setItemsPerPage(newSize);
                setCurrentPage(1); // Reset to page 1 to prevent getting out of bounds
              }}
              showPageSize={true}
              pageSizeOptions={[6, 12, 24, 48]}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <MatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        onSave={handleCreateOrEditMatch}
        match={selectedMatch}
      />

      <ResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        onSubmit={handleSubmitResult}
        match={selectedMatch}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        match={selectedMatch}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Match"
        description="Are you sure you want to delete this match? This action cannot be undone."
      />
    </div>
  );
}
