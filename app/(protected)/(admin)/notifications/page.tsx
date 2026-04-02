import { Metadata } from "next";
import NotificationsClient from "@/components/Notifications/NotificationsClient";

export const metadata: Metadata = {
  title: "Notifications | Xentra",
  description: "Get all your notification from here",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
