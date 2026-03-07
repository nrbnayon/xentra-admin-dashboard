export type UserStatus = "active" | "inactive" | "pending" | "removed";

export interface User {
  id: string;
  name: string;
  phone_number?: string;
  role: "admin" | "user" | "guest" | "creator";
  email_address?: string;
  image?: string;
  status?: UserStatus;
  location?: string;
  date?: string;
  phone?: string;
  balance?: number;
  contest_joined?: number;
  total_win?: number;
  total_lose?: number;
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
  id: string;
  date: string;
  type: "Deposit" | "Win" | "Withdraw" | "Deduction";
  amount: number;
  match?: string;
}

export interface Prediction {
  id: string;
  sportName: string;
  leagueName: string;
  matchDate: string;
  matchTimeStart: string;
  teamA: string;
  teamB: string;
  prediction: string;
}

export interface Wallet {
  totalBalance: number;
  totalDeposit: number;
  totalWithdrawal: number;
  totalWinning: number;
  totalDeduction: number;
}
