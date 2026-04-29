"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type WorkshopFormValues = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  imageUrl: string;
  isPublished: boolean;
};

type WorkshopFormProps = {
  initialValues?: WorkshopFormValues;
  workshopId?: string;
};

const emptyValues: WorkshopFormValues = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  price: "",
  imageUrl: "",
  isPublished: true,
};

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium uppercase tracking-[0.15em] text-white/50">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-rose-300">{error.join(", ")}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-vw-hot-pink/50 focus:outline-none focus:ring-1 focus:ring-vw-hot-pink/20 transition disabled:opacity-50";

export default function WorkshopForm({ initialValues, workshopId }: WorkshopFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<WorkshopFormValues>(initialValues ?? emptyValues);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  function updateField<K extends keyof WorkshopFormValues>(key: K, value: WorkshopFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsLoading(true);

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      date: values.date ? new Date(values.date).toISOString() : values.date,
      time: values.time.trim(),
      location: values.location.trim(),
      price: Number(values.price),
      imageUrl: values.imageUrl.trim(),
      isPublished: values.isPublished,
    };

    const response = await fetch(
      workshopId ? `/api/workshops/${workshopId}` : "/api/workshops",
      {
        method: workshopId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setIsLoading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      if (body?.issues?.fieldErrors) {
        setFieldErrors(body.issues.fieldErrors);
      }
      setError(body?.error ?? "Something went wrong. Please check the form and try again.");
      return;
    }

    router.push("/admin/workshops");
    router.refresh();
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Basic info */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 pb-2 border-b border-white/8">
          Basic Info
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" error={fieldErrors.title}>
            <input
              value={values.title}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="Twerk Out: Power & Pulse"
              disabled={isLoading}
              required
            />
          </Field>
          <Field label="Location" error={fieldErrors.location}>
            <input
              value={values.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={inputClass}
              placeholder="Nairobi Dance Loft"
              disabled={isLoading}
              required
            />
          </Field>
        </div>
        <Field label="Description" error={fieldErrors.description}>
          <textarea
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            className={`${inputClass} min-h-[120px] resize-y`}
            placeholder="Describe the session..."
            disabled={isLoading}
            required
          />
        </Field>
      </section>

      {/* Schedule & pricing */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 pb-2 border-b border-white/8">
          Schedule & Pricing
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Date" error={fieldErrors.date}>
            <input
              type="date"
              value={values.date}
              onChange={(e) => updateField("date", e.target.value)}
              className={inputClass}
              disabled={isLoading}
              required
            />
          </Field>
          <Field label="Time" error={fieldErrors.time}>
            <input
              value={values.time}
              onChange={(e) => updateField("time", e.target.value)}
              className={inputClass}
              placeholder="6:30 PM – 8:00 PM"
              disabled={isLoading}
              required
            />
          </Field>
          <Field label="Price (KES)" error={fieldErrors.price}>
            <input
              type="number"
              min={0}
              value={values.price}
              onChange={(e) => updateField("price", e.target.value)}
              className={inputClass}
              placeholder="2500"
              disabled={isLoading}
              required
            />
          </Field>
        </div>
      </section>

      {/* Media & publishing */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 pb-2 border-b border-white/8">
          Media & Publishing
        </h3>
        <Field label="Image URL (optional)" error={fieldErrors.imageUrl}>
          <input
            value={values.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            className={inputClass}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/8 bg-black/20 px-4 py-3 transition hover:bg-black/30">
          <input
            type="checkbox"
            checked={values.isPublished}
            onChange={(e) => updateField("isPublished", e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-black/40 accent-vw-hot-pink"
            disabled={isLoading}
          />
          <div>
            <p className="text-sm font-medium text-white">Published</p>
            <p className="text-xs text-white/40">Visible to visitors on the public site</p>
          </div>
        </label>
      </section>

      {error ? (
        <div className="rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 py-3">
          <p className="text-sm text-rose-300">{error}</p>
        </div>
      ) : null}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-vw-hot-pink px-6 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Saving..." : workshopId ? "Update Workshop" : "Create Workshop"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/workshops")}
          disabled={isLoading}
          className="rounded-lg border border-white/12 px-6 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/25 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
