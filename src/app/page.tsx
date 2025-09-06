import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { HeroContainer } from "@/components/hero-container";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header>
        <Nav />
      </header>
      <main>
        <HeroContainer />
      </main>
      <footer className=""></footer>
    </div>
  );
}
