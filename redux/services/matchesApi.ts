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
    // Admin paginated matches - uses /admin/matches with real-time status sync
    getMatches: builder.query<
      PaginationResponse<Match>,
      { page?: number; pageSize?: number; tab?: string; sport?: string }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.set("page", String(params.page));
        if (params.pageSize) searchParams.set("page_size", String(params.pageSize));
        // Pass tab as-is (backend lowercases it); skip "All"
        if (params.tab && params.tab !== "All") searchParams.set("tab", params.tab);
        if (params.sport && params.sport !== "All") searchParams.set("sport", params.sport);
        const qs = searchParams.toString();
        return `/admin/matches${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Dashboard"],
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

    submitMatchResult: builder.mutation<
      { message: string },
      { id: number; score_a: number; score_b: number; winning_team: string }
    >({
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
        const searchParams = new URLSearchParams();
        if (page) searchParams.set("page", String(page));
        if (pageSize) searchParams.set("page_size", String(pageSize));
        const qs = searchParams.toString();
        return `/matches/${id}/leaderboard${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: true,
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
