import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import WorkshopForm from "@/components/admin/WorkshopForm";

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function EditWorkshopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workshop = await prisma.workshop.findUnique({
    where: { id },
  });

  if (!workshop) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Edit Workshop</h1>
          <p className="mt-2 text-sm text-white/70">Update session details.</p>
        </div>

        <WorkshopForm
          workshopId={workshop.id}
          initialValues={{
            title: workshop.title,
            description: workshop.description,
            date: toDateInput(workshop.date),
            time: workshop.time,
            location: workshop.location,
            price: String(workshop.price),
            imageUrl: workshop.imageUrl ?? "",
            bookingUrl: workshop.bookingUrl ?? "",
            isPublished: workshop.isPublished,
          }}
        />
      </div>
    </AdminShell>
  );
}
