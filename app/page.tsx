import ContactUs from "@/components/ContactUs";
import Facts from "@/components/Facts";
import Footer from "@/components/Footer";
import GroupStructure from "@/components/GroupStructure";
import Hero from "@/components/Hero";
import HeroShowcase from "@/components/HeroShowcase";
import Offer from "@/components/Offer";
import SiteHeader from "@/components/SiteHeader";
import StatsShowcase from "@/components/StatsShowcase";
import Team from "@/components/Team";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />
      <Hero />
      <div
        className="relative z-10 mx-auto w-full rounded-[24px] bg-white [container-type:inline-size]"
        style={{ maxWidth: "min(1600px, calc(100% - 16px))", marginTop: "2.2222cqw" }}
      >
        <HeroShowcase />
        <Offer />
      </div>
      <StatsShowcase />
      <GroupStructure />
      <Team />
      <Facts />
      <ContactUs />
      <Footer />
    </main>
  );
}
