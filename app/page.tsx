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
      {/* grey strip behind the two separate white cards (showcase, offer);
          `flow-root` keeps their top margins inside it instead of
          collapsing through it */}
      <div className="flow-root bg-[#F5F5F5]">
        <div
          className="relative z-10 mx-auto w-full rounded-[24px] bg-white [container-type:inline-size]"
          style={{ maxWidth: "min(1524.44px, 95.2778%)", marginTop: "min(44.4444px, 2.7778vw)" }}
        >
          <HeroShowcase />
        </div>
        <div
          className="relative z-10 mx-auto w-full"
          style={{ maxWidth: "min(1524.44px, 95.2778%)", marginTop: "min(55.5555px, 3.4722vw)" }}
        >
          <Offer />
        </div>
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
