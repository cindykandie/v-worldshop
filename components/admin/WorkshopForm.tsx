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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          Title
          <input
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="Twerk Out: Power & Pulse"
            disabled={isLoading}
            required
          />
          {fieldErrors.title ? (
            <p className="text-xs text-rose-300">{fieldErrors.title.join(", ")}</p>
          ) : null}
        </label>
        <label className="space-y-2 text-sm text-white/80">
          Location
          <input
            value={values.location}
            onChange={(event) => updateField("location", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="Nairobi Dance Loft"
            disabled={isLoading}
            required
          />
          {fieldErrors.location ? (
            <p className="text-xs text-rose-300">{fieldErrors.location.join(", ")}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/80">
        Description
        <textarea
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="min-h-[140px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
          placeholder="Describe the session..."
          disabled={isLoading}
          required
        />
        {fieldErrors.description ? (
          <p className="text-xs text-rose-300">{fieldErrors.description.join(", ")}</p>
        ) : null}
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-white/80">
          Date
          <input
            type="date"
            value={values.date}
            onChange={(event) => updateField("date", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
            disabled={isLoading}
            required
          />
          {fieldErrors.date ? (
            <p className="text-xs text-rose-300">{fieldErrors.date.join(", ")}</p>
          ) : null}
        </label>
        <label className="space-y-2 text-sm text-white/80">
          Time
          <input
            value={values.time}
            onChange={(event) => updateField("time", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="6:30 PM - 8:00 PM"
            disabled={isLoading}
            required
          />
          {fieldErrors.time ? (
            <p className="text-xs text-rose-300">{fieldErrors.time.join(", ")}</p>
          ) : null}
        </label>
        <label className="space-y-2 text-sm text-white/80">
          Price (KES)
          <input
            type="number"
            min={0}
            value={values.price}
            onChange={(event) => updateField("price", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="2500"
            disabled={isLoading}
            required
          />
          {fieldErrors.price ? (
            <p className="text-xs text-rose-300">{fieldErrors.price.join(", ")}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/80">
        Image URL (optional)
        <input
          value={values.imageUrl}
          onChange={(event) => updateField("imageUrl", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-vw-hot-pink/60 focus:outline-none"
          placeholder="https://example.com/workshops/twerk-out.jpg"
          disabled={isLoading}
        />
        <p className="text-xs text-white/50">Use a full URL or leave blank.</p>
        {fieldErrors.imageUrl ? (
          <p className="text-xs text-rose-300">{fieldErrors.imageUrl.join(", ")}</p>
        ) : null}
      </label>

      <label className="flex items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          checked={values.isPublished}
          onChange={(event) => updateField("isPublished", event.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-black/40 text-vw-hot-pink"
          disabled={isLoading}
        />
        Published
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-vw-hot-pink px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Saving..." : workshopId ? "Update Workshop" : "Create Workshop"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/workshops")}
          className="rounded-xl border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
