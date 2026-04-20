export type MatchStatus = "upcoming" | "latest" | "completed" | "cancelled" | "Upcoming" | "Latest" | "Completed" | "Cancelled";
export type SportType = "Football" | "Basketball" | "Cricket" | string;

export interface Match {
  id: number;
  match_title: string;
  sport_name: SportType;
  league_name: string;
  match_date: string;
  match_time_start: string;
  team_a: string;
  team_b: string;
  team_a_logo: string | null;
  team_b_logo: string | null;
  platform_fee_percent: string;
  promotional_amount: string;
  feature_match: number;
  entry_fee: string;
  image_url: string | null;
  status: MatchStatus;
  prize_pool: string | number;
  participants_count: number;
  score_a?: number;
  score_b?: number;
  winning_team?: string;
}

export interface LeaderboardEntry {
  id: string;
  pos: number;
  playerNo: string;
  name: string;
  predictedTeam: string;
  status: "Won" | "Lost" | "Pending";
}
