"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-vw-night text-white">
      <div className="absolute inset-0 vw-neon-hero" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(140deg,rgba(255,255,255,0.08),rgba(104, 4, 155, 0)_40%),linear-gradient(180deg,rgba(255,61,189,0.3),rgba(69, 4, 48, 0)70%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-vw-neon-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-vw-neon-blue/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-35%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-vw-neon-pink/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-24 pt-8">

        <div className="relative mt-12 flex flex-1 items-center justify-center">
          <div className="absolute -top-6 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-vw-neon-pink shadow-[0_0_18px_rgba(255,61,189,0.9)]" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex w-full flex-col items-center text-center"
          >
            <div className="relative h-[22rem] w-[15rem] sm:h-[28rem] sm:w-[19rem]">
              <Image
                src="/dancelogo.jpg"
                alt="Hero dancer placeholder"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
            </div>

            <h1 className="mt-6 text-[3.5rem] font-black uppercase tracking-[0.18em] md:text-[5rem]">
              <span>THE</span>
              <span className="mx-2 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)]">
                VAGINA
              </span>
              <br></br>
              <span>WORLDSHOP</span>
            </h1>

            <div className="mt-6">
              <Button
                className="rounded-none border border-white/60 bg-white/10 px-10 py-3 uppercase tracking-[0.3em] text-white backdrop-blur"
              >
                Join Classes
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            { title: "Swing Beat", note: "Fog Simulation" },
            { title: "Dance Steps", note: "Fog Simulation" },
            { title: "Flow Vibes", note: "Fog Simulation" },
          ].map((card, index) => (
            <div
              key={card.title}
              className={`flex w-56 items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur ${
                index === 0 ? "shadow-[0_0_30px_rgba(255,61,189,0.35)]" : ""
              }`}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/10">
                <Image
                  src="/mainlogo.jpg"
                  alt={`${card.title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">
                  {card.title}
                </p>
                <p className="text-[11px] text-white/60">{card.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
