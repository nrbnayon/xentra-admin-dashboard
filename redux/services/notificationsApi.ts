// redux/services/notificationsApi.ts

import { apiSlice } from "../features/apiSlice";
import type {
  GetNotificationsResponse,
  GetNotificationsParams,
} from "@/types/notifications";

export const notificationsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsParams>({
      query: ({ page = 1 } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        return `/admin/notifications?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Notifications" as const,
                id,
              })),
              { type: "Notifications" as const, id: "LIST" },
            ]
          : [{ type: "Notifications" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;
