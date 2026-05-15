import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import WorkshopList from "@/components/admin/WorkshopList";

export default function AdminWorkshopsPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Workshops</h1>
            <p className="mt-2 text-sm text-white/70">
              Manage upcoming sessions and publication status.
            </p>
          </div>
          <Link
            href="/admin/workshops/new"
            className="rounded-full bg-vw-hot-pink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            New Workshop
          </Link>
        </div>

        <WorkshopList />
      </div>
    </AdminShell>
  );
}
