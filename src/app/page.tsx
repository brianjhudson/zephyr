import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DrinksCarousel } from "@/components/drinks-carousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-20">
        {/* Full-width carousel section */}
        <section className="w-full">
          <DrinksCarousel />
        </section>
        
        {/* Content with proper padding */}
        <section className="px-4 max-w-7xl mx-auto py-8">
          {/* Future content goes here */}
        </section>
      </main>
      <Footer />
    </div>
  );
}
