import { useCallback } from 'react';
import ShlokaButton from '../ShlokaButton/ShlokaButton';
import styles from './HeroContent.module.css';

export default function HeroContent() {
  const handleCtaEnter = useCallback(() => {
    document.documentElement.classList.add('cta-hovering');
  }, []);

  const handleCtaLeave = useCallback(() => {
    document.documentElement.classList.remove('cta-hovering');
  }, []);

  return (
    <div className={styles.content} data-hero-copy data-parallax-layer="text">
      {/* Primary Headline */}
      <h1 className={styles.heading} data-hero-heading id="hero-title">
        THE EPICS,<br />
        REIMAGINED.
      </h1>

      {/* Ornamental Divider */}
      <div className={styles.divider} aria-hidden="true">
        <span className={styles.divLine} />
        <span className={styles.divDiamond}>❖</span>
        <span className={styles.divLine} />
      </div>

      {/* Brand Statement / Subtitle */}
      <p className={styles.brandDescription} data-hero-subheading>
        A CONTEMPORARY INDIAN FASHION HOUSE<br />
        HOUSED WITHIN THE VISUAL MEMORY<br />
        OF AN ANCIENT INDIAN PALACE.
      </p>

      {/* Step Through Lotus Microcopy */}
      <div className={styles.stepThrough} aria-hidden="true">
        <svg className={styles.lotusIcon} width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M14 1C14 1 17.5 9 14 17C10.5 9 14 1 14 1Z" stroke="currentColor" strokeWidth="0.9" />
          <path d="M6 7C6 7 12.5 10 14 17C8.5 13 6 7 6 7Z" stroke="currentColor" strokeWidth="0.9" />
          <path d="M22 7C22 7 15.5 10 14 17C19.5 13 22 7 22 7Z" stroke="currentColor" strokeWidth="0.9" />
          <path d="M1 12C1 12 8 13.5 14 17C6.5 15.5 1 12 1 12Z" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
          <path d="M27 12C27 12 20 13.5 14 17C21.5 15.5 27 12 27 12Z" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
          <circle cx="14" cy="18.5" r="1" fill="currentColor" />
        </svg>
        <span className={styles.stepThroughText}>STEP THROUGH.</span>
      </div>

      {/* CTA */}
      <div className={styles.ctas}>
        <ShlokaButton
          variant="primary"
          href="#collections"
          id="hero-cta-discover"
          data-hero-cta-primary
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
        >
          DISCOVER THE COLLECTION
        </ShlokaButton>
      </div>
    </div>
  );
}
