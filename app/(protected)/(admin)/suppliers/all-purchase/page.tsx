import AllPurchasesClient from "@/components/Protected/Suppliers/AllPurchasesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Purchases | Xentra",
  description: "Manage purchases and track price changes",
};

export default function AllPurchases() {
  return <AllPurchasesClient />;
}
