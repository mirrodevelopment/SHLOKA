import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useHeroAnimation(heroRef, onParallaxReady) {
  const ctxRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Grab all animated elements
      const bg = hero.querySelector('[data-hero-bg]');
      const border = hero.querySelector('[data-manuscript-frame]');
      const archOuter = hero.querySelector('[data-arch-outer]');
      const archInner = hero.querySelector('[data-arch-inner]');
      const logo = hero.querySelector('[data-hero-logo]');
      const nav = hero.querySelector('[data-hero-nav]');
      const heading = hero.querySelector('[data-hero-heading]');
      const subheading = hero.querySelector('[data-hero-subheading]');
      const ctaPrimary = hero.querySelector('[data-hero-cta-primary]');
      const woman = hero.querySelector('[data-hero-woman]');
      const geometry = hero.querySelectorAll('[data-decorative-geo]');
      const scrollIndicator = hero.querySelector('[data-scroll-indicator]');

      const animatedElements = [bg, border, logo, nav, heading, subheading, ctaPrimary, woman, scrollIndicator, ...geometry].filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(animatedElements, { opacity: 1, clearProps: 'all' });
        if (onParallaxReady) onParallaxReady();
        return;
      }

      // Set initial states
      if (bg) gsap.set(bg, { opacity: 0, scale: 1.04 });
      if (border) gsap.set(border, { opacity: 0 });
      if (logo) gsap.set(logo, { opacity: 0, y: 16 });
      if (nav) gsap.set(nav, { opacity: 0, y: -8 });
      if (heading) gsap.set(heading, { opacity: 0, y: 18 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 14 });
      if (ctaPrimary) gsap.set(ctaPrimary, { opacity: 0, y: 12 });
      if (woman) gsap.set(woman, { opacity: 0, y: 40, scale: 0.98 });
      if (geometry.length) gsap.set(geometry, { opacity: 0 });
      if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0 });

      // Arch stroke setup
      [archOuter, archInner].forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      // Master timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      });

      // 0.0s — Background reveal
      if (bg) {
        tl.to(bg, { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }, 0);
      }

      // 0.15s — Border appears
      if (border) {
        tl.to(border, { opacity: 1, duration: 1.2 }, 0.15);
      }

      // 0.35s — Arch draws
      if (archOuter) {
        tl.to(archOuter, { strokeDashoffset: 0, duration: 2.0, ease: 'power3.out' }, 0.35);
      }
      if (archInner) {
        tl.to(archInner, { strokeDashoffset: 0, duration: 2.0, ease: 'power3.out' }, 0.45);
      }

      // 0.65s — Navigation / Logo
      if (nav) tl.to(nav, { opacity: 1, y: 0, duration: 0.7 }, 0.65);
      if (logo) tl.to(logo, { opacity: 1, y: 0, duration: 0.7 }, 0.65);
      if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 0.8 }, 0.85);
      if (subheading) tl.to(subheading, { opacity: 1, y: 0, duration: 0.7 }, 1.05);
      if (ctaPrimary) tl.to(ctaPrimary, { opacity: 1, y: 0, duration: 0.6 }, 1.25);

      if (geometry.length) {
        tl.to(geometry, { opacity: 0.35, duration: 1.2, stagger: 0.1 }, 1.0);
      }

      // 1.5s — Woman enters
      if (woman) {
        tl.to(woman, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' }, 1.5);
      }

      if (scrollIndicator) {
        tl.to(scrollIndicator, { opacity: 0.6, duration: 0.8 }, 2.0);
      }

      // Activate parallax
      tl.call(() => {
        if (onParallaxReady) onParallaxReady();
      }, null, 2.2);

      // Subtle breathing animation
      tl.add(() => {
        if (woman) {
          gsap.to(woman, {
            y: -6,
            duration: 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
          gsap.to(woman, {
            rotation: 0.2,
            scale: 1.008,
            duration: 6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }
      }, 2.4);

    }, hero);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, [heroRef, onParallaxReady]);

  return ctxRef;
}
