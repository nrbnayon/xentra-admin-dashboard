import { Match } from "@/types/matches";
import { SquarePen, X, Circle } from "lucide-react";
import Image from "next/image";
import TranslatedText from "@/components/Shared/TranslatedText";
import { useTranslate } from "@/hooks/useTranslate";

interface MatchCardProps {
  match: Match;
  onEdit: (match: Match) => void;
  onDelete: (match: Match) => void;
  onEnterResult: (match: Match) => void;
  onViewLeaderboard: (match: Match) => void;
  onToggleFeatured?: (matchId: string, isFeatured: boolean) => void;
}

export default function MatchCard({
  match,
  onEdit,
  onDelete,
  onEnterResult,
  onViewLeaderboard,
  onToggleFeatured,
}: MatchCardProps) {
  const { translatedText: featuredText } = useTranslate("Featured");
  const { translatedText: notFeaturedText } = useTranslate("Not Featured");

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

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(":");
      const h = parseInt(hours);
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}.${minutes}${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="relative w-full min-h-[280px] h-full rounded-xl overflow-hidden shadow-lg group flex flex-col">
      {/* Background Image & Overlay */}
      <Image
        src={match.image || "/images/match2.png"}
        alt={match.title}
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
              <TranslatedText text={match.status} />
            </span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => onToggleFeatured?.(match.id, !match.isFeatured)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                match.isFeatured
                  ? "bg-white text-primary"
                  : "bg-white text-foreground hover:bg-gray-100"
              }`}
              title={match.isFeatured ? featuredText : notFeaturedText}
            >
              <div
                className={`w-8 h-4 rounded-full relative transition-colors ${
                  match.isFeatured ? "bg-primary" : "bg-gray-400"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                    match.isFeatured ? "left-4.5" : "left-0.5"
                  }`}
                />
              </div>
            </button>
            <button
              onClick={() => onEdit(match)}
              className="bg-white hover:bg-gray-100 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <SquarePen className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => onDelete(match)}
              className="bg-white hover:bg-gray-100 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex flex-col items-center justify-center text-center my-4 py-2">
          <h3 className="text-white text-lg md:text-xl font-bold mb-4 bg-[#00000099] px-5 py-2 rounded-full inline-block shadow-md">
            <TranslatedText text={match.title} />
          </h3>

          <div className="flex flex-wrap justify-between w-full max-w-[420px] px-1 gap-2">
            <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
              <p className="font-medium text-[11px] leading-tight opacity-90">
                {formatDate(match.date)}
              </p>
              <p className="font-semibold text-xs">{formatTime(match.time)}</p>
            </div>
            <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
              <p className="font-medium text-[11px] leading-tight opacity-90">
                <TranslatedText text="Entry fee" />
              </p>
              <p className="font-semibold text-xs">{match.entryFee} HTG</p>
            </div>
            {match.winUpTo && (
              <div className="flex-1 min-w-[100px] flex flex-col justify-center items-center bg-[#242424a6] px-2 py-2 rounded text-white backdrop-blur-sm">
                <p className="font-medium text-[10px] uppercase tracking-wider text-yellow-400 leading-tight">
                  <TranslatedText text="Win up to" />
                </p>
                <p className="font-bold text-xs truncate max-w-full">
                  {match.winUpTo}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 font-bold text-white text-base md:text-lg flex items-center justify-center gap-3 bg-[#242424a6] px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm max-w-full">
            <span className="truncate">{match.teamA}</span>
            <span className="text-sm font-medium opacity-80">
              <TranslatedText text="V/S" />
            </span>
            <span className="truncate">{match.teamB}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-auto pt-2">
          <button
            onClick={() => onEnterResult(match)}
            className="flex-1 min-w-[120px] max-w-[150px] bg-primary hover:bg-[#2a4365] text-white text-xs sm:text-sm font-medium py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <TranslatedText text="Enter Result" />
          </button>
          {isActionable && (
            <button
              onClick={() => onViewLeaderboard(match)}
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
