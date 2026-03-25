export type MatchStatus = "Upcoming" | "Latest" | "Completed" | "Cancelled";
export type SportType = "Football" | "Basketball";

export interface Match {
  id: string;
  status: MatchStatus;
  sport: SportType;
  league: string;
  title: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  teamAFlag?: string;
  teamBFlag?: string;
  entryFee: number;
  platformFee: number;
  image: string;
  participants: number;
  isFeatured?: boolean;
  winUpTo?: string;
}

export interface LeaderboardEntry {
  id: string;
  pos: number;
  playerNo: string;
  name: string;
  predictedTeam: string;
  status: "Won" | "Lost" | "Pending";
}
