import ApprovalsClient from "@/components/Protected/Approvals/ApprovalsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approvals | Xentra",
  description:
    "Review and approve ingredient additions, recipes, and leave requests",
};

export default function ApprovalsPage() {
  return <ApprovalsClient />;
}
