import { User, Gamepad2, ShoppingBag, BarChart2,  CircleDashed } from "lucide-react";
import { DashboardStatItem, RevenueData } from "@/types/dashboard";

export const dashboardStatsTop: DashboardStatItem[] = [
  {
    title: "Total Users",
    value: "85",
    iconBgColor: "#FFF4E5",
    iconColor: "#FFB020",
    icon: User,
  },
  {
    title: "Active Matches",
    value: "22",
    iconBgColor: "#E3F2FD",
    iconColor: "#2196F3",
    icon: Gamepad2,
  },
  {
    title: "Total Entry Collection",
    value: "$2200",
    iconBgColor: "#FCE4EC",
    iconColor: "#E91E63",
    icon: ShoppingBag,
  },
  {
    title: "Total Platform Revenue",
    value: "$2200",
    iconBgColor: "#E8F5E9",
    iconColor: "#4CAF50",
    icon: BarChart2,
  },
];

export const dashboardStatsBottom: DashboardStatItem[] = [
  {
    title: "Total Active Users Today",
    value: "85",
    iconBgColor: "#FFF4E5",
    iconColor: "#FFB020",
    icon: User,
  },
  {
    title: "Pending Withdrawals",
    value: "22",
    iconBgColor: "#FFF4E5",
    iconColor: "#FFB020",
    icon: CircleDashed,
  },
];

export const revenueChartData: RevenueData[] = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 43000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 59000 },
  { month: "May", revenue: 70000 },
  { month: "Jun", revenue: 78000 },
  { month: "Jul", revenue: 88000 },
  { month: "Aug", revenue: 95000 },
  { month: "Sep", revenue: 102000 },
  { month: "Oct", revenue: 110000 },
  { month: "Nov", revenue: 118000 },
  { month: "Dec", revenue: 128000 },
];
