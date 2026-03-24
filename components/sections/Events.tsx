import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const Events = () => {
  return (
    <section id="events" className="relative overflow-hidden vw-section-magenta py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-vw-neon-violet/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-80 w-80 rounded-full bg-vw-neon-pink/25 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Stagger className="space-y-6">
            <StaggerItem>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Become Who You Are
              </span>
            </StaggerItem>

            <StaggerItem>
              <h2 className="text-4xl font-semibold leading-[1.08] text-white md:text-5xl">
                Once A{" "}
                <span className="text-vw-neon-violet">Dancer</span>, Is Always A{" "}
                <span className="text-vw-neon-pink">Dancer</span>.
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                The Vagina Worldshop celebrates movement and personal expression.
                Our sessions are playful, safe, and bold — with guided practices
                that help you reconnect to your body and community.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="https://vaginaworldshop.hustlesasa.shop/" className="px-8">
                  Join Classes
                </Button>

                <a
                  href="https://www.instagram.com/p/DWOo_0jiOIl/"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/10"
                >
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
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3">
                {["5k+ members", "200+ classes", "Live & On-Demand"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger className="relative flex items-center justify-center">
            <StaggerItem>
              <div className="relative flex items-center justify-center">
                <div className="relative h-[22rem] w-[14rem] sm:h-[28rem] sm:w-[18rem]">
                  <Image
                    src="/class.png"
                    alt="Dancer pose one"
                    fill
                    className="object-cover opacity-90 [filter:drop-shadow(0_0_25px_rgba(124,59,255,0.55))]"
                  />
                </div>
                <div className="relative -ml-10 mt-10 h-[24rem] w-[16rem] sm:h-[30rem] sm:w-[20rem]">
                  <Image
                    src="/femininity.png"
                    alt="Dancer pose two"
                    fill
                    className="object-cover opacity-90 [filter:drop-shadow(0_0_30px_rgba(255,61,189,0.6))]"
                  />
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </Container>
    </section>
  );
};

export default Events;
