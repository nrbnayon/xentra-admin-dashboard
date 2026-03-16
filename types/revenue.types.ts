export interface ChartDataPoint {
  label: string;
  revenue: number;
}

export interface RevenueApiResponse {
  todays_revenue: string;
  this_weeks_revenue: string;
  this_months_revenue: string;
  total_revenue: string;
  total_entry_collected: string;
  total_prize_distributed: string;
  monthly_revenue: string[];
  weekly_revenue: string[];
  daily_revenue: string[];
}
