import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Nav isScrolled={true} className="mb-4" />
          <h1 className="text-3xl font-bold">Dashboard</h1>
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