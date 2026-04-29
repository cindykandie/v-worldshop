import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-vw-obsidian font-ui text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col border-r border-white/8 bg-black/50 lg:flex">
          {/* Hot-pink top accent */}
          <div className="h-0.5 bg-gradient-to-r from-vw-hot-pink via-vw-magenta to-transparent" />

          <div className="flex flex-1 flex-col p-5">
            {/* Brand */}
            <div className="pb-5 border-b border-white/8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Admin Portal
              </p>
              <p className="mt-1 text-sm font-semibold text-white leading-snug">
                Vagina Worldshop
              </p>
            </div>

            <AdminNav />

            {/* Footer spacer */}
            <div className="mt-auto pt-5 border-t border-white/8">
              <p className="text-[11px] text-white/30">
                {session.user.email}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <header className="flex items-center justify-between border-b border-white/8 bg-black/30 px-6 py-3.5">
            <div className="flex items-center gap-3">
              {/* Mobile brand */}
              <span className="text-sm font-semibold text-white lg:hidden">
                Admin
              </span>
              <div className="hidden lg:block">
                <p className="text-xs text-white/40 font-medium">
                  Welcome back,{" "}
                  <span className="text-white/80">{session.user.name}</span>
                </p>
              </div>
            </div>
            <LogoutButton />
          </header>

          <main className="flex-1 p-5 lg:p-8">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
