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
