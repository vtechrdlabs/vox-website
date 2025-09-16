"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export const useScrollAnimation = <
  T extends HTMLElement = HTMLElement
>(
  options: UseScrollAnimationOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const { threshold = 0.1, rootMargin = "50px", once = true, delay = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = window.setTimeout(() => setIsVisible(true), delay);
          if (once) {
            observer.unobserve(element);
          }
          return () => window.clearTimeout(t);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return { ref, isVisible };
};

export const useParallax = <T extends HTMLElement = HTMLElement>(speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      // Usa apenas o scroll global para o efeito (simples e performático)
      const scrolled = window.scrollY || window.pageYOffset || 0;
      const rate = scrolled * -speed;
      setOffset(rate);
    };

    const onScroll = () => {
      // Throttle via rAF
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // primeira atualização após montar
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return { ref, offset };
};
