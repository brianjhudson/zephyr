import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16 px-4 max-w-7xl mx-auto">
        <h1>Dashboard</h1>
      </main>
      <Footer />
    </div>
  );
}
