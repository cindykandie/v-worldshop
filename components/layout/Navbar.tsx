"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { GlowMenuItem } from "@/components/ui/GlowMenu";
import { motion } from "framer-motion";

const menuItems: GlowMenuItem[] = [
  {
    label: "Home",
    href: "#",
    gradient:
      "radial-gradient(circle, rgba(255,74,209,0.35) 0%, rgba(255,47,168,0.12) 45%, rgba(8,6,15,0) 70%)",
  },
  {
    label: "About",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(124,59,255,0.3) 0%, rgba(124,59,255,0.12) 45%, rgba(8,6,15,0) 70%)",
  },
  {
    label: "Workshops",
    href: "#events",
    gradient:
      "radial-gradient(circle, rgba(255,61,189,0.35) 0%, rgba(255,61,189,0.12) 45%, rgba(8,6,15,0) 70%)",
  },
  {
    label: "Shop",
    href: "#shop",
    gradient:
      "radial-gradient(circle, rgba(246,183,201,0.45) 0%, rgba(246,183,201,0.18) 45%, rgba(8,6,15,0) 70%)",
  },
  {
    label: "Stories",
    href: "#testimonials",
    gradient:
      "radial-gradient(circle, rgba(195,20,138,0.4) 0%, rgba(195,20,138,0.14) 45%, rgba(8,6,15,0) 70%)",
  },
  {
    label: "Community",
    href: "#newsletter",
    gradient:
      "radial-gradient(circle, rgba(202,163,216,0.4) 0%, rgba(202,163,216,0.16) 45%, rgba(8,6,15,0) 70%)",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 transition ${
        scrolled ? "bg-black/80 backdrop-blur" : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-3">
          <Logo width={44} height={44} priority className="rounded-full" />
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
            Vagina Worldshop
          </span>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {menuOpen ? (
        <Container className="pb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl"
          >
            <div className="grid gap-3 text-sm text-white/80 max-w-[400] mx-auto">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.label);
                    setMenuOpen(false);
                  }}
                  className="group relative rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100"
                    style={{ background: item.gradient }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </div>
            <div className="mt-4 max-w-[400] mx-auto">
              <Button className="w-full">Join the Circle</Button>
            </div>
          </motion.div>
        </Container>
      ) : null}
    </header>
  );
}
