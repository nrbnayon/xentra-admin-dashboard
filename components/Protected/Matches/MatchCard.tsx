import { Match } from "@/types/matches";
import { SquarePen, Trash2, Circle } from "lucide-react";
import Image from "next/image";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useTranslate } from "@/hooks/useTranslate";

interface MatchCardProps {
  match: Match;
  onEdit: (match: Match) => void;
  onDelete: (match: Match) => void;
  onEnterResult: (match: Match) => void;
  onViewLeaderboard: (match: Match) => void;
  onNotifyUser?: (match: Match) => void;
  onToggleFeatured?: (matchId: number, isFeatured: boolean) => void;
}

export default function MatchCard({
  match,
  onEdit,
  onDelete,
  onEnterResult,
  onViewLeaderboard,
  onNotifyUser,
  onToggleFeatured,
}: MatchCardProps) {
  const { translatedText: featuredText } = useTranslate("Featured");
  const { translatedText: notFeaturedText } = useTranslate("Not Featured");

  const isActionable =
    match.status.toLowerCase() === "completed" ||
    match.status.toLowerCase() === "live";

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "text-yellow-400";
      case "live":
        return "text-green-400";
      case "completed":
        return "text-blue-400";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(`${dateStr}Z`); // Backend sends naive UTC, append Z
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      if (!timeStr) return "";
      const date = new Date(`${timeStr}Z`);
      if (isNaN(date.getTime())) return timeStr;
      const formatted = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return formatted.replace(":", ".").replace(" ", ""); // Matches original "3.00PM" style
    } catch (e) {
      return timeStr;
    }
  };
  
  const statusFormatted = match.status.charAt(0).toUpperCase() + match.status.slice(1);

  return (
    <div className="relative w-full min-h-[280px] h-full rounded-xl overflow-hidden shadow-lg group flex flex-col">
      {/* Background Image & Overlay */}
      <Image
        src={match.image_url || "/images/match2.png"}
        alt={match.match_title}
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#0000005d] z-10" />

      {/* Content */}
      <div className="relative z-20 p-4 h-full flex flex-col justify-between flex-1">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 shrink-0">
            <Circle
              className={`w-3 h-3 fill-current ${getStatusColor(match.status)}`}
            />
            <span className="text-xs font-semibold text-foreground">
              <TranslatedText text={statusFormatted} />
            </span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => onToggleFeatured?.(match.id, !match.feature_match)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                match.feature_match === 1
                  ? "bg-white text-primary"
                  : "bg-white text-foreground hover:bg-gray-300"
              }`}
              title={match.feature_match === 1 ? featuredText : notFeaturedText}
            >
              <div
                className={`w-8 h-4 rounded-full relative transition-colors ${
                  match.feature_match === 1 ? "bg-primary" : "bg-gray-400"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                    match.feature_match === 1 ? "left-4.5" : "left-0.5"
                  }`}
                />
              </div>
            </button>
            <button
              onClick={() => onEdit(match)}
              aria-label="Edit Match"
              className="bg-white hover:bg-gray-300 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <SquarePen className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => onDelete(match)}
              aria-label="Delete Match"
              className="bg-white hover:bg-gray-300 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <button
              onClick={() => onNotifyUser?.(match)}
              aria-label="Notify User"
              className="bg-white hover:bg-gray-300 px-4 py-1.5 rounded-full transition-colors cursor-pointer text-primary text-[10px] md:text-xs font-semibold whitespace-nowrap"
            >
              <TranslatedText text="Notify User" />
            </button>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex flex-col items-center justify-center text-center my-4 py-2">
          <h3 className="text-white text-lg md:text-xl font-bold mb-4 bg-[#00000099] px-5 py-2 rounded-full inline-block shadow-md">
            <TranslatedText text={match.match_title} />
          </h3>

          <div className="flex flex-wrap justify-between w-full max-w-[420px] px-1 gap-2">
            <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
              <p className="font-medium text-[11px] leading-tight opacity-90">
                {formatDate(match.match_date)}
              </p>
              <p className="font-semibold text-xs">
                {formatTime(match.match_time_start)}
              </p>
            </div>
            <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
              <p className="font-medium text-[11px] leading-tight opacity-90">
                <TranslatedText text="Entry fee" />
              </p>
              <p className="font-semibold text-xs">{match.entry_fee} HTG</p>
            </div>
            {match.promotional_amount && (
              <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
                <p className="font-medium text-[10px] uppercase tracking-wider text-yellow-400 leading-tight">
                  <TranslatedText text="Win up to" />
                </p>
                <p className="font-bold text-xs truncate max-w-full">
                  {match.promotional_amount}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 font-bold text-white text-base md:text-lg flex items-center justify-center gap-3 bg-[#242424a6] px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm max-w-full">
            <span className="truncate">{match.team_a}</span>
            <span className="text-sm font-medium opacity-80">
              <TranslatedText text="V/S" />
            </span>
            <span className="truncate">{match.team_b}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-auto pt-2">
          <button
            onClick={() => onEnterResult(match)}
            aria-label="Enter Result"
            className="flex-1 min-w-[120px] max-w-[150px] bg-primary hover:bg-[#2a4365] text-white text-xs sm:text-sm font-medium py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <TranslatedText text="Enter Result" />
          </button>
          {isActionable && (
            <button
              onClick={() => onViewLeaderboard(match)}
              aria-label="View Leaderboard"
              className="flex-1 min-w-[140px] max-w-[170px] bg-white hover:bg-gray-100 text-primary text-xs sm:text-sm font-medium py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <TranslatedText text="View Leaderboard" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
