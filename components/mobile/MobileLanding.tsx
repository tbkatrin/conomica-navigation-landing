import MobileContact from "./MobileContact";
import MobileFacts from "./MobileFacts";
import MobileFooter from "./MobileFooter";
import MobileHeader from "./MobileHeader";
import MobileHero from "./MobileHero";
import MobileOffer from "./MobileOffer";
import MobileShowcase from "./MobileShowcase";
import MobileStats from "./MobileStats";
import MobileStructure from "./MobileStructure";
import MobileTeam from "./MobileTeam";

/** Stacked phone layout (Figma "Главная 390"), shown below the `md` breakpoint
 * in place of the desktop page. */
export default function MobileLanding() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      <MobileHeader />
      <MobileHero />
      <MobileShowcase />
      <MobileOffer />
      <MobileStats />
      <MobileStructure />
      <MobileTeam />
      <MobileFacts />
      <MobileContact />
      <MobileFooter />
    </div>
  );
}
