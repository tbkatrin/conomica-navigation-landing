import Hero from "@/components/Hero";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
      </main>
    </>
  );
}
