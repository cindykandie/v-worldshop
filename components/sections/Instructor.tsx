import Image from "next/image";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const highlights = [
  { label: "Specialty", value: "Sensual & Heels Dance" },
  { label: "Style", value: "Hip-hop · Feminine Energy" },
  { label: "Location", value: "Nairobi, Kenya" },
];

export default function Instructor() {
  return (
    <section className="relative overflow-hidden vw-section py-20 sm:py-28">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-vw-neon-pink/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-vw-neon-violet/15 blur-3xl" />

      <Container className="relative z-10">
        <Stagger className="mb-12 text-center">
          <StaggerItem>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Meet Your Instructor
            </span>
          </StaggerItem>
        </Stagger>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Photo */}
          <Stagger>
            <StaggerItem>
              <div className="group relative mx-auto max-w-sm">
                {/* Decorative border ring */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-vw-neon-pink/30 via-vw-neon-violet/20 to-transparent blur-sm transition-all duration-500 group-hover:blur-md" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/justmurayah.png"
                    alt="Just Murayah — choreographer and sensual dance trainer"
                    width={520}
                    height={620}
                    className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <a
                      href="https://www.instagram.com/justmurayah/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/15"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current text-vw-neon-pink">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      @justmurayah
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Bio */}
          <Stagger className="space-y-7">
            <StaggerItem>
              <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                Just{" "}
                <span className="text-vw-neon-pink">Murayah</span>
              </h2>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                Choreographer · Sensual Dance Trainer
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-base leading-relaxed text-white/75">
                Nairobi-based choreographer and sensual movement trainer helping
                women reclaim their confidence through dance. From{" "}
                <span className="text-white/90 font-medium">Heels, Whine & Pose</span> to{" "}
                <span className="text-white/90 font-medium">Twerk Outs</span>, her
                sessions blend hip-hop energy with deep feminine expression —
                creating a space where every body is celebrated.
              </p>
            </StaggerItem>

            {/* Stat pills */}
            <StaggerItem>
              <div className="flex flex-wrap gap-3">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{h.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{h.value}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/justmurayah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vw-btn vw-btn-primary px-7"
                >
                  Follow on Instagram
                </a>
                <a
                  href="https://vaginaworldshop.hustlesasa.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vw-btn vw-btn-ghost px-7"
                >
                  Book a Session
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
