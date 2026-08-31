import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHoveringCta = false;
    let raf;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnterCta = () => {
      isHoveringCta = true;
      ring.classList.add(styles.expanded);
    };

    const handleMouseLeaveCta = () => {
      isHoveringCta = false;
      ring.classList.remove(styles.expanded);
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

      raf = requestAnimationFrame(animate);
    };

    // Attach listeners to CTA elements
    const ctas = document.querySelectorAll('[data-hero-cta-primary], [data-hero-cta-secondary], .nav-link');
    ctas.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterCta);
      el.addEventListener('mouseleave', handleMouseLeaveCta);
    });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
      ctas.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterCta);
        el.removeEventListener('mouseleave', handleMouseLeaveCta);
      });
    };
  }, []);

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </div>
  );
}
