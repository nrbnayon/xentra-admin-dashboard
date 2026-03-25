export type UserStatus =
  | "active"
  | "inactive"
  | "pending"
  | "removed"
  | "suspended";

export interface User {
  id: number;
  full_name: string;
  phone: string;
  balance: string;
  contest_joined: number;
  total_win: number;
  total_lose: number;
  is_active: boolean;
  role?: "admin" | "user" | "guest" | "creator";
  email_address?: string;
  image?: string;
  status?: UserStatus;
  location?: string;
  date?: string;
  // Fallbacks for earlier mappings if needed
  name?: string;
  phone_number?: string;
  [key: string]: any;
}

export interface UserFormData {
  name: string;
  phone_number: string;
  email_address?: string;
  password?: string;
  role: "admin";
}

export interface Transaction {
  date: string;
  type: string;
  amount: string;
  match_name: string;
  id?: string;
}

export interface Prediction {
  sport_name: string;
  league_name: string;
  match_date: string;
  match_time_start: string;
  team_a: string;
  team_b: string;
  prediction: string;
  id?: string;
}

export interface Wallet {
  total_balance: string;
  total_deposit: string;
  total_withdrawal: string;
  total_winning: string;
  total_deduction: string;
}

export interface ToggleStatusResponse {
  message: string;
}
