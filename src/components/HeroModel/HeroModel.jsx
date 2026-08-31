import heroGirl from '../../assets/Hero-girl-img.png';
import styles from './HeroModel.module.css';

export default function HeroModel() {
  return (
    <div className={styles.container} data-hero-woman>
      {/* Optional fabric shadow layer */}
      <div className={styles.fabricShadow} aria-hidden="true">
        <img
          src={heroGirl}
          alt=""
          className={styles.shadowImg}
          loading="eager"
        />
      </div>

      {/* Primary model image */}
      <img
        src={heroGirl}
        alt="SHLOKA contemporary Indian couture — woman in flowing red and gold Banarasi saree"
        className={styles.model}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
