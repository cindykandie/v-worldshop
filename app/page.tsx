import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import ShopPreview from "@/components/sections/ShopPreview";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Events />
      <ShopPreview />
      <Testimonials />
      <Newsletter /> */}
    </main>
  );
}