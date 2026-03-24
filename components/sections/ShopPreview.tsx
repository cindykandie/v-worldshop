import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const items = [
  {
    title: "Glow Ritual Oil",
    desc: "A soft, botanical blend for post-dance grounding.",
  },
  {
    title: "Embodied Journal",
    desc: "Prompts and space for gentle reflection and release.",
  },
  {
    title: "Rose Quartz Anklet",
    desc: "A playful, symbolic adornment for movement days.",
  },
];

const ShopPreview = () => {
  return (
    <section id="shop" className="relative overflow-hidden vw-section-rose py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-vw-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-72 w-72 rounded-full bg-vw-electric-pink/25 blur-3xl" />

      <Container className="relative z-10">
        <Stagger className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <StaggerItem>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vw-plum">
                Shop Preview
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.05] text-vw-ink md:text-5xl">
                Curated items for your soft power.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-vw-muted md:text-base">
                Products designed to extend the glow beyond class — rituals,
                adornments, and playful objects that celebrate your body.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button href="#shop" className="text-sm">
                  Visit the Shop
                </Button>
                <Button
                  href="#newsletter"
                  variant="ghost"
                  className="border-black/15 bg-black/5 text-vw-ink hover:bg-black/10"
                >
                  Get Drop Alerts
                </Button>
              </div>
            </StaggerItem>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <StaggerItem
                key={item.title}
                className="group rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_24px_60px_rgba(86,22,64,0.12)] transition hover:-translate-y-2"
              >
                <div className="relative mb-4 h-36 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-vw-blush via-white to-vw-lilac">
                  <Image
                    src="/mainlogo.jpg"
                    alt={item.title}
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <p className="text-sm font-semibold text-vw-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-vw-muted">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-vw-plum">
                  Explore
                  <span aria-hidden>→</span>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem className="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-[0_24px_60px_rgba(86,22,64,0.12)]">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vw-plum">
                    Limited Drops
                  </p>
                  <p className="mt-3 text-sm text-vw-muted">
                    Each collection is small-batch and ritual-focused. Get on the
                    list for first access.
                  </p>
                </div>
                <Button href="#newsletter" className="mt-6 w-full text-sm">
                  Join Drop List
                </Button>
              </div>
            </StaggerItem>
          </div>
        </Stagger>
      </Container>
    </section>
  );
};

export default ShopPreview;
