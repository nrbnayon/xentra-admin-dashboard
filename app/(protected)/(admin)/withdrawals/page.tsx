import WithdrawalsClient from "@/components/Protected/Withdrawals/WithdrawalsClient";

export const metadata = {
  title: "Withdrawals | Xentra Admin",
  description: "Manage withdrawals for Xentra",
};

export default function WithdrawalsPage() {
  return <WithdrawalsClient />;
}
