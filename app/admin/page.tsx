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

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-white/70">
            Quick overview of the workshop schedule.
          </p>
        </div>

        {total === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm text-white/70">
              No workshops yet. Create your first session to activate the schedule.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/admin/workshops/new"
                className="rounded-full bg-vw-hot-pink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black"
              >
                Add Workshop
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Workshops", value: total },
                { label: "Published", value: published },
                { label: "Unpublished", value: unpublished },
                {
                  label: "Next Workshop",
                  value: nextWorkshop ? formatDate(nextWorkshop.date) : "No upcoming",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Recent Workshops</h2>
                <Link
                  href="/admin/workshops"
                  className="text-xs uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
                >
                  View all
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                        {formatDate(item.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                      <Link
                        href={`/admin/workshops/${item.id}`}
                        className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
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

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/workshops/new"
            className="rounded-full bg-vw-hot-pink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black"
          >
            Add Workshop
          </Link>
          <Link
            href="/admin/workshops"
            className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
          >
            Manage Workshops
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
