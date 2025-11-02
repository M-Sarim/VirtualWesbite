import Header from "@/components/header";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
