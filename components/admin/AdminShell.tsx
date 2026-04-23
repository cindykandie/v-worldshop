import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Workshops", href: "/admin/workshops" },
  { label: "Stories", href: "/admin/stories" },
  { label: "Subscribers", href: "/admin/subscribers" },
];

export default async function AdminShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-vw-obsidian text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-black/40 p-6 lg:flex">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            The Vagina Worldshop
          </div>
          <div className="mt-3 text-lg font-semibold text-white">Admin Portal</div>

          <nav className="mt-10 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-transparent px-4 py-2 text-sm text-white/70 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Welcome back</p>
              <p className="text-lg font-semibold text-white">{session.user.name}</p>
            </div>
            <LogoutButton />
          </header>

          <main className="flex-1 p-6 lg:p-10">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
