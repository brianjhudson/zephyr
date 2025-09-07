import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>Main</main>
      <Footer />
    </div>
  );
}
