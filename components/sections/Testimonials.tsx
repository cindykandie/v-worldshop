import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "I left feeling softer in my own skin — held, celebrated, and powerful.",
    name: "Nia",
    role: "Workshop member",
  },
  {
    quote:
      "The vibe is artful and safe. It feels like a ritual with friends.",
    name: "Amara",
    role: "Community circle",
  },
  {
    quote:
      "Every session is a reminder that my body is a home I love.",
    name: "Lola",
    role: "Embodiment class",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden vw-section py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-vw-neon-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-vw-neon-violet/20 blur-3xl" />

      <Container className="relative z-10">
        <Stagger className="space-y-6">
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              Stories
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-4xl font-semibold text-white md:text-5xl">
              Soft power, shared out loud.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-sm text-white/70 md:text-base">
              Real voices from our circle — tender, brave, and deeply human.
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.name} className="vw-card vw-card-sheen rounded-3xl p-6">
              <p className="text-sm text-white/85">“{item.quote}”</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {item.role}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};

export default Testimonials;
