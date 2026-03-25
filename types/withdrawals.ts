// types/withdrawals.ts
// Matches the real API response from GET /admin/withdrawals

export type WithdrawalStatus = "Completed" | "Pending" | "Rejected";

// ── Single withdrawal item inside the paginated response ──────────────────────
export interface WithdrawalUser {
  full_name: string;
  phone: string;
}

export interface Withdrawal {
  id: number;
  amount: string;       // e.g. "-100.00"
  status: WithdrawalStatus;
  created_at: string;   // ISO date string
  reference: string;    // e.g. "Natcash - 01725039612"
  user: WithdrawalUser;
}

// ── Paginated list response ───────────────────────────────────────────────────
export interface GetWithdrawalsResponse {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  data: Withdrawal[];
}

// ── Filter arg passed to the query ───────────────────────────────────────────
export type WithdrawalStatusFilter = "All" | WithdrawalStatus;

export interface GetWithdrawalsParams {
  status?: WithdrawalStatus; // omit for "All"
  page?: number;
}
