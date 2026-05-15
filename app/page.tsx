import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Instructor from "@/components/sections/Instructor";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Events />
      <Instructor />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
