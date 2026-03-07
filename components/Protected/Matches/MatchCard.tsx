import { Match } from "@/types/matches";
import { SquarePen, X, Circle } from "lucide-react";
import Image from "next/image";

interface MatchCardProps {
  match: Match;
  onEdit: (match: Match) => void;
  onDelete: (match: Match) => void;
  onEnterResult: (match: Match) => void;
  onViewLeaderboard: (match: Match) => void;
}

export default function MatchCard({
  match,
  onEdit,
  onDelete,
  onEnterResult,
  onViewLeaderboard,
}: MatchCardProps) {
  const isActionable =
    match.status === "Completed" || match.status === "Latest";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "text-yellow-400";
      case "Completed":
        return "text-green-500";
      case "Latest":
        return "text-purple-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
      {/* Background Image & Overlay */}
      <Image
        src={match.image || "/images/match1.png"}
        alt={match.title}
        layout="fill"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#0000004D] z-10" />

      {/* Content */}
      <div className="relative z-20 p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1">
            <Circle
              className={`w-3 h-3 fill-current ${getStatusColor(match.status)}`}
            />
            <span className="text-xs font-semibold text-foreground">
              {match.status}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(match)}
              className="bg-white hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <SquarePen className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => onDelete(match)}
              className="bg-white hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex flex-col items-center justify-center text-center mt-2">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-3 bg-[#00000080] px-4 py-2 rounded-full">
            {match.title}
          </h3>

          <div className="flex justify-between w-full max-w-[240px] px-2">
            <div className="text-left bg-black/30 px-3 py-1.5 rounded text-white text-xs">
              <p className="opacity-80 font-medium">{match.date}</p>
              <p className="font-bold">{match.time}</p>
            </div>
            <div className="text-right bg-black/30 px-3 py-1.5 rounded text-white text-xs">
              <p className="opacity-80 font-medium">Entry fee</p>
              <p className="font-bold">{match.entryFee} HTG</p>
            </div>
          </div>

          <div className="mt-4 font-bold text-white text-[15px] flex items-center justify-center gap-2 bg-black/40 px-6 py-1 rounded-full">
            <span>{match.teamA}</span>
            <span className="text-gray-300 font-normal">V/S</span>
            <span>{match.teamB}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => onEnterResult(match)}
            className="flex-1 max-w-[140px] bg-primary hover:bg-[#2a4365] text-white text-sm font-medium py-2 rounded-full transition-colors"
          >
            Enter Result
          </button>
          {isActionable && (
            <button
              onClick={() => onViewLeaderboard(match)}
              className="flex-1 max-w-[140px] bg-white hover:bg-gray-100 text-primary text-sm font-medium py-2 rounded-full transition-colors"
            >
              View Leaderboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
