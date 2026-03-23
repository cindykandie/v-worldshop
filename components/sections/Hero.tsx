"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(260px at ${smoothX}px ${smoothY}px, rgba(255, 74, 209, 0.35), rgba(10, 7, 18, 0) 70%)`;

  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);
  }, [x, y]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-vw-obsidian text-white"
      onMouseMove={(event) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onMouseLeave={() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(rect.width / 2);
        y.set(rect.height / 2);
      }}
    >
      <div ref={sectionRef} className="absolute inset-0">
        <div className="absolute inset-0 vw-hero-bg" />
        <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(140deg,rgba(255,255,255,0.08),rgba(104,4,155,0)_45%),linear-gradient(180deg,rgba(255,61,189,0.28),rgba(69,4,48,0)70%)]" />
        <div className="pointer-events-none absolute left-[-12%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-vw-electric-pink/40 blur-3xl animate-vw-float" />
        <div className="pointer-events-none absolute right-[-10%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-vw-neon-violet/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-35%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-vw-hot-pink/35 blur-3xl animate-vw-pulse" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-20 pt-12">
        <div className="mt-10 flex flex-1 items-center justify-between gap-12 lg:mt-16 lg:flex-row">
          <Stagger className="flex flex-1 flex-col items-start">
            <StaggerItem>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                The Vagina Worldshop
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-6 text-[3.2rem] font-semibold uppercase leading-[0.95] tracking-[0.12em] text-white sm:text-[4.4rem]">
                A glowing world of
                <span className="block bg-gradient-to-r from-vw-electric-pink via-vw-neon-violet to-vw-hot-pink bg-clip-text text-transparent">
                  feminine movement
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                Immerse in dance, embodiment, and community. This is a soft,
                magnetic space for exploration, expression, and gentle power.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#events">Join Classes</Button>
                <Button href="#newsletter" variant="ghost">
                  Enter the Community
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
                <span>Safe space</span>
                <span>Artful rituals</span>
                <span>Body-positive</span>
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger className="relative flex flex-1 items-center justify-center">
            <StaggerItem className="relative">
              <div className="relative h-[22rem] w-[16rem] sm:h-[28rem] sm:w-[20rem]">
                <Image
                  src="/dancelogo.jpg"
                  alt="Hero dancer"
                  fill
                  className="rounded-[2.8rem] object-cover opacity-95 shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                />
                <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-vw-electric-pink/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-vw-neon-violet/35 blur-3xl" />
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
