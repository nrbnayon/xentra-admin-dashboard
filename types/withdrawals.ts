export type WithdrawalStatus = "Approved" | "Pending" | "Rejected";

export interface Withdrawal {
  id: string;
  userId: string;
  name: string;
  moncashNumber?: string;
  natcashNumber?: string;
  amount: number;
  date: string;
  status: WithdrawalStatus;
}
