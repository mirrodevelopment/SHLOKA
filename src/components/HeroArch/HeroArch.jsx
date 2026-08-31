import styles from './HeroArch.module.css';

/**
 * Monumental Indian Architectural Arch — SHLOKA Signature Device.
 *
 * Recreates the exact double-line Rajasthani/Mughal arch contour with
 * stepped springline brackets, sweeping ogee shoulder curves, sharp apex,
 * and top 4-point star emblem from the reference design.
 */
export default function HeroArch() {
  return (
    <div className={styles.container} data-hero-arch-container data-parallax-layer="arch">
      <svg
        className={styles.arch}
        viewBox="0 0 520 840"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#A98455" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#goldGlow)">
          {/* Outer arch path — Stepped Bracket + Ogee Arch */}
          <path
            data-arch-outer
            className={styles.archPath}
            d="
              M 70 840
              L 70 340
              L 60 340
              L 60 332
              L 68 332
              C 68 215, 138 105, 260 34
              C 382 105, 452 215, 452 332
              L 460 332
              L 460 340
              L 450 340
              L 450 840
            "
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner arch path — 12px inset contour */}
          <path
            data-arch-inner
            className={styles.archPathInner}
            d="
              M 82 840
              L 82 342
              L 74 342
              L 74 336
              L 80 336
              C 80 225, 146 120, 260 46
              C 374 120, 440 225, 440 336
              L 446 336
              L 446 342
              L 438 342
              L 438 840
            "
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top 4-point star ornament above apex */}
          <g className={styles.apex} opacity="0.7">
            <path
              d="M 260 14 L 261.8 17.8 L 265.6 19.6 L 261.8 21.4 L 260 25.2 L 258.2 21.4 L 254.4 19.6 L 258.2 17.8 Z"
              fill="currentColor"
            />
          </g>

          {/* Base threshold line */}
          <line x1="50" y1="840" x2="470" y2="840" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}
