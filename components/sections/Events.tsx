import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const Events = () => {
  return (
    <section id="events" className="relative overflow-hidden bg-vw-night py-20 sm:py-24">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_15%_20%,rgba(124,59,255,0.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,61,189,0.2),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-vw-neon-violet/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-80 w-80 rounded-full bg-vw-neon-pink/25 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Become Who You Are
            </span>

            <h2 className="mt-6 text-4xl font-black leading-[1.08] text-white md:text-5xl">
              Once A{" "}
              <span className="text-vw-neon-violet">Dancer</span>, Is Always A{" "}
              <span className="text-vw-neon-pink">Dancer</span>,
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              The Vagina Worldshop celebrates movement and personal expression.
              Our sessions are playful, safe, and bold — with guided practices
              that help you reconnect to your body and community.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="#workshops"
                className="rounded-full border border-vw-neon-violet/60 bg-transparent text-white shadow-[0_0_18px_rgba(124,59,255,0.35)] hover:bg-white/5"
              >
                Join Classes
              </Button>

              <button className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vw-neon-violet/20 text-vw-neon-violet">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M8 5l11 7-11 7V5z" />
                  </svg>
                </span>
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "5k+ members",
                "200+ classes",
                "Live & On-Demand",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[22rem] w-[14rem] sm:h-[28rem] sm:w-[18rem]">
              <Image
                src="/mainlogo.jpg"
                alt="Dancer pose one"
                fill
                className="object-cover opacity-90 [filter:drop-shadow(0_0_25px_rgba(124,59,255,0.55))]"
              />
            </div>
            <div className="relative -ml-10 mt-10 h-[24rem] w-[16rem] sm:h-[30rem] sm:w-[20rem]">
              <Image
                src="/mainlogo.jpg"
                alt="Dancer pose two"
                fill
                className="object-cover opacity-90 [filter:drop-shadow(0_0_30px_rgba(255,61,189,0.6))]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Events;
