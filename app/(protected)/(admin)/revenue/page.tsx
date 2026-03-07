import RevenueClient from "@/components/Protected/Revenue/RevenueClient";

export default async function RevenuePage() {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate fetch delay for loading skeleton
  return <RevenueClient />;
}
