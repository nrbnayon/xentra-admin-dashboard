import { Metadata } from "next";
import SettingsClient from "@/components/Protected/Settings/SettingsClient";

export const metadata: Metadata = {
  title: "Settings | Xentra",
  description: "Manage your account and application preferences",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
