export type NotificationType = "withdrawal_request" | "system" | "user_action";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  user?: {
    name: string;
    image: string;
    moncashNumber?: string;
    natcashNumber?: string;
  };
  details?: {
    amount?: number;
    currency?: string;
    [key: string]: any;
  };
}
