import { AppNotification } from "@/types/notifications";

export const notificationsData: AppNotification[] = Array.from({
  length: 15,
}).map((_, i) => ({
  id: (i + 1).toString(),
  type: "withdrawal_request",
  title: "New withdrawal request",
  message: "John Doe want to withdraw",
  timestamp: "Tuesday 2:00 PM",
  isRead: i > 5,
  user: {
    name: "John Doe",
    image: "/images/user.webp",
    moncashNumber: "1234",
    natcashNumber: "1234",
  },
  details: {
    amount: 1234,
    currency: "HTG",
  },
}));
