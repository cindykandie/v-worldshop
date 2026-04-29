import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, published, unpublished, nextWorkshop, recent] = await Promise.all([
    prisma.workshop.count(),
    prisma.workshop.count({ where: { isPublished: true } }),
    prisma.workshop.count({ where: { isPublished: false } }),
    prisma.workshop.findFirst({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
    }),
    prisma.workshop.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Total", value: total, accent: false },
    { label: "Published", value: published, accent: true },
    { label: "Drafts", value: unpublished, accent: false },
    {
      label: "Next session",
      value: nextWorkshop ? formatDate(nextWorkshop.date) : "—",
      accent: false,
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-white/50">Overview of your workshop schedule.</p>
          </div>
          <Link
            href="/admin/workshops/new"
            className="rounded-lg bg-vw-hot-pink px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 active:scale-[0.98]"
          >
            + New Workshop
          </Link>
        </div>

        {total === 0 ? (
          <div className="rounded-xl border border-white/8 bg-black/20 px-6 py-12 text-center">
            <p className="text-sm text-white/60">No workshops yet.</p>
            <p className="mt-1 text-xs text-white/30">Create your first session to activate the schedule.</p>
            <Link
              href="/admin/workshops/new"
              className="mt-5 inline-block rounded-lg bg-vw-hot-pink px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Add Workshop
            </Link>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border p-4 ${
                    stat.accent
                      ? "border-vw-hot-pink/20 bg-vw-hot-pink/5"
                      : "border-white/8 bg-black/20"
                  }`}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                    {stat.label}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-semibold ${
                      stat.accent ? "text-vw-hot-pink" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent workshops */}
            <div className="rounded-xl border border-white/8 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-sm font-semibold text-white">Recent Workshops</h2>
                <Link
                  href="/admin/workshops"
                  className="text-xs font-medium text-white/40 transition hover:text-white/80"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-2">
                {recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/8 bg-black/25 px-4 py-3 transition hover:border-white/12"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/40">{formatDate(item.date)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          item.isPublished
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/8 text-white/40"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                      <Link
                        href={`/admin/workshops/${item.id}`}
                        className="rounded-lg border border-white/12 px-3 py-1 text-xs font-medium text-white/50 transition hover:text-white"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
