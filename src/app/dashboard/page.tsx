import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <header className="mb-8">
        <Nav />
      </header>
      <main>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}
