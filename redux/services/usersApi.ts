import { apiSlice } from "../features/apiSlice";
import {
  User,
  Wallet,
  Transaction,
  Prediction,
  ToggleStatusResponse,
} from "@/types/users";

export interface GetAllUsersResponse {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  data: User[];
}

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetAllUsersResponse, void>({
      query: () => "/admin/users",
      providesTags: ["Users"],
    }),
    getUserWallet: builder.query<Wallet, string | number>({
      query: (id) => `/admin/users/${id}/wallet`,
      providesTags: (result, error, id) => [{ type: "Users", id: `WALLET_${id}` }],
    }),
    getUserTransactions: builder.query<Transaction[], string | number>({
      query: (id) => `/admin/users/${id}/transactions`,
      providesTags: (result, error, id) => [{ type: "Users", id: `TRANSACTIONS_${id}` }],
    }),
    getUserPredictions: builder.query<Prediction[], string | number>({
      query: (id) => `/admin/users/${id}/predictions`,
      providesTags: (result, error, id) => [{ type: "Users", id: `PREDICTIONS_${id}` }],
    }),
    toggleUserStatus: builder.mutation<ToggleStatusResponse, string | number>({
      query: (id) => ({
        url: `/admin/users/${id}/toggle_status`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetUserWalletQuery,
  useGetUserTransactionsQuery,
  useGetUserPredictionsQuery,
  useToggleUserStatusMutation,
} = usersApi;
