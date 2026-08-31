import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function useMouseParallax(containerRef, layersConfig) {
  const isActiveRef = useRef(false);
  const quickSettersRef = useRef([]);

  const activate = useCallback(() => {
    isActiveRef.current = true;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    // Only enable on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    // Create quickTo setters for each layer
    const setters = layersConfig.map((layer) => {
      const el = container.querySelector(layer.selector);
      if (!el) return null;

      return {
        xTo: gsap.quickTo(el, 'x', {
          duration: 0.8,
          ease: 'power3.out',
        }),
        yTo: gsap.quickTo(el, 'y', {
          duration: 0.8,
          ease: 'power3.out',
        }),
        factor: layer.factor,
        maxMove: layer.maxMove || 14,
      };
    });

    quickSettersRef.current = setters.filter(Boolean);

    const handleMouseMove = (e) => {
      if (!isActiveRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 → 1
      const nx = (clientX / innerWidth - 0.5) * 2;
      const ny = (clientY / innerHeight - 0.5) * 2;

      quickSettersRef.current.forEach((setter) => {
        const moveX = nx * setter.maxMove * setter.factor;
        const moveY = ny * setter.maxMove * setter.factor;
        setter.xTo(moveX);
        setter.yTo(moveY);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef, layersConfig]);

  return { activate };
}
