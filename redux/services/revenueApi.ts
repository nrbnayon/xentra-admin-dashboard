import { apiSlice } from "../features/apiSlice";
import { RevenueApiResponse } from "@/types/revenue.types";

export const revenueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRevenue: builder.query<RevenueApiResponse, void>({
      query: () => ({
        url: "/admin/revenue",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetRevenueQuery } = revenueApi;
