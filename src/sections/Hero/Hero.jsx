import { forwardRef, useRef } from 'react';
import heroBg from '../../assets/Hero-bg-img.png';
import heroMobileImg from '../../assets/hero-mobile-img.png';
import saree1Img from '../../assets/Saree-1.png';
import saree2Img from '../../assets/Saree-2.png';
import Navbar from '../../components/Navbar/Navbar';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import { SHLOKA_CATALOG } from '../../utils/catalog';
import styles from './Hero.module.css';

import catIcon1 from '../../assets/icon-1.png';
import catIcon2 from '../../assets/icon-2.png';
import catIcon3 from '../../assets/icon-3.png';
import catIcon4 from '../../assets/icon-4.png';
import catIcon5 from '../../assets/icon-5.png';
import plusIconImg from '../../assets/plus-icon.png';
import viewAllBtnImg from '../../assets/viewall-btn.png';

const CATEGORIES = [
  { id: 'sarees', name: 'SAREES', icon: catIcon1 },
  { id: 'new-arrivals', name: 'NEW ARRIVALS', icon: catIcon2 },
  { id: 'blouses', name: 'BLOUSES', icon: catIcon3 },
  { id: 'ethnic-wear', name: 'ETHNIC WEAR', icon: catIcon4 },
  { id: 'gifting', name: 'GIFTING', icon: catIcon5 },
];

const Hero = forwardRef(function Hero(props, ref) {
  const heroRef = useRef(null);

  const handleSelectProduct = (productId, fallbackImg) => {
    const catalogItem = SHLOKA_CATALOG.find((item) => item.id === productId);
    if (catalogItem) {
      props.onSelectProduct?.({
        ...catalogItem,
        image: fallbackImg || catalogItem.image,
      });
    } else {
      props.onSelectProduct?.({
        id: productId,
        name: productId === 'saree-ritu' ? 'RITU' : 'MEGH',
        subtitle:
          productId === 'saree-ritu'
            ? 'Royal Crimson Red Kanchipuram Silk Saree with Gold Temple Zari'
            : 'Varanasi Sage Green Silk Saree with Intricate Gold Kadwa Weave',
        price: productId === 'saree-ritu' ? 94500 : 82000,
        image: fallbackImg,
        category: productId === 'saree-ritu' ? 'Bridal' : 'Heritage',
        fabric: 'Pure Mulberry Silk',
      });
    }
  };

  return (
    <section
      ref={(node) => {
        heroRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.hero}
      id="hero"
      aria-label="SHLOKA Hero Section"
    >
      {/* ── DESKTOP HERO VIEW (Untouched, visible strictly on min-width: 769px) ── */}
      <div className={styles.desktopView}>
        {/* Background artwork with smooth CSS mask gradient fade */}
        <div
          className={styles.background}
          data-hero-bg
          data-parallax-layer="background"
        >
          <img
            src={heroBg}
            alt="SHLOKA — Contemporary Indian Couture"
            className={styles.bgImage}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Left side text in arch alcove */}
        <div className={styles.leftCopy}>
          <BloomingLotusIcon width={22} height={16} stroke="#A98455" className={styles.copyMotifTop} />
          <p className={styles.copyText}>
            <span>DRAPED IN</span>
            <span>STORIES.</span>
            <span className={styles.copyTextGap} />
            <span>WOVEN</span>
            <span>THROUGH TIME.</span>
          </p>
        </div>

        {/* Right side text in arch alcove */}
        <div className={styles.rightCopy}>
          <div className={styles.rightMotifGroup}>
            <BloomingLotusIcon width={22} height={16} stroke="#A98455" className={styles.copyMotifTop} />
            <span className={styles.rightMotifLine} />
          </div>
          <p className={styles.copyText}>
            <span>TRADITION</span>
            <span>IS OUR LANGUAGE.</span>
            <span className={styles.copyTextGap} />
            <span>ELEGANCE IS OUR</span>
            <span>EXPRESSION.</span>
          </p>
          <div className={styles.rightBottomSpacer} aria-hidden="true" />
        </div>

        {/* Desktop Navigation */}
        <Navbar
          onOpenAuth={props.onOpenAuth}
          onOpenCart={props.onOpenCart}
          currentPatron={props.currentPatron}
        />
      </div>

      {/* ── MOBILE HERO & SHOWCASE VIEW (Visible strictly on max-width: 768px) ── */}
      <div className={styles.mobileView}>
        {/* Part 1: Top Hero Banner with hero-mobile-img.png */}
        <div className={styles.mobileBanner}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerEyebrow}>
              TIMELESS WEAVES,<br />ETERNAL BEAUTY.
            </span>

            <div className={styles.diamondDivider} aria-hidden="true">
              <span className={styles.diamondLine} />
              <span className={styles.diamondDot} />
              <span className={styles.diamondLine} />
            </div>

            <h1 className={styles.bannerTitle}>
              <span className={styles.bannerTitleLine}>NEW</span>
              <span className={styles.bannerTitleLine}>COLLECTION</span>
            </h1>

            <p className={styles.bannerSubtitle}>
              Discover our handpicked sarees, woven in tradition and made for today.
            </p>

            <button
              type="button"
              className={styles.exploreBtn}
              onClick={() => {
                const el = document.querySelector('#collection') || document.querySelector('#featured-sarees');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else props.onSelectTab?.('search');
              }}
              aria-label="Explore New Collection"
            >
              EXPLORE NOW <span className={styles.exploreArrow}>→</span>
            </button>
          </div>

          <div className={styles.bannerImageWrap}>
            <img
              src={heroMobileImg}
              alt="Shloka New Collection — Handcrafted Silk Sarees"
              className={styles.bannerImg}
              loading="eager"
            />
            <div className={styles.bannerGradientOverlay} aria-hidden="true" />
          </div>
        </div>

        {/* Part 2: Shop By Category */}
        <section className={styles.categorySection} aria-label="Shop By Category">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>SHOP BY CATEGORY</h2>
            <button
              type="button"
              className={styles.viewAllBtn}
              onClick={() => props.onSelectTab?.('search')}
              aria-label="View all categories"
            >
              <img
                src={viewAllBtnImg}
                alt="View All"
                className={styles.viewAllBtnImg}
              />
            </button>
          </div>

          <div className={styles.categoryRow}>
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                className={styles.categoryItem}
                style={{ animationDelay: `${0.08 + idx * 0.06}s` }}
                onClick={() => props.onSelectTab?.('search')}
                aria-label={`Shop ${cat.name}`}
              >
                <div className={styles.categoryCircle}>
                  <img src={cat.icon} alt={cat.name} className={styles.categoryIconImg} />
                </div>
                <span className={styles.categoryLabel}>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Part 3: Featured Sarees */}
        <section className={styles.featuredSection} aria-label="Featured Sarees">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>FEATURED SAREES</h2>
            <button
              type="button"
              className={styles.viewAllBtn}
              onClick={() => {
                const el = document.querySelector('#featured-sarees');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else props.onSelectTab?.('search');
              }}
              aria-label="View all featured sarees"
            >
              <img
                src={viewAllBtnImg}
                alt="View All"
                className={styles.viewAllBtnImg}
              />
            </button>
          </div>

          <div className={styles.cardsGrid}>
            {/* Card 1: Saree-1.png (Ritu) */}
            <article
              className={styles.productCard}
              onClick={() => handleSelectProduct('saree-ritu', saree1Img)}
              style={{ animationDelay: '0.2s' }}
            >
              <div className={styles.cardImageContainer}>
                <img
                  src={saree1Img}
                  alt="SHLOKA Ritu — Royal Crimson Red Kanchipuram Silk Saree"
                  className={styles.cardImg}
                  loading="lazy"
                />
                <button
                  type="button"
                  className={styles.plusBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProduct('saree-ritu', saree1Img);
                  }}
                  aria-label="Quick View Ritu Saree"
                >
                  <img src={plusIconImg} alt="Quick View" className={styles.plusPatchImg} />
                </button>
                <span className={styles.newPillBadge}>NEW</span>
              </div>
            </article>

            {/* Card 2: Saree-2.png (Megh) */}
            <article
              className={styles.productCard}
              onClick={() => handleSelectProduct('saree-megh', saree2Img)}
              style={{ animationDelay: '0.3s' }}
            >
              <div className={styles.cardImageContainer}>
                <img
                  src={saree2Img}
                  alt="SHLOKA Megh — Varanasi Sage Green Silk Saree"
                  className={styles.cardImg}
                  loading="lazy"
                />
                <button
                  type="button"
                  className={styles.plusBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProduct('saree-megh', saree2Img);
                  }}
                  aria-label="Quick View Megh Saree"
                >
                  <img src={plusIconImg} alt="Quick View" className={styles.plusPatchImg} />
                </button>
                <span className={styles.newPillBadge}>NEW</span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
});

export default Hero;
