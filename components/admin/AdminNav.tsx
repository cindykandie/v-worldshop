"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", exact: true },
  { label: "Workshops", href: "/admin/workshops" },
  { label: "Stories", href: "/admin/stories" },
  { label: "Subscribers", href: "/admin/subscribers" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-vw-hot-pink/15 text-vw-hot-pink border border-vw-hot-pink/20"
                : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            {label(item.label)}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function label(name: string) {
  const icons: Record<string, string> = {
    Dashboard: "▣",
    Workshops: "◈",
    Stories: "◎",
    Subscribers: "◉",
  };
  return (
    <span className="text-[10px] opacity-60">{icons[name] ?? "·"}</span>
  );
}
