import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <Footer />
      </main>
    </>
  );
}
