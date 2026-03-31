import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const stats = [
  { label: "Safe-space sessions", value: "Weekly" },
  { label: "Community vibe", value: "Always on" },
  { label: "Focus", value: "Embodiment" },
];

const pillars = [
  {
    title: "Body Positivity",
    desc: "We celebrate real bodies, real stories, and real softness — without shame.",
  },
  {
    title: "Art + Symbolism",
    desc: "Our visuals are expressive and symbolic: empowering, playful, never explicit.",
  },
  {
    title: "Community First",
    desc: "A space to belong, meet friends, laugh, move, and feel held.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden vw-section-plum py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-vw-neon-pink/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] top-[-12%] h-80 w-80 rounded-full bg-vw-neon-violet/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-25%] left-1/3 h-[32rem] w-[32rem] rounded-full bg-vw-electric-pink/20 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Stagger className="relative pb-12">
            <StaggerItem>
              <div className="vw-card vw-card-sheen relative overflow-hidden rounded-[2rem] p-4 m-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  <Image
                    src="/mainlogo.jpg"
                    alt="About visual"
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/60" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                </div>

                <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold text-white/80">
                  Safe • Symbolic • Celebratory
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="vw-card absolute -bottom-2 left-6 right-6 rounded-2xl p-5">
                <p className="text-sm text-white/85 md:text-base">
                  “I was worried about what we think about vaginas, and even more
                  worried that we don’t think about them.”
                </p>
                <p className="mt-3 text-xs font-semibold text-white/60">
                  — Eve Ensler
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger className="space-y-6">
            <StaggerItem>
              <p className="text-xs font-semibold tracking-[0.35em] text-white/50">
                ABOUT US
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="text-4xl font-semibold uppercase leading-[1.05] text-white md:text-6xl">
                A playful world for{" "}
                <span className="inline-block text-vw-hot-pink drop-shadow-[0_0_12px_rgba(255,74,209,0.35)]">
                  feminine freedom
                </span>
                .
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                The Vagina Worldshop is a community-led space built around art,
                embodiment, and self-love. We create experiences (like Twerk Out
                sessions). A vulva loving community 🌸
                Celebrating vulvas, femininity, and the power of female expression ✨💋
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="vw-card vw-card-sheen rounded-2xl p-4 text-center"
                  >
                    <p className="text-sm font-semibold text-white">{s.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/50">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3">
                <Button href="#newsletter" variant="ghost">
                  Join the Community
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        <Stagger className="relative mt-16 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem key={p.title} className="vw-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
