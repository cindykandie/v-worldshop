"use client";

import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function Hero() {
  return (
    <section className="vw-hero-bg relative overflow-hidden">
      {/* soft background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-200 blur-3xl opacity-70" />
        <div className="absolute top-24 -right-24 h-96 w-96 rounded-full bg-purple-200 blur-3xl opacity-70" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-fuchsia-200 blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
        >
          A playful art-world celebrating{" "}
          <span className="text-vw-plum">feminine power</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-zinc-700"
        >
          Community, workshops, and beautiful objects — safe, celebratory, expressive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <button className="rounded-full bg-vw-plum px-6 py-3 text-white transition hover:opacity-90">
            Explore the Shop
          </button>
          <button className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-zinc-900 transition hover:bg-zinc-50">
            View Workshops
          </button>
        </motion.div>
      </div>
    </section>
  );
}
