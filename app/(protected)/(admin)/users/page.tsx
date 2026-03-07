import UsersClient from "@/components/Protected/Users/UsersClient";

export const metadata = {
  title: "Users | Xentra Admin",
  description: "Manage users for Xentra",
};

export default async function UsersPage() {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate fetch delay to show loading skeleton

  return <UsersClient />;
}
