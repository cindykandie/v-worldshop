import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Logo width={50} height={50} />
              <div>
                <p className="font-semibold text-white">The Vagina Worldshop</p>
                <p className="text-sm text-white/70">Art. Community. Embodiment.</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/60">
              A safe, playful space for feminine expression through workshops,
              community, and curated products.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#workshops" className="hover:text-white">Workshops</a></li>
              <li><a href="#shop" className="hover:text-white">Shop</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Nairobi, Kenya</li>
              <li>hello@vaginaworldshop.com</li>
              <li>+254 7xx xxx xxx</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Stay Close</p>
            <p className="mt-4 text-sm text-white/70">
              Get updates on new drops and workshop dates.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                placeholder="Email address"
              />
              <button className="rounded-full bg-vw-rose px-5 py-3 text-sm font-semibold text-black hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/40">
          © {new Date().getFullYear()} The Vagina Worldshop. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
