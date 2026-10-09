import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Niches } from "@/components/sections/Niches";
import { About } from "@/components/sections/About";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyCTA } from "@/components/sections/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Niches />
        <About />
        <Packages />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
