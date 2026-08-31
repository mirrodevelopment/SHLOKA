import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  return (
    <div className={styles.indicator} data-scroll-indicator aria-hidden="true">
      <span className={styles.number}>01</span>
      <span className={styles.line} />
      <span className={styles.text}>STEP THROUGH</span>
    </div>
  );
}
