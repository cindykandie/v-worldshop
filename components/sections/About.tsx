import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

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
    <section id="about" className="relative overflow-hidden bg-vw-night py-20 sm:py-24">
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_10%,rgba(255,61,189,0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(59,182,255,0.2),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(124,59,255,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-vw-neon-pink/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] top-[-12%] h-80 w-80 rounded-full bg-vw-neon-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-25%] left-1/3 h-[32rem] w-[32rem] rounded-full bg-vw-neon-violet/25 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left copy */}
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-white/50">
              ABOUT US
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] text-white md:text-6xl">
              A playful world for{" "}
              <span className="bg-gradient-to-r from-vw-neon-pink via-vw-neon-violet to-vw-neon-blue bg-clip-text text-transparent">
                feminine freedom
              </span>
              .
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              The Vagina Worldshop is a community-led space built around art,
              embodiment, and self-love. We create experiences (like Twerk Out
              sessions) and curated drops that help you reconnect with your
              body, release tension, and feel soft — boldly.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="vw-neon-card rounded-2xl p-4 text-center"
                >
                  <p className="text-sm font-semibold text-white">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="#workshops"
                className="bg-gradient-to-r from-vw-neon-pink via-vw-neon-violet to-vw-neon-blue text-white shadow-[0_0_30px_rgba(255,61,189,0.35)]"
              >
                View Workshops
              </Button>
              <Button
                href="#newsletter"
                variant="ghost"
                className="border-white/20 text-white/90 hover:bg-white/10"
              >
                Join the Community
              </Button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative pb-12">
            <div className="vw-neon-card relative overflow-hidden rounded-[2rem] p-4">
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

            <div className="vw-neon-card absolute -bottom-6 left-6 right-6 rounded-2xl p-5">
              <p className="text-sm text-white/85 md:text-base">
                “I was worried about what we think about vaginas, and even more
                worried that we don’t think about them.”
              </p>
              <p className="mt-3 text-xs font-semibold text-white/60">
                — Eve Ensler
              </p>
            </div>
          </div>
        </div>

        {/* Pillars row */}
        <div className="relative mt-16 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="vw-neon-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
