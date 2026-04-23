"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

export interface GlowMenuItem {
  label: string;
  href: string;
  gradient: string;
  accentClass?: string;
}

type GlowMenuProps = HTMLMotionProps<"nav"> & {
  items: GlowMenuItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.85 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      scale: { duration: 0.55, type: "spring" as const, stiffness: 220, damping: 22 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export const GlowMenu = forwardRef<HTMLElement, GlowMenuProps>(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-2 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,209,0.25),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(124,59,255,0.2),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(255,47,168,0.2),transparent_60%)]"
          variants={navGlowVariants}
        />
        <ul className="relative z-10 flex items-center gap-2">
          {items.map((item) => {
            const isActive = item.label === activeItem;

            return (
              <li key={item.label}>
                <motion.a
                  href={item.href}
                  onClick={() => onItemClick?.(item.label)}
                  className={cn(
                    "group relative flex items-center rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-colors",
                    isActive ? "text-white" : "text-white/65 hover:text-white",
                  )}
                  style={{ perspective: "600px" }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <motion.span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{ background: item.gradient }}
                  />
                  <span
                    className={cn(
                      "absolute inset-0 -z-20 rounded-xl border border-white/10 transition",
                      isActive ? "border-white/30" : "group-hover:border-white/20",
                    )}
                  />
                  <span
                    className={cn(
                      "relative",
                      item.accentClass,
                      isActive ? "opacity-100" : "opacity-85",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-vw-hot-pink via-vw-neon-violet to-vw-electric-pink transition duration-300 group-hover:scale-x-100" />
                </motion.a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    );
  },
);

GlowMenu.displayName = "GlowMenu";
