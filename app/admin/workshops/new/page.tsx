import AdminShell from "@/components/admin/AdminShell";
import WorkshopForm from "@/components/admin/WorkshopForm";

export default function NewWorkshopPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Create Workshop</h1>
          <p className="mt-2 text-sm text-white/70">
            Add a new session to the schedule.
          </p>
        </div>

        <WorkshopForm />
      </div>
    </AdminShell>
  );
}
