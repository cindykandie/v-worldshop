"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const links = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Pages", href: "#pages" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Logo width={44} height={44} priority className="rounded-full" />
          <span className="text-lg font-semibold tracking-wide text-white">
            Vagina Worldshop
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-vw-neon-violet to-vw-neon-pink text-white">
            Get Started
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white md:hidden"
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
        <Container className="pb-4 md:hidden">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
            <div className="grid gap-3 text-sm text-white/80">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <Button className="w-full bg-gradient-to-r from-vw-neon-violet to-vw-neon-pink text-white">
                Get Started
              </Button>
            </div>
          </div>
        </Container>
      ) : null}
    </header>
  );
}
