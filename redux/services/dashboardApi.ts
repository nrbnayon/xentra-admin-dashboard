import { apiSlice } from "../features/apiSlice";
import { DashboardOverview } from "@/types/dashboard.types";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardOverview: builder.query<DashboardOverview, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetAdminDashboardOverviewQuery } = dashboardApi;
