import { forwardRef, useRef, useState } from 'react';
import sareesImg from '../../assets/collection-sarees.png';
import ethnicImg from '../../assets/collection-ethnic.jpg';
import festiveImg from '../../assets/collection-festive.jpg';
import sec2TextImg from '../../assets/sec2-text-img.png';
import viewCollectionBtnImg from '../../assets/ViewCollection-Btn.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import styles from './TheCollection.module.css';

const COLLECTIONS = [
  {
    id: 'sarees',
    title: 'SAREES',
    image: sareesImg,
    alt: 'SHLOKA Luxury Heritage Silk Saree in Crimson Gold',
    objectPosition: 'center center',
    href: '#sarees',
  },
  {
    id: 'ethnic-wear',
    title: 'ETHNIC WEAR',
    image: ethnicImg,
    alt: 'SHLOKA Royal Sage Gold Zari Kurta Set',
    objectPosition: 'center 20%',
    href: '#ethnic-wear',
  },
  {
    id: 'festive-edit',
    title: 'FESTIVE EDIT',
    image: festiveImg,
    alt: 'SHLOKA Festive Royal Purple Silk Saree',
    objectPosition: 'center 20%',
    href: '#festive-edit',
  },
];

const TheCollection = forwardRef(function TheCollection(props, ref) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const cardWidth = el.scrollWidth / COLLECTIONS.length;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < COLLECTIONS.length && newIndex !== activeCardIndex) {
      setActiveCardIndex(newIndex);
    }
  };

  const scrollToCard = (index) => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="collection"
      aria-label="Collection - Chapters"
    >
      {/* Outer Pillar Background SVGs */}
      <div className={styles.outerPillarLeft} aria-hidden="true">
        <svg width="70" height="160" viewBox="0 0 80 180" fill="none">
          <path d="M 0 0 L 60 0 C 60 40, 20 60, 20 120 L 20 180" stroke="#D8C5A9" strokeWidth="1" opacity="0.4" />
          <path d="M 0 10 L 50 10 C 50 45, 12 62, 12 120 L 12 180" stroke="#A98455" strokeWidth="0.75" opacity="0.3" />
          <circle cx="20" cy="120" r="2.5" fill="#A98455" opacity="0.4" />
        </svg>
      </div>
      <div className={styles.outerPillarRight} aria-hidden="true">
        <svg width="70" height="160" viewBox="0 0 80 180" fill="none">
          <path d="M 80 0 L 20 0 C 20 40, 60 60, 60 120 L 60 180" stroke="#D8C5A9" strokeWidth="1" opacity="0.4" />
          <path d="M 80 10 L 30 10 C 30 45, 68 62, 68 120 L 68 180" stroke="#A98455" strokeWidth="0.75" opacity="0.3" />
          <circle cx="60" cy="120" r="2.5" fill="#A98455" opacity="0.4" />
        </svg>
      </div>

      {/* Side Botanical Lotus Illustrations */}
      <div className={styles.sideBotanicalLeft} aria-hidden="true">
        <svg width="60" height="240" viewBox="0 0 70 260" fill="none">
          <path d="M 15 250 Q 30 180 20 100 Q 15 60 35 15" stroke="#A98455" strokeWidth="0.8" opacity="0.25" />
          <path d="M 10 240 Q 25 190 45 150" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 35 15 C 35 15 45 35 35 55 C 25 35 35 15 35 15 Z" stroke="#A98455" strokeWidth="0.8" opacity="0.25" />
          <path d="M 22 28 C 22 28 32 42 35 55 C 25 45 22 28 22 28 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 48 28 C 48 28 38 42 35 55 C 45 45 48 28 48 28 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 45 150 C 45 150 55 165 45 180 C 35 165 45 150 45 150 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.22" />
          <path d="M 34 160 C 34 160 42 172 45 180 C 37 172 34 160 34 160 Z" stroke="#A98455" strokeWidth="0.6" opacity="0.18" />
          <path d="M 56 160 C 56 160 48 172 45 180 C 53 172 56 160 56 160 Z" stroke="#A98455" strokeWidth="0.6" opacity="0.18" />
        </svg>
      </div>
      <div className={styles.sideBotanicalRight} aria-hidden="true">
        <svg width="60" height="240" viewBox="0 0 70 260" fill="none">
          <path d="M 55 250 Q 40 180 50 100 Q 55 60 35 15" stroke="#A98455" strokeWidth="0.8" opacity="0.25" />
          <path d="M 60 240 Q 45 190 25 150" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 35 15 C 35 15 25 35 35 55 C 45 35 35 15 35 15 Z" stroke="#A98455" strokeWidth="0.8" opacity="0.25" />
          <path d="M 48 28 C 48 28 38 42 35 55 C 45 45 48 28 48 28 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 22 28 C 22 28 32 42 35 55 C 25 45 22 28 22 28 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.2" />
          <path d="M 25 150 C 25 150 15 165 25 180 C 35 165 25 150 25 150 Z" stroke="#A98455" strokeWidth="0.7" opacity="0.22" />
          <path d="M 36 160 C 36 160 28 172 25 180 C 33 172 36 160 36 160 Z" stroke="#A98455" strokeWidth="0.6" opacity="0.18" />
          <path d="M 14 160 C 14 160 22 172 25 180 C 17 172 14 160 14 160 Z" stroke="#A98455" strokeWidth="0.6" opacity="0.18" />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Mobile-Only Top Eyebrow Label */}
        <span className={styles.mobileTopLabel} data-col-header>NEW ARRIVALS</span>

        {/* Palace Artwork Image */}
        <div className={styles.palaceArtwork}>
          <img src={sec2TextImg} alt="" className={styles.palaceArtworkImg} />
        </div>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.smallLotus} aria-hidden="true" data-col-header>
            <BloomingLotusIcon width={20} height={15} stroke="#A98455" />
          </div>

          <span className={styles.label} data-col-header>THE COLLECTION</span>

          <h2 className={styles.title} data-col-header>C H A P T E R S</h2>

          <div className={styles.headerDivider} aria-hidden="true" data-col-header>
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>

          <p className={styles.subtitle} data-col-header>Every weave, a timeless tale.</p>
        </header>

        {/* 3 Collection Cards Grid / Mobile Horizontal Carousel */}
        <div
          className={styles.grid}
          ref={gridRef}
          onScroll={handleScroll}
        >
          {COLLECTIONS.map((item) => (
            <article key={item.id} className={styles.card}>
              {/* Floating Flower Icon at top apex of Arch Card */}
              <div className={styles.cardTopLotus} aria-hidden="true">
                <BloomingLotusIcon width={20} height={14} />
              </div>

              {/* Image Frame Container */}
              <a href={item.href} className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.alt}
                  className={styles.cardImage}
                  style={{ objectPosition: item.objectPosition }}
                  loading="lazy"
                />
              </a>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardDivider} aria-hidden="true">
                  <span className={styles.cardDivLine} />
                  <span className={styles.cardDivDot} />
                  <span className={styles.cardDivLine} />
                </div>
                <a
                  href={item.href}
                  className={styles.viewCollectionBtnLink}
                  aria-label={`View Collection ${item.title}`}
                >
                  <img
                    src={viewCollectionBtnImg}
                    alt="View Collection"
                    className={styles.viewCollectionBtnImg}
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Carousel Indicator Dots */}
        <div className={styles.mobileCarouselDots} aria-hidden="true">
          {COLLECTIONS.map((item, idx) => (
            <button
              key={`dot-${item.id}`}
              type="button"
              className={`${styles.carouselDot} ${activeCardIndex === idx ? styles.activeDot : ''}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Flourish Ornament */}
        <div className={styles.bottomFlourish} aria-hidden="true" data-col-header>
          <BloomingLotusIcon width={24} height={18} stroke="#A98455" />
        </div>
      </div>
    </section>
  );
});

export default TheCollection;
