import Facts from "@/components/Facts";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Offer />
      <Facts />
    </main>
  );
}
