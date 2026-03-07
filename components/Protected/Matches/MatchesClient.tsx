"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import MatchCard from "./MatchCard";
import MatchModal from "./Modals/MatchModal";
import ResultModal from "./Modals/ResultModal";
import LeaderboardModal from "./Modals/LeaderboardModal";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import { Pagination } from "@/components/Shared/Pagination";
import { matchesData, leaderboardData } from "@/data/matchesData";
import { Match } from "@/types/matches";
import { Plus } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";

type TabType = "All" | "Upcoming" | "Latest" | "Completed";
type FilterType = "All" | "Football" | "Basketball";

export default function MatchesClient() {
  const [matches, setMatches] = useState<Match[]>(matchesData);
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    if (activeTab !== "All" && match.status !== activeTab) return false;
    if (activeFilter !== "All" && match.sport !== activeFilter) return false;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCreateOrEditMatch = (matchData: Partial<Match>) => {
    if (selectedMatch) {
      setMatches(
        matches.map((m) =>
          m.id === selectedMatch.id ? ({ ...m, ...matchData } as Match) : m,
        ),
      );
    } else {
      const newMatch: Match = {
        ...matchData,
        id: Date.now().toString(),
        status: "Upcoming",
        participants: 0,
      } as Match;
      setMatches([newMatch, ...matches]);
    }
  };

  const handleDelete = () => {
    if (selectedMatch) {
      setMatches(matches.filter((m) => m.id !== selectedMatch.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmitResult = (matchId: string, result: any) => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, status: "Completed" } : m,
      ),
    );
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
              onClick={() => setActiveFilter("All")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "All"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("Football")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Football"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              ⚽ Football
            </button>
            <button
              onClick={() => setActiveFilter("Basketball")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Basketball"
                  ? "bg-primary text-white"
                  : "bg-white shadow-[0px_2px_10px_0px_#18181829] text-foreground hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              🏀 Basketball
            </button>
          </div>

          <button
            onClick={openMatchModalForCreation}
            className="flex items-center gap-2 bg-primary hover:bg-[#2a4365] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Match
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
          {["All", "Upcoming", "Latest", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as TabType);
                setCurrentPage(1);
              }}
              className={`flex-1 min-w-30 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <TranslatedText text={tab} />
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          {paginatedMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onEdit={openMatchModalForEditing}
              onDelete={openDeleteModal}
              onEnterResult={openResultModal}
              onViewLeaderboard={openLeaderboardModal}
            />
          ))}
          {paginatedMatches.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No matches found for the selected view.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredMatches.length}
              itemsPerPage={itemsPerPage}
              currentItemsCount={paginatedMatches.length}
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
        leaderboardData={leaderboardData}
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
