import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You are successfully authenticated with Clerk.
          </p>
        </div>
      </div>
    </div>
  );
}