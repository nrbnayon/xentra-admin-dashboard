import { apiSlice } from "../features/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardOverview: builder.query<void, void>({
      query: () => ({
        url: "/api/admin/deshboard/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetAdminDashboardOverviewQuery } = dashboardApi;
