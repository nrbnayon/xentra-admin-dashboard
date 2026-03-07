import { Metadata } from "next";
import NotificationsClient from "@/components/Notifications/NotificationsClient";

export const metadata: Metadata = {
  title: "Notifications | Xentra",
  description: "Get all your notification from here",
};

export default async function NotificationsPage() {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate fetch delay for loading skeleton
  return <NotificationsClient />;
}
