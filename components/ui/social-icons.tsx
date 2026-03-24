"use client";

import { useState } from "react";
import { Music2 } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/vaginaworldshop/",
    icon: <InstagramIcon className="size-[18px]" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@_vaginaworldshop",
    icon: <Music2 className="size-[18px]" />,
  },
];

export function SocialIcons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-center gap-0.5 rounded-2xl border border-white/[0.08] bg-neutral-950 px-1.5 py-1.5">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />

      {socials.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex size-10 items-center justify-center rounded-xl transition-colors duration-200"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={social.name}
        >
          <span
            className={`absolute inset-1 rounded-lg bg-white/[0.08] transition-all duration-300 ease-out ${
              hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />

          <span
            className={`relative z-10 transition-all duration-300 ease-out ${
              hoveredIndex === index ? "text-white scale-110" : "text-neutral-500"
            }`}
          >
            {social.icon}
          </span>

          <span
            className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
              hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
            }`}
          />

          <span
            className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-950 transition-all duration-300 ease-out ${
              hoveredIndex === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            {social.name}
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-white" />
          </span>
        </a>
      ))}
    </div>
  );
}
