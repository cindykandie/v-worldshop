import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const Newsletter = () => {
  return (
    <section id="newsletter" className="relative overflow-hidden vw-section-magenta py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-80 w-80 -translate-x-1/2 rounded-full bg-vw-hot-pink/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-[-10%] h-72 w-72 rounded-full bg-vw-neon-violet/30 blur-3xl" />

      <Container className="relative z-10">
        <Stagger className="vw-card mx-auto max-w-4xl rounded-[2.5rem] p-8 sm:p-12">
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
              Stay Close
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
              Weekly softness, delivered.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Join our newsletter for class drops, rituals, and community notes.
              We keep it intentional and luminous.
            </p>
          </StaggerItem>
          <StaggerItem>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                className="vw-input w-full rounded-full px-5 py-4 text-sm placeholder:text-white/40"
                placeholder="Email address"
              />
              <Button className="px-8">Join the Circle</Button>
            </form>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
};

export default Newsletter;
