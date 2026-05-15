"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type WorkshopFormValues = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  imageUrl: string;
  bookingUrl: string;
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
  bookingUrl: "",
  isPublished: true,
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string[];
  children: React.ReactNode;
}) {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<WorkshopFormValues>(initialValues ?? emptyValues);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.imageUrl ?? null);

  function updateField<K extends keyof WorkshopFormValues>(key: K, value: WorkshopFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setIsUploading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setUploadError(body?.error ?? "Upload failed. Please try again.");
      setPreviewUrl(null);
      URL.revokeObjectURL(objectUrl);
      return;
    }

    const { url } = await response.json();
    updateField("imageUrl", url);
    URL.revokeObjectURL(objectUrl);
    setPreviewUrl(url);
  }

  function handleRemoveImage() {
    updateField("imageUrl", "");
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      bookingUrl: values.bookingUrl.trim(),
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
      if (body?.issues?.fieldErrors) setFieldErrors(body.issues.fieldErrors);
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
        <h3 className="border-b border-white/8 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
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
        <h3 className="border-b border-white/8 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
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
        <h3 className="border-b border-white/8 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          Media & Publishing
        </h3>

        {/* Image upload */}
        <div className="space-y-3">
          <label className="block text-xs font-medium uppercase tracking-[0.15em] text-white/50">
            Workshop Image
          </label>

          {/* Preview */}
          {previewUrl ? (
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div className="relative h-48 w-full">
                {/* Plain img — handles blob:, https://, and relative paths without Next.js optimization */}
                <img
                  src={previewUrl}
                  alt="Workshop image preview"
                  className="h-full w-full object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <p className="text-sm text-white/80">Uploading...</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <p className="truncate text-xs text-white/40">{values.imageUrl || "Uploading…"}</p>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploading || isLoading}
                  className="ml-4 shrink-0 rounded-lg border border-rose-400/20 px-3 py-1 text-xs font-medium text-rose-400/70 transition hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isUploading}
              className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/20 px-6 py-8 text-center transition hover:border-white/30 hover:bg-black/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-2xl opacity-40">↑</span>
              <span className="text-sm font-medium text-white/60">
                Upload from device
              </span>
              <span className="text-xs text-white/30">JPEG, PNG, WebP or GIF · max 5 MB</span>
            </button>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadError ? (
            <p className="text-xs text-rose-300">{uploadError}</p>
          ) : null}

          {/* Manual URL fallback */}
          <details className="group">
            <summary className="cursor-pointer text-xs text-white/30 hover:text-white/60 transition select-none">
              Or enter an image URL manually
            </summary>
            <div className="mt-2">
              <input
                value={values.imageUrl}
                onChange={(e) => {
                  updateField("imageUrl", e.target.value);
                  setPreviewUrl(e.target.value || null);
                }}
                className={inputClass}
                placeholder="https://example.com/image.jpg or /workshops/image.jpg"
                disabled={isLoading}
              />
              {fieldErrors.imageUrl ? (
                <p className="mt-1 text-xs text-rose-300">{fieldErrors.imageUrl.join(", ")}</p>
              ) : null}
            </div>
          </details>
        </div>

        {/* Booking URL */}
        <Field label="Booking URL" error={fieldErrors.bookingUrl}>
          <input
            value={values.bookingUrl}
            onChange={(e) => updateField("bookingUrl", e.target.value)}
            className={inputClass}
            placeholder="https://vaginaworldshop.hustlesasa.shop/"
            disabled={isLoading}
            type="url"
          />
          <p className="text-xs text-white/30">
            Link shown on the "Book Now" button. Leave blank to hide the button.
          </p>
        </Field>

        {/* Published toggle */}
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

      {/* Actions — sticky so they stay visible on long forms */}
      <div className="sticky bottom-4 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d0a18]/90 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <button
          type="submit"
          disabled={isLoading || isUploading}
          style={{ background: "var(--vw-hot-pink)" }}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Saving..." : workshopId ? "Update Workshop" : "Create Workshop"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/workshops")}
          disabled={isLoading}
          className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/40 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>
        {isUploading && (
          <span className="ml-2 text-xs text-white/40">Uploading image…</span>
        )}
      </div>
    </form>
  );
}
