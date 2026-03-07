import { TrendingUp, ShoppingBag } from "lucide-react";
import { DashboardStatItem } from "@/types/dashboard";

export interface ChartDataPoint {
  label: string;
  revenue: number;
}

export const revenueStatsRow1: DashboardStatItem[] = [
  {
    title: "Today's Revenue",
    value: "8,000 HTG",
    iconBgColor: "#E8F5E9",
    iconColor: "#4CAF50",
    icon: TrendingUp,
  },
  {
    title: "This Week's Revenue",
    value: "8,000 HTG",
    iconBgColor: "#E8F5E9",
    iconColor: "#4CAF50",
    icon: TrendingUp,
  },
  {
    title: "This Month's Revenue",
    value: "8,000 HTG",
    iconBgColor: "#E8F5E9",
    iconColor: "#4CAF50",
    icon: TrendingUp,
  },
  {
    title: "Total Revenue",
    value: "8,000 HTG",
    iconBgColor: "#E8F5E9",
    iconColor: "#4CAF50",
    icon: TrendingUp,
  },
];

export const revenueStatsRow2: DashboardStatItem[] = [
  {
    title: "Total Entry Collected",
    value: "8,000 HTG",
    iconBgColor: "#FCE4EC",
    iconColor: "#E91E63",
    icon: ShoppingBag,
  },
  {
    title: "Total Price Distributed",
    value: "8,000 HTG",
    iconBgColor: "#FCE4EC",
    iconColor: "#E91E63",
    icon: ShoppingBag,
  },
];

export const monthlyRevenueData: ChartDataPoint[] = [
  { label: "Jan", revenue: 35000 },
  { label: "Feb", revenue: 43000 },
  { label: "Mar", revenue: 51000 },
  { label: "Apr", revenue: 59000 },
  { label: "May", revenue: 70000 },
  { label: "Jun", revenue: 78000 },
  { label: "Jul", revenue: 88000 },
  { label: "Aug", revenue: 95000 },
  { label: "Sep", revenue: 102000 },
  { label: "Oct", revenue: 110000 },
  { label: "Nov", revenue: 118000 },
  { label: "Dec", revenue: 128000 },
];

export const weeklyRevenueData: ChartDataPoint[] = [
  { label: "Week 1", revenue: 95000 },
  { label: "Week 2", revenue: 98000 },
  { label: "Week 3", revenue: 110000 },
  { label: "Week 4", revenue: 118000 },
  { label: "Week 5", revenue: 125000 },
];

export const dailyRevenueData: ChartDataPoint[] = [
  { label: "Sun", revenue: 35000 },
  { label: "Mon", revenue: 38000 },
  { label: "Tue", revenue: 42000 },
  { label: "Wed", revenue: 48000 },
  { label: "Thu", revenue: 49000 },
  { label: "Fri", revenue: 50000 },
  { label: "Sat", revenue: 55000 },
];
