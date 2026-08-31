import styles from './DecorativeGeometry.module.css';

/**
 * Extremely subtle SVG motifs — chakra-inspired radial geometry,
 * lotus, star, crescent, manuscript marks.
 * Opacity 0.15–0.45 with very slow rotation breathing.
 */
export default function DecorativeGeometry() {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Chakra-inspired radial — top right area */}
      <svg
        className={`${styles.motif} ${styles.chakra}`}
        data-decorative-geo
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.4" />
        {/* Radial lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 40 + 20 * Math.cos(angle);
          const y1 = 40 + 20 * Math.sin(angle);
          const x2 = 40 + 28 * Math.cos(angle);
          const y2 = 40 + 28 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="currentColor"
              strokeWidth="0.3"
            />
          );
        })}
      </svg>

      {/* Tiny lotus — left side */}
      <svg
        className={`${styles.motif} ${styles.lotus}`}
        data-decorative-geo
        width="30" height="30" viewBox="0 0 30 30" fill="none"
      >
        <path d="M15 5C15 5 18 12 15 18C12 12 15 5 15 5Z" stroke="currentColor" strokeWidth="0.4" />
        <path d="M8 10C8 10 14 12 15 18C10 14 8 10 8 10Z" stroke="currentColor" strokeWidth="0.4" />
        <path d="M22 10C22 10 16 12 15 18C20 14 22 10 22 10Z" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="15" cy="19" r="1" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Star — bottom left */}
      <svg
        className={`${styles.motif} ${styles.star}`}
        data-decorative-geo
        width="20" height="20" viewBox="0 0 20 20" fill="none"
      >
        <path d="M10 2L10 18M2 10L18 10M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Crescent — right side */}
      <svg
        className={`${styles.motif} ${styles.crescent}`}
        data-decorative-geo
        width="18" height="22" viewBox="0 0 18 22" fill="none"
      >
        <path d="M14 4C8 6 6 11 8 17C3 13 3 7 8 3C10 2 12 2 14 4Z" stroke="currentColor" strokeWidth="0.4" fill="none" />
      </svg>

      {/* Vertical ornamental line with dots */}
      <svg
        className={`${styles.motif} ${styles.vertLine}`}
        data-decorative-geo
        width="4" height="60" viewBox="0 0 4 60" fill="none"
      >
        <line x1="2" y1="0" x2="2" y2="60" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" />
        <circle cx="2" cy="0" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="2" cy="30" r="0.8" fill="currentColor" opacity="0.3" />
        <circle cx="2" cy="60" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}
