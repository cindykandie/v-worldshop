"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Workshop = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  isPublished: boolean;
  updatedAt: string;
};

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/workshops", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch workshops");
      const data = (await response.json()) as Workshop[];
      const sorted = [...data].sort((a, b) => {
        const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
      setWorkshops(sorted);
    } catch {
      setError("Unable to load workshops.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this workshop? This cannot be undone.");
    if (!confirmed) return;

    setBusyId(id);
    const response = await fetch(`/api/workshops/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!response.ok) {
      setError("Unable to delete workshop.");
      return;
    }

    setWorkshops((prev) => prev.filter((item) => item.id !== id));
    setNotice("Workshop deleted.");
  }

  async function handleTogglePublish(workshop: Workshop) {
    setBusyId(workshop.id);
    const response = await fetch(`/api/workshops/${workshop.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !workshop.isPublished }),
    });
    setBusyId(null);

    if (!response.ok) {
      setError("Unable to update publish status.");
      return;
    }

    setWorkshops((prev) =>
      prev.map((item) =>
        item.id === workshop.id ? { ...item, isPublished: !item.isPublished } : item
      )
    );
    setNotice(workshop.isPublished ? "Workshop unpublished." : "Workshop published.");
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-rose-300">{error}</p>
          <button
            type="button"
            onClick={load}
            className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:text-rose-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="rounded-xl border border-white/8 bg-black/20 px-6 py-10 text-center">
        <p className="text-sm text-white/50">No workshops yet.</p>
        <p className="mt-1 text-xs text-white/30">Create the first session to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notice ? (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {notice}
        </div>
      ) : null}

      {/* Column headers */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4 px-4 pb-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">Workshop</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">Status</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">Price</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">Actions</p>
      </div>

      {workshops.map((workshop) => {
        const dateLabel = new Date(workshop.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const isBusy = busyId === workshop.id;

        return (
          <div
            key={workshop.id}
            className="flex flex-col gap-4 rounded-xl border border-white/8 bg-black/25 px-4 py-4 transition hover:border-white/12 md:grid md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4"
          >
            {/* Info */}
            <div>
              <p className="text-sm font-semibold text-white leading-snug">{workshop.title}</p>
              <p className="mt-1 text-xs text-white/50">
                {dateLabel} · {workshop.time} · {workshop.location}
              </p>
            </div>

            {/* Status badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                workshop.isPublished
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-400/20"
                  : "bg-white/8 text-white/50 border border-white/10"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  workshop.isPublished ? "bg-emerald-400" : "bg-white/40"
                }`}
              />
              {workshop.isPublished ? "Published" : "Draft"}
            </span>

            {/* Price */}
            <p className="text-sm font-semibold text-vw-hot-pink">
              KES {workshop.price.toLocaleString()}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleTogglePublish(workshop)}
                disabled={isBusy}
                className="rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {workshop.isPublished ? "Unpublish" : "Publish"}
              </button>
              <Link
                href={`/admin/workshops/${workshop.id}`}
                className="rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:border-white/25 hover:text-white"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(workshop.id)}
                disabled={isBusy}
                className="rounded-lg border border-rose-400/20 px-3 py-1.5 text-xs font-medium text-rose-400/70 transition hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
