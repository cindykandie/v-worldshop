import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Workshops", href: "#workshops" },
  { label: "Shop", href: "#shop" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Logo width={52} height={52} priority />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">The Vagina</p>
            <p className="text-xs text-white/70">Worldshop</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/75 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" href="#workshops" className="hidden sm:inline-flex">
            View Sessions
          </Button>
          <Button href="#shop">Shop</Button>
        </div>
      </Container>
    </header>
  );
}
