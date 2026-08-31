import styles from './ManuscriptFrame.module.css';

export default function ManuscriptFrame() {
  return (
    <div className={styles.frame} data-manuscript-frame aria-hidden="true">
      {/* Corner ornaments */}
      <svg className={`${styles.corner} ${styles.topLeft}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 22V12C2 6.477 6.477 2 12 2h10" stroke="currentColor" strokeWidth="0.5" />
        <path d="M4 20V13C4 8.029 8.029 4 13 4h7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="2" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M6 6l2-2M6 6l-2 2" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      </svg>

      <svg className={`${styles.corner} ${styles.topRight}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 22V12C22 6.477 17.523 2 12 2H2" stroke="currentColor" strokeWidth="0.5" />
        <path d="M20 20V13C20 8.029 15.971 4 11 4H4" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="22" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M18 6l-2-2M18 6l2 2" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      </svg>

      <svg className={`${styles.corner} ${styles.bottomLeft}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 2v10c0 5.523 4.477 10 10 10h10" stroke="currentColor" strokeWidth="0.5" />
        <path d="M4 4v7c0 4.971 4.029 9 9 9h7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M6 18l2 2M6 18l-2-2" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      </svg>

      <svg className={`${styles.corner} ${styles.bottomRight}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 2v10c0 5.523-4.477 10-10 10H2" stroke="currentColor" strokeWidth="0.5" />
        <path d="M20 4v7c0 4.971-4.029 9-9 9H4" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="22" cy="2" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M18 18l-2 2M18 18l2-2" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      </svg>
    </div>
  );
}
