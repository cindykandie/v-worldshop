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
    } catch (err) {
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
    return <p className="text-sm text-white/70">Loading workshops...</p>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>{error}</span>
          <button
            type="button"
            onClick={load}
            className="rounded-full border border-rose-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200 transition hover:text-rose-100"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
        No workshops yet. Create the first one.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notice ? (
        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </div>
      ) : null}
      {workshops.map((workshop) => {
        const dateLabel = new Date(workshop.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const updatedLabel = new Date(workshop.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div
            key={workshop.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{workshop.title}</h3>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {workshop.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                {dateLabel} · {workshop.time} · {workshop.location}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                <span className="text-vw-hot-pink">KES {workshop.price}</span>
                <span>Updated {updatedLabel}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleTogglePublish(workshop)}
                disabled={busyId === workshop.id}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {workshop.isPublished ? "Unpublish" : "Publish"}
              </button>
              <Link
                href={`/admin/workshops/${workshop.id}`}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(workshop.id)}
                disabled={busyId === workshop.id}
                className="rounded-full border border-rose-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200 transition hover:text-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
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
