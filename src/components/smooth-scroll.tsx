"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.085,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.05,
      smoothWheel: true,
    });

    let frameId = 0;

    const update = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}