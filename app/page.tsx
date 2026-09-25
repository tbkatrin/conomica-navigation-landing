import ContactUs from "@/components/ContactUs";
import DecorativeCircle from "@/components/DecorativeCircle";
import Facts from "@/components/Facts";
import Footer from "@/components/Footer";
import GroupStructure from "@/components/GroupStructure";
import Hero from "@/components/Hero";
import HeroShowcase from "@/components/HeroShowcase";
import Offer from "@/components/Offer";
import SiteHeader from "@/components/SiteHeader";
import Team from "@/components/Team";
import StackSpread from "@/components/ui/stack-spread";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />
      <Hero />
      <div
        className="relative z-10 mx-auto rounded-[24px] bg-white"
        style={{ maxWidth: 1424, width: "calc(100% - 16px)", marginTop: 32 }}
      >
        <HeroShowcase />
        <DecorativeCircle />
        <Offer />
      </div>
      <div className="mx-auto w-full max-w-[1440px]">
        <StackSpread bgColor="transparent" />
      </div>
      <GroupStructure />
      <Team />
      <Facts />
      <ContactUs />
      <Footer />
    </main>
  );
}
