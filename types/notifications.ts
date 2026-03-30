// types/notifications.ts

export type NotificationType = "WITHDRAWAL_REJECTED" | "NEW_MATCH" | "WITHDRAWAL_REQUEST" | string;

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  reference_id: number;
  is_read: boolean;
  created_at: string;
}

export interface GetNotificationsResponse {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  data: AppNotification[];
}

export interface GetNotificationsParams {
  page?: number;
}
