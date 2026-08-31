import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandIntroduction.module.css';

gsap.registerPlugin(ScrollTrigger);

const BrandIntroduction = forwardRef(function BrandIntroduction(props, ref) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Faster, snappier GSAP ScrollTrigger text transition working on forward and back scroll
      const textElements = sectionRef.current?.querySelectorAll('[data-s2-text]');
      if (textElements && textElements.length > 0) {
        gsap.fromTo(
          textElements,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      aria-labelledby="s2-heading"
    >
      {/* Small architectural detail on the side */}
      <div className={styles.archDetail} aria-hidden="true">
        <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
          <path
            d="M 30 0 L 30 140 C 30 155 25 165 15 175 C 10 180 5 185 2 190 L 2 200"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M 35 0 L 35 138 C 35 153 30 163 20 173 C 15 178 10 183 7 188 L 7 200"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.5"
          />
          <circle cx="30" cy="4" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading} id="s2-heading">
          <span className={styles.line} data-s2-text>DRAPED IN STORIES.</span>
          <span className={styles.line} data-s2-text>WOVEN THROUGH TIME.</span>
        </h2>

        <p className={styles.subheading} data-s2-text>
          Every SHLOKA piece begins somewhere old, and arrives somewhere new.
        </p>

        {/* Ornamental divider */}
        <div className={styles.divider} aria-hidden="true" data-s2-text>
          <span className={styles.divDot} />
          <span className={styles.divLine} />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 0C6 0 8 3 12 4C8 5 6 8 6 8C6 8 4 5 0 4C4 3 6 0 6 0Z" fill="currentColor" opacity="0.4" />
          </svg>
          <span className={styles.divLine} />
          <span className={styles.divDot} />
        </div>
      </div>
    </section>
  );
});

export default BrandIntroduction;
