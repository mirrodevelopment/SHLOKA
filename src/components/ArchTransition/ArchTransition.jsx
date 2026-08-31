import styles from './ArchTransition.module.css';

/**
 * Reusable section transition component.
 * Thin arch line → expands → section revealed → arch dissolves.
 * Acts as SHLOKA's chapter marker between homepage sections.
 */
export default function ArchTransition() {
  return (
    <div className={styles.transition} aria-hidden="true">
      <svg
        className={styles.arch}
        viewBox="0 0 200 120"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 20 120 L 20 50 C 20 30 40 15 70 8 C 85 4 95 2 100 1 C 105 2 115 4 130 8 C 160 15 180 30 180 50 L 180 120"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
      <div className={styles.ornament}>
        <span className={styles.dot} />
        <span className={styles.line} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
