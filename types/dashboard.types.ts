import { LucideIcon } from "lucide-react";

export interface DashboardStatItem {
  title: string;
  value: string | number;
  iconBgColor: string;
  iconColor: string;
  icon: LucideIcon;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface DashboardOverview {
  total_users: number;
  active_matches: number;
  total_entry_collection: string;
  total_platform_revenue: string;
  active_users_today: number;
  pending_withdrawals: number;
  monthly_revenue: string[];
}
