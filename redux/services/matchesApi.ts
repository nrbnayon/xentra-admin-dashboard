import { apiSlice } from "../features/apiSlice";
import { Match } from "@/types/matches";

interface PaginationResponse<T> {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  data: T[];
}

export const matchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatches: builder.query<
      PaginationResponse<Match>,
      { page?: number; pageSize?: number; tab?: string; sport?: string }
    >({
      query: (params) => {
        let url = "/matches?";
        if (params.page) url += `page=${params.page}&`;
        if (params.pageSize) url += `page_size=${params.pageSize}&`;
        if (params.tab && params.tab !== "All") url += `tab=${params.tab.toLowerCase()}&`;
        if (params.sport && params.sport !== "All") url += `sport=${params.sport}&`;
        return url.slice(0, -1);
      },
      providesTags: ["Dashboard"], // Use appropriate tag or add Matches tag
    }),

    createMatch: builder.mutation<Match, FormData>({
      query: (formData) => ({
        url: "/admin/matches",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    updateMatch: builder.mutation<Match, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/matches/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    submitMatchResult: builder.mutation<{ message: string }, { id: number; score_a: number; score_b: number; winning_team: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/matches/${id}/result`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    toggleMatchFeature: builder.mutation<Match, number>({
      query: (id) => ({
        url: `/admin/matches/${id}/toggle-feature`,
        method: "PATCH",
      }),
      invalidatesTags: ["Dashboard"],
    }),

    deleteMatch: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/matches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),

    getMatchLeaderboard: builder.query<
      any,
      { id: number; page?: number; pageSize?: number }
    >({
      query: ({ id, page, pageSize }) => {
        let url = `/matches/${id}/leaderboard?`;
        if (page) url += `page=${page}&`;
        if (pageSize) url += `page_size=${pageSize}&`;
        return url.slice(0, -1);
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useCreateMatchMutation,
  useUpdateMatchMutation,
  useSubmitMatchResultMutation,
  useToggleMatchFeatureMutation,
  useDeleteMatchMutation,
  useGetMatchLeaderboardQuery,
} = matchesApi;
