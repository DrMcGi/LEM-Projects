"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <div className="hero-scene-fallback" aria-hidden />,
  },
);

type Division = {
  name: string;
  status: string;
  description: string;
  href: string;
  cta: string;
  logoFile: string;
  logoPath: string | null;
  eyebrow: string;
  accent: "teal" | "amber" | "stone";
  promise: string;
};

type HoldingExperienceProps = {
  divisions: Division[];
  holdingLogoPath: string | null;
};

type MagneticLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

type MagneticAnchorProps = MagneticLinkProps & {
  target?: string;
  rel?: string;
};

type FilmPanel = {
  title: string;
  label: string;
  line: string;
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const accentStyles: Record<Division["accent"], { glow: string; chip: string; ring: string; edge: string }> = {
  teal: {
    glow: "from-teal-500/25 via-cyan-300/10 to-transparent",
    chip: "bg-teal-100 text-teal-700 border-teal-200",
    ring: "shadow-[0_0_0_1px_rgba(13,148,136,0.18),0_20px_45px_-30px_rgba(15,118,110,0.55)]",
    edge: "rgba(20,184,166,0.55)",
  },
  amber: {
    glow: "from-amber-400/25 via-orange-300/10 to-transparent",
    chip: "bg-amber-100 text-amber-700 border-amber-200",
    ring: "shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_20px_45px_-30px_rgba(245,158,11,0.55)]",
    edge: "rgba(245,158,11,0.52)",
  },
  stone: {
    glow: "from-stone-400/30 via-white/10 to-transparent",
    chip: "bg-stone-200 text-stone-700 border-stone-300",
    ring: "shadow-[0_0_0_1px_rgba(120,113,108,0.18),0_20px_45px_-30px_rgba(87,83,78,0.45)]",
    edge: "rgba(168,162,158,0.58)",
  },
};

const exactStory = [
  "LEM Holding is a dynamic powerhouse bringing together three strong divisions to deliver a seamless, end-to-end service experience.",
  "Through LEM Projects, we provide critical operational and strategic solutions that drive business performance.",
  "LEM Accommodation offers a reliable home away from home, ensuring comfort, convenience, and peace of mind.",
  "LEM Supply Enterprise focuses on the efficient delivery of essential goods, supporting everyday operational needs.",
  "Together, we form a true one-stop service provider, bridging expert solutions with practical, on-the-ground support.",
];

const audiencePoints = [
  "Businesses that need tailored, results-driven solutions.",
  "Individuals who rely on dependable service and quality support.",
  "One partner that can cover strategy, living, and supply.",
];

const filmPanels: FilmPanel[] = [
  {
    title: "LEM Projects",
    label: "Operational and strategic solutions",
    line: "Critical support that helps businesses move with purpose and performance.",
  },
  {
    title: "LEM Accommodation",
    label: "Reliable home away from home",
    line: "Comfort, convenience, and peace of mind in one dependable stay.",
  },
  {
    title: "LEM Supply Enterprise",
    label: "Essential goods and daily support",
    line: "Efficient delivery that keeps everyday operations running.",
  },
];

function MagneticLink({ href, label, variant = "primary", fullWidth = false }: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetLeft = event.clientX - bounds.left;
    const offsetTop = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${offsetLeft}px`);
    event.currentTarget.style.setProperty("--glow-y", `${offsetTop}px`);

    offsetX.set((offsetLeft / bounds.width - 0.5) * 14);
    offsetY.set((offsetTop / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className={fullWidth ? "flex w-full" : "inline-flex"}
    >
      <Link href={href} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </Link>
    </motion.div>
  );
}

function MagneticAnchor({ href, label, variant = "primary", target, rel }: MagneticAnchorProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetLeft = event.clientX - bounds.left;
    const offsetTop = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${offsetLeft}px`);
    event.currentTarget.style.setProperty("--glow-y", `${offsetTop}px`);

    offsetX.set((offsetLeft / bounds.width - 0.5) * 14);
    offsetY.set((offsetTop / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <a href={href} target={target} rel={rel} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </a>
    </motion.div>
  );
}

function DivisionCard({ division, index }: { division: Division; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useSpring(rotateY, { stiffness: 170, damping: 18, mass: 0.5 });
  const y = useSpring(rotateX, { stiffness: 170, damping: 18, mass: 0.5 });

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const percentX = offsetX / bounds.width - 0.5;
    const percentY = offsetY / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", `${offsetX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${offsetY}px`);

    rotateX.set(percentY * -10);
    rotateY.set(percentX * 12);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const accent = accentStyles[division.accent];
  const isLive = division.status === "Live";
  const launchChipClass = isLive ? "bg-emerald-100 text-emerald-700" : accentStyles.amber.chip;

  return (
    <motion.article
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.06 }}
      style={prefersReducedMotion ? undefined : { rotateX: y, rotateY: x }}
      whileHover={prefersReducedMotion ? undefined : { y: -12, scale: 1.018 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetRotation}
      className={`division-card group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 backdrop-blur-sm ${accent.ring}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} opacity-70`} />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-full bg-white/35 blur-2xl" />
      <div className="division-card-reflection" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/80 shadow-sm">
            {division.logoPath ? (
              <Image
                src={division.logoPath}
                alt={`${division.name} logo`}
                fill
                sizes="64px"
                className="object-contain p-2.5"
              />
            ) : (
              <span className="text-xs font-bold tracking-[0.16em] text-teal-800">LEM</span>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
              {division.eyebrow}
            </span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${launchChipClass}`}>
              {division.status}
            </span>
          </div>
        </div>

        <h3 className="min-h-[5.5rem] max-w-[14ch] text-3xl font-bold leading-tight text-stone-900">{division.name}</h3>
        <p className="mt-3 min-h-[4.5rem] text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{division.promise}</p>
        <p className="mt-5 min-h-28 text-base leading-relaxed text-stone-700">{division.description}</p>

        <div className="mt-auto pt-6">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.edge}, transparent)` }} />

          <div className="mt-6 flex min-h-7 items-center gap-3 text-xs uppercase tracking-[0.2em] text-stone-400">
            <span className="signal-dot" />
            <span>LEM network active</span>
          </div>

          {isLive ? (
            <div className="mt-6 w-full">
              <MagneticLink href={division.href} label={division.cta} fullWidth />
            </div>
          ) : (
            <span className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition duration-300 group-hover:border-amber-400 group-hover:bg-amber-100">
              {division.cta}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function SequenceCard({
  division,
  offset,
  isActive,
}: {
  division: Division;
  offset: number;
  isActive: boolean;
}) {
  const accent = accentStyles[division.accent];
  const statusChipClass = division.status === "Live" ? accent.chip : accentStyles.amber.chip;
  const states: Record<string, { x: string; y: number; scale: number; rotate: number; opacity: number; zIndex: number }> = {
    "-2": { x: "-22%", y: 28, scale: 0.82, rotate: -12, opacity: 0, zIndex: 0 },
    "-1": { x: "-18%", y: 16, scale: 0.88, rotate: -9, opacity: 0.46, zIndex: 1 },
    "0": { x: "0%", y: -10, scale: 1, rotate: 0, opacity: 1, zIndex: 3 },
    "1": { x: "18%", y: 16, scale: 0.88, rotate: 9, opacity: 0.46, zIndex: 1 },
    "2": { x: "22%", y: 28, scale: 0.82, rotate: 12, opacity: 0, zIndex: 0 },
  };
  const state = states[String(Math.max(-2, Math.min(2, offset)))] ?? states["2"];

  return (
    <motion.article
      animate={{
        x: state.x,
        y: state.y,
        scale: state.scale,
        rotateZ: state.rotate,
        opacity: state.opacity,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
      style={{ zIndex: state.zIndex }}
      className={`sequence-card ${isActive ? "sequence-card-active" : ""}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} opacity-65`} />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{division.eyebrow}</div>
          <h3 className="mt-4 text-2xl font-bold text-stone-900">{division.name}</h3>
          <p className="mt-4 text-base leading-relaxed text-stone-700">{division.description}</p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${statusChipClass}`}>
            {division.status}
          </span>
          <span className="text-sm font-semibold text-stone-500">{division.eyebrow}</span>
        </div>
      </div>
    </motion.article>
  );
}

function SequenceExperience({ divisions }: { divisions: Division[] }) {
  const sequenceRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = latest < 0.24 ? 0 : latest < 0.52 ? 1 : 2;
    setActiveIndex(nextIndex);
  });

  return (
    <section ref={sequenceRef} className="sequence-shell mt-16">
      <div className="sticky top-0 flex min-h-screen items-center py-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="sequence-stage">
            <div className="sequence-halo" aria-hidden />
            <div className="sequence-platform" />
            <div className="sequence-grid" aria-hidden />
            <div className="sequence-stage-glow" aria-hidden />

            {divisions.map((division, index) => (
              <SequenceCard
                key={division.name}
                division={division}
                offset={index - activeIndex}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerParent}
            className="min-w-0"
          >
            <motion.p variants={revealUp} className="text-xs uppercase tracking-[0.24em] text-teal-700">
              Signature motion moment
            </motion.p>
            <motion.h2 variants={revealUp} className="mt-4 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              From strategy to supply. From planning to living.
            </motion.h2>
            <motion.p variants={revealUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">
              Together, we form a true one-stop service provider, bridging expert solutions with practical, on-the-ground support.
            </motion.p>

            <motion.div variants={revealUp} className="mt-8 rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_28px_70px_-44px_rgba(0,0,0,0.32)] backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.22em] text-stone-500">Current division</div>
              <h3 className="mt-4 text-3xl font-bold text-stone-900">{divisions[activeIndex].name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-stone-700">{divisions[activeIndex].description}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                {divisions[activeIndex].promise}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CommandCenter({ divisions }: { divisions: Division[] }) {
  const [activeName, setActiveName] = useState(divisions[0]?.name ?? "");
  const activeDivision = divisions.find((division) => division.name === activeName) ?? divisions[0];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      variants={staggerParent}
      className="mt-16 rounded-[2.5rem] border border-white/60 bg-stone-950 px-6 py-8 text-white shadow-[0_40px_110px_-58px_rgba(0,0,0,0.88)] sm:px-8"
    >
      <motion.div variants={revealUp} className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Command center</p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">One hub. Three working lines.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-stone-300">
          LEM Holding connects planning, living, and supply in one operating system. Hover each node and the system opens up.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={revealUp} className="command-shell">
          <div className="command-hub">
            <div className="text-xs uppercase tracking-[0.28em] text-teal-200">Core</div>
            <div className="mt-3 text-3xl font-bold text-white">LEM Holding</div>
            <div className="mt-3 text-sm leading-relaxed text-stone-300">Powering Solutions. Enabling Possibilities.</div>
            <div className="command-pulse command-pulse-a" aria-hidden />
            <div className="command-pulse command-pulse-b" aria-hidden />
          </div>

          <svg className="pointer-events-none absolute inset-0 hidden md:block" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden>
            <path d="M500 270 C340 250 280 180 172 116" className="command-link-path" />
            <path d="M500 270 C660 236 738 150 844 126" className="command-link-path" />
            <path d="M500 270 C642 320 740 408 818 496" className="command-link-path" />
          </svg>

          <div className="command-node-grid">
            {divisions.map((division) => {
              const accent = accentStyles[division.accent];
              const isActive = division.name === activeDivision.name;

              return (
                <button
                  key={division.name}
                  type="button"
                  onMouseEnter={() => setActiveName(division.name)}
                  onFocus={() => setActiveName(division.name)}
                  className={`command-node ${isActive ? "command-node-active" : ""}`}
                  style={{ boxShadow: isActive ? `0 0 0 1px ${accent.edge}, 0 28px 72px -40px ${accent.edge}` : undefined }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="command-node-logo">
                        {division.logoPath ? (
                          <Image src={division.logoPath} alt={`${division.name} logo`} width={40} height={40} className="h-10 w-10 object-contain" />
                        ) : (
                          <span className="text-[10px] font-bold tracking-[0.18em] text-teal-100">LEM</span>
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-teal-200/80">{division.eyebrow}</div>
                        <div className="mt-1 text-xl font-bold text-white">{division.name}</div>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
                      {division.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">{division.promise}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={revealUp} className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-[0.22em] text-teal-300">Active node</div>
          <div className="mt-4 flex items-center gap-4">
            <div className="command-active-logo">
              {activeDivision.logoPath ? (
                <Image src={activeDivision.logoPath} alt={`${activeDivision.name} logo`} width={56} height={56} className="h-14 w-14 object-contain" />
              ) : (
                <span className="text-xs font-bold tracking-[0.18em] text-teal-100">LEM</span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-white">{activeDivision.name}</h3>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">{activeDivision.description}</p>
          <div className="mt-8 space-y-3">
            {[
              activeDivision.promise,
              activeDivision.status === "Live" ? "Ready for use now." : "This division is being prepared for launch.",
              "Connected back into the wider LEM service system.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm leading-relaxed text-stone-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function HoldingExperience({ divisions, holdingLogoPath }: HoldingExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const statementRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [0, prefersReducedMotion ? 0 : -60]);
  const logoY = useTransform(scrollYProgress, [0, 0.35], [0, prefersReducedMotion ? 0 : 70]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.3], [0, prefersReducedMotion ? 0 : 7]);
  const statementScale = useTransform(statementProgress, [0, 0.45, 1], [0.88, 1, 1.05]);
  const statementOpacity = useTransform(statementProgress, [0, 0.2, 0.75, 1], [0.08, 1, 1, 0.42]);
  const statementY = useTransform(statementProgress, [0, 1], [90, prefersReducedMotion ? 0 : -40]);

  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-teal -left-24 top-24" />
        <div className="ambient-orb ambient-orb-amber -right-32 top-120" />
        <div className="mesh-cloud mesh-cloud-teal top-28 left-[12%]" />
        <div className="mesh-cloud mesh-cloud-amber right-[8%] top-168" />
        <div className="mesh-cloud mesh-cloud-stone left-[28%] bottom-80" />
        <div className="grid-floor" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/55 px-5 py-8 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:px-8 sm:py-10"
        >
          <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-teal-300/70 to-transparent" />
          <div className="hero-light-cone hero-light-cone-a" aria-hidden />
          <div className="hero-light-cone hero-light-cone-b" aria-hidden />
          <div className="hero-strip">
            <span>End-to-end service experience</span>
            <span>Operational and strategic solutions</span>
            <span>Reliable home away from home</span>
            <span>Essential goods and daily support</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div style={{ y: headlineY }} className="relative z-10 min-w-0 pt-10 lg:pt-14">
              <motion.p variants={revealUp} className="text-xs uppercase tracking-[0.28em] text-teal-700">
                LEM Holding
              </motion.p>
              <motion.h1
                variants={revealUp}
                className="mt-5 max-w-4xl text-5xl font-bold leading-[0.92] text-stone-900 sm:text-6xl lg:text-7xl"
              >
                Powering
                <span className="block text-transparent bg-linear-to-r from-teal-800 via-teal-500 to-amber-500 bg-clip-text">
                  Solutions.
                </span>
                Enabling Possibilities.
              </motion.h1>

              <motion.p variants={revealUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700 sm:text-xl">
                LEM Holding is a dynamic powerhouse bringing together three strong divisions to deliver a seamless,
                end-to-end service experience.
              </motion.p>

              <motion.p variants={revealUp} className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                We serve businesses seeking tailored, results-driven solutions, as well as individuals who rely on dependable service and quality support.
              </motion.p>

              <motion.div variants={revealUp} className="mt-8 flex flex-wrap gap-3">
                <MagneticLink href="#sequence" label="See the full sequence" />
                <MagneticLink href="#divisions" label="Open the divisions" variant="secondary" />
              </motion.div>

              <motion.div variants={revealUp} className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["3", "Strong divisions under one group"],
                  ["1", "Seamless end-to-end service"],
                  ["24/7", "Dependable support mindset"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/60 bg-white/65 p-4 shadow-sm backdrop-blur-sm">
                    <div className="text-3xl font-bold text-stone-900">{value}</div>
                    <div className="mt-2 text-sm leading-relaxed text-stone-600">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div style={{ y: logoY, rotate: logoRotate }} variants={revealUp} className="relative mx-auto w-full max-w-xl">
              <div className="hero-canvas-shell">
                <HeroScene />
                <div className="hero-canvas-vignette" aria-hidden />
                <div className="hero-chamber-grid" aria-hidden />
                <div className="holding-logo-stage hero-logo-stage">
                  <div className="holding-logo-aura" aria-hidden />
                  <div className="holding-logo-frame hero-logo-frame">
                    {holdingLogoPath ? (
                      <Image
                        src={holdingLogoPath}
                        alt="LEM Holding logo"
                        width={540}
                        height={320}
                        priority
                        className="holding-logo-image"
                      />
                    ) : (
                      <div className="holding-logo-fallback">LEM Holding</div>
                    )}
                  </div>

                  <div className="hero-scene-chips" aria-hidden>
                    <span>Glass chamber</span>
                    <span>Clean signal</span>
                    <span>LEM Holding</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <section ref={statementRef} className="mt-12">
          <motion.div
            style={{ scale: statementScale, opacity: statementOpacity, y: statementY }}
            className="statement-panel"
          >
            <div className="statement-beam" aria-hidden />
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-teal-700">The story</div>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
                  A true one-stop service provider, bridging expert solutions with practical, on-the-ground support.
                </h2>
              </div>

              <div className="space-y-4">
                {exactStory.map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 10, scale: 1.01 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="story-line-card rounded-3xl border border-white/70 bg-white/82 px-5 py-4 text-base leading-relaxed text-stone-700 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.28)]"
                  >
                    <span className="story-line-index">0{index + 1}</span>
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <div id="sequence">
          <SequenceExperience divisions={divisions} />
        </div>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerParent}
          className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div variants={revealUp} className="story-panel rounded-4xl border border-teal-200/70 bg-white/72 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Mission film</p>
            <div className="mission-film-stage mt-6">
              <div className="mission-film-glow" aria-hidden />
              <div className="grid gap-4 lg:grid-cols-3">
                {filmPanels.map((panel, index) => (
                  <motion.article
                    key={panel.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.09 }}
                    className="film-panel"
                  >
                    <div className="film-panel-index">0{index + 1}</div>
                    <div className="film-panel-label">{panel.label}</div>
                    <h3 className="mt-4 text-2xl font-bold text-white">{panel.title}</h3>
                    <p className="mt-5 text-base leading-relaxed text-stone-300">{panel.line}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="rounded-4xl border border-white/60 bg-white/78 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Who we serve</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              Built for businesses. Built for people. Built to keep moving.
            </h2>
            <div className="mt-8 space-y-4">
              {audiencePoints.map((item) => (
                <div key={item} className="rounded-3xl border border-stone-200 bg-stone-50/85 px-5 py-4 text-base leading-relaxed text-stone-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <CommandCenter divisions={divisions} />

        <section id="divisions" className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerParent}
          >
            <motion.div variants={revealUp} className="text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Division access</p>
              <h2 className="mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">Three strong divisions. One clear system.</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
                Each card responds to the cursor with tilt, light, depth, and stronger hover states.
              </p>
            </motion.div>

            <motion.div variants={staggerParent} className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {divisions.map((division, index) => (
                <DivisionCard key={division.name} division={division} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          variants={staggerParent}
          className="final-frame mt-14 overflow-hidden rounded-[2.5rem] border border-white/60 px-6 py-10 text-white shadow-[0_40px_110px_-55px_rgba(0,0,0,0.8)] sm:px-10"
        >
          <div className="closing-aurora" aria-hidden />
          <div className="final-ghost-grid" aria-hidden>
            <span>Projects</span>
            <span>Accommodation</span>
            <span>Supply</span>
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealUp} className="final-mark">
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Final frame</div>
              <div className="final-mark-shell mt-5">
                {holdingLogoPath ? (
                  <Image src={holdingLogoPath} alt="LEM Holding logo" width={360} height={220} className="mx-auto h-auto w-full max-w-[16rem] object-contain" />
                ) : (
                  <div className="holding-logo-fallback">LEM Holding</div>
                )}
              </div>
              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
                Powering Solutions. Enabling Possibilities.
              </div>
            </motion.div>

            <div>
              <motion.h2 variants={revealUp} className="relative z-10 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                From strategy to supply, from planning to living - LEM Holding is your trusted partner in progress.
              </motion.h2>
              <motion.p variants={revealUp} className="relative z-10 mt-6 max-w-3xl text-lg leading-relaxed text-stone-200">
                One group built to support business performance, daily operations, and reliable living with one clear standard of service.
              </motion.p>
              <motion.div variants={revealUp} className="relative z-10 mt-8 flex flex-wrap gap-3">
                <MagneticLink href="https://lem-accommodation.vercel.app" label="Open the live division" />
                <MagneticAnchor href="mailto:giftk.rantho@gmail.com" label="Start a conversation" variant="secondary" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}