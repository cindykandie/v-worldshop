"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Auto-play when modal opens, pause/reset when closed
  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (modalOpen) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [modalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  function handleSectionMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleSectionMouseLeave() {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(rect.width / 2);
    y.set(rect.height / 2);
  }

  return (
    <>
      <section
        className="relative overflow-hidden bg-vw-obsidian py-10 text-white"
        onMouseMove={handleSectionMouseMove}
        onMouseLeave={handleSectionMouseLeave}
      >
        {/* Background layers */}
        <div ref={sectionRef} className="absolute inset-0">
          <div className="absolute inset-0 vw-hero-bg" />
          <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(140deg,rgba(255,255,255,0.08),rgba(104,4,155,0)_45%),linear-gradient(180deg,rgba(255,61,189,0.28),rgba(69,4,48,0)_70%)]" />
          <div className="pointer-events-none absolute left-[-12%] top-[20%] h-[26rem] w-[26rem] animate-vw-float rounded-full bg-vw-electric-pink/40 blur-3xl" />
          <div className="pointer-events-none absolute right-[-10%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-vw-neon-violet/35 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-35%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 animate-vw-pulse rounded-full bg-vw-hot-pink/35 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-2 sm:pt-10 lg:pt-20">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">

            {/* Text */}
            <Stagger className="flex flex-1 flex-col items-start text-left">
              <StaggerItem>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  The Vagina Worldshop
                </span>
              </StaggerItem>

              <StaggerItem>
                <h1 className="mt-5 text-[2.4rem] font-semibold uppercase leading-[0.95] tracking-[0.1em] text-white sm:text-[3.4rem] lg:text-[4.4rem]">
                  A glowing world of
                  <span className="block text-vw-hot-pink drop-shadow-[0_0_12px_rgba(255,74,209,0.35)]">
                    feminine movement
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
                  Immerse in dance, embodiment, and community. This is a soft,
                  magnetic space for exploration, expression, and gentle power.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Button href="https://vaginaworldshop.hustlesasa.shop/">Join Classes</Button>
                  <Button href="https://www.instagram.com/vaginaworldshop/" variant="ghost">
                    Enter the Community
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
                  <span>Safe space</span>
                  <span>Artful rituals</span>
                  <span>Body-positive</span>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Thumbnail + play button */}
            <Stagger className="flex w-full lg:flex-1 lg:justify-center">
              <StaggerItem className="w-full lg:w-auto">
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="group relative mx-auto block h-[22rem] w-full max-w-[20rem] cursor-pointer sm:h-[28rem] sm:max-w-[22rem] lg:h-[32rem] lg:max-w-[22rem]"
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  aria-label="Watch a sneak peek"
                >
                  {/* Video first-frame preview */}
                  <video
                    src="/danceclass.MOV#t=0.1"
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full rounded-[2.8rem] object-cover opacity-90 shadow-[0_20px_80px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 rounded-[2.8rem] bg-black/20 transition-colors duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-b from-transparent via-transparent to-black/60" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-vw-hot-pink/80 group-hover:border-vw-hot-pink">
                      <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-white" aria-hidden>
                        <path d="M8 5l11 7-11 7V5z" />
                      </svg>
                    </div>
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                      Sneak peek
                    </span>
                  </div>

                  {/* Glows */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-vw-electric-pink/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-vw-neon-violet/35 blur-3xl" />
                </motion.button>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Modal content */}
            <motion.div
              key="modal-content"
              className="relative z-10 w-full max-w-3xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-sm transition hover:text-white"
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>

              {/* Label */}
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/40">
                Sneak peek · The Vagina Worldshop
              </p>

              {/* Video */}
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
                <video
                  ref={modalVideoRef}
                  src="/danceclass.MOV"
                  controls
                  playsInline
                  muted
                  preload="auto"
                  className="w-full"
                />
              </div>

              <p className="mt-3 text-center text-xs text-white/30">
                Press <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono">Esc</kbd> or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
