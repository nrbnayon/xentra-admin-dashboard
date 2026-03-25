// redux/services/withdrawalsApi.ts
// RTK Query endpoints for withdrawal management.
// All requests include the Bearer token automatically via baseQueryWithReauth.

import { apiSlice } from "../features/apiSlice";
import type {
  Withdrawal,
  GetWithdrawalsResponse,
  GetWithdrawalsParams,
} from "@/types/withdrawals";

export const withdrawalsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ── 1. Get All Withdrawals (with optional status filter) ────────────────
    // Cache key varies by status so each tab has its own cache entry.
    getWithdrawals: builder.query<GetWithdrawalsResponse, GetWithdrawalsParams>(
      {
        query: ({ status, page = 1 } = {}) => {
          const params = new URLSearchParams();
          if (status) params.set("status", status);
          params.set("page", String(page));
          const qs = params.toString();
          return `/admin/withdrawals${qs ? `?${qs}` : ""}`;
        },
        providesTags: (result, _err, arg) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: "Withdrawals" as const,
                  id,
                })),
                { type: "Withdrawals" as const, id: arg.status ?? "ALL" },
              ]
            : [{ type: "Withdrawals" as const, id: arg.status ?? "ALL" }],
      }
    ),

    // ── 2. Approve Withdrawal ─────────────────────────────────────────────────
    approveWithdrawal: builder.mutation<Withdrawal, number>({
      query: (id) => ({
        url: `/admin/withdrawals/${id}/approve`,
        method: "POST",
      }),
      // Invalidate every Withdrawals cache so all tabs re-fetch correctly
      invalidatesTags: (_result, _err, id) => [
        { type: "Withdrawals", id },
        { type: "Withdrawals", id: "ALL" },
        { type: "Withdrawals", id: "Pending" },
        { type: "Withdrawals", id: "Completed" },
        { type: "Withdrawals", id: "Rejected" },
      ],
      // Optimistic update — the table reflects the change instantly
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAll = dispatch(
          withdrawalsApi.util.updateQueryData(
            "getWithdrawals",
            {},
            (draft) => {
              const item = draft.data.find((w) => w.id === id);
              if (item) item.status = "Completed";
            }
          )
        );
        const patchPending = dispatch(
          withdrawalsApi.util.updateQueryData(
            "getWithdrawals",
            { status: "Pending" },
            (draft) => {
              draft.data = draft.data.filter((w) => w.id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchAll.undo();
          patchPending.undo();
        }
      },
    }),

    // ── 3. Reject Withdrawal ──────────────────────────────────────────────────
    rejectWithdrawal: builder.mutation<Withdrawal, number>({
      query: (id) => ({
        url: `/admin/withdrawals/${id}/reject`,
        method: "POST",
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Withdrawals", id },
        { type: "Withdrawals", id: "ALL" },
        { type: "Withdrawals", id: "Pending" },
        { type: "Withdrawals", id: "Completed" },
        { type: "Withdrawals", id: "Rejected" },
      ],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAll = dispatch(
          withdrawalsApi.util.updateQueryData(
            "getWithdrawals",
            {},
            (draft) => {
              const item = draft.data.find((w) => w.id === id);
              if (item) item.status = "Rejected";
            }
          )
        );
        const patchPending = dispatch(
          withdrawalsApi.util.updateQueryData(
            "getWithdrawals",
            { status: "Pending" },
            (draft) => {
              draft.data = draft.data.filter((w) => w.id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchAll.undo();
          patchPending.undo();
        }
      },
    }),
  }),
});

export const {
  useGetWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useRejectWithdrawalMutation,
} = withdrawalsApi;
