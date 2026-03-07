import WithdrawalsClient from "@/components/Protected/Withdrawals/WithdrawalsClient";

export const metadata = {
  title: "Withdrawals | Xentra Admin",
  description: "Manage withdrawals for Xentra",
};

export default async function WithdrawalsPage() {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate fetch delay for loading skeleton

  return <WithdrawalsClient />;
}
