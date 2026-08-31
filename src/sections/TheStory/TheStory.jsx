import { forwardRef, useRef } from 'react';
import storyHeroImg from '../../assets/story-hero.jpg';
import sec3Img from '../../assets/sec-3-img.png';
import homescreenSec3Img from '../../assets/homescreen-section3-img-Shloka.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import styles from './TheStory.module.css';

const TheStory = forwardRef(function TheStory(props, ref) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="story"
      aria-label="The Shloka Story - Chapter II"
    >
      {/* ── DESKTOP EXCLUSIVE VIEW (min-width: 769px) — 100% Preserved ── */}
      <div className={styles.desktopOnlyStory}>
        <div className={styles.container}>
          {/* Top Header Block */}
          <header className={styles.header}>
            {/* Section 3 Calligraphy Artwork Banner Image */}
            <div className={styles.storyArtwork} data-story-text>
              <img src={sec3Img} alt="The Shloka Story" className={styles.storyArtworkImg} />
            </div>

            {/* Top Blooming Lotus Motif */}
            <div className={styles.topOrnament} aria-hidden="true" data-story-text>
              <div className={styles.topLotusIcon}>
                <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
              </div>
            </div>

            {/* Eyebrow Chapter II */}
            <span className={styles.eyebrow} data-story-text>CHAPTER II</span>

            {/* Brand Title S H L O K A */}
            <h2 className={styles.title} data-story-text>S H L O K A</h2>

            {/* Middle Blooming Lotus Motif */}
            <div className={styles.middleLotus} aria-hidden="true" data-story-text>
              <BloomingLotusIcon width={24} height={18} stroke="#A98455" />
            </div>

            {/* Subtitle Verses */}
            <div className={styles.subtitleBlock}>
              <p className={styles.subtitleLine} data-story-text>Every verse has an origin.</p>
              <p className={styles.subtitleLine} data-story-text>Every saree has a soul.</p>
            </div>

            {/* Horizontal Line with Diamond */}
            <div className={styles.headerDivider} aria-hidden="true" data-story-text>
              <span className={styles.divLine} />
              <span className={styles.divDot} />
              <span className={styles.divLine} />
            </div>
          </header>
        </div>

        {/* 100vw Full Edge-to-Edge Width Framed Hero Image Box with Outer Gold Borders */}
        <div className={styles.fullWidthFrame}>
          {/* Top Outer Gold Border Line Diamond Center Stud */}
          <div className={styles.topOuterDiamond} aria-hidden="true" />

          <div className={styles.fullWidthImageInner}>
            <img
              src={storyHeroImg}
              alt="SHLOKA Heritage Couture Campaign — Model in gold silk saree in ivory palace"
              className={styles.storyImage}
              loading="lazy"
            />
          </div>

          {/* Bottom Outer Gold Border Line Diamond Center Stud */}
          <div className={styles.bottomOuterDiamond} aria-hidden="true" />
        </div>

        <div className={styles.container}>
          {/* Story Quote Footer */}
          <footer className={styles.quoteFooter}>
            {/* Gold Quotation Mark Icon */}
            <div className={styles.quoteMark} aria-hidden="true" data-story-text>
              <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
                <path
                  d="M4 14C4 10.5 6.5 7.5 10 6L9 4C4.5 6 1 10 1 15V19H8V14H4ZM16 14C16 10.5 18.5 7.5 22 6L21 4C16.5 6 13 10 13 15V19H20V14H16Z"
                  fill="#C9B38D"
                  opacity="0.85"
                />
              </svg>
            </div>

            {/* Quote Text */}
            <blockquote className={styles.quoteText} data-story-text>
              “A saree is never simply worn.
              <br />
              It becomes part of a story.”
            </blockquote>

            {/* Bottom Flourish Blooming Lotus & Line */}
            <div className={styles.quoteDivider} aria-hidden="true" data-story-text>
              <span className={styles.qLine} />
              <div className={styles.qLotus}>
                <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
              </div>
              <span className={styles.qLine} />
            </div>
          </footer>
        </div>
      </div>

      {/* ── MOBILE EXCLUSIVE VIEW (max-width: 768px - Matches Reference Layout) ── */}
      <div className={styles.mobileOnlyStory}>
        {/* 1. Top Section Header: Heading & Diamond Divider (Full Width at Top) */}
        <div className={styles.mobileHeaderWrap}>
          <h2 className={styles.mobileMainTitle} data-story-text>
            THE SHLOKA STORY
          </h2>

          <div className={styles.mobileDiamondDivider} aria-hidden="true" data-story-text>
            <span className={styles.mobileDivLine} />
            <span className={styles.mobileDivDot} />
            <span className={styles.mobileDivLine} />
          </div>
        </div>

        {/* 2. Middle Row: Left Story Copy & Right Heritage Line Artwork */}
        <div className={styles.mobileStoryMain}>
          <div className={styles.mobileTextCol}>
            <div className={styles.mobileSubtitleBlock} data-story-text>
              <p className={styles.mobileSubtitle}>Rooted in heritage.</p>
              <p className={styles.mobileSubtitle}>Woven for today.</p>
            </div>

            <p className={styles.mobileParagraph} data-story-text>
              Shloka is a celebration of India's weaving traditions, brought to life through timeless designs, thoughtful details and honest craftsmanship.
            </p>
          </div>

          <div className={styles.mobileArtworkCol}>
            <img
              src={homescreenSec3Img}
              alt="The Shloka Story — Traditional Indian Handloom Heritage Art"
              className={styles.mobileArtworkImg}
              loading="lazy"
            />
          </div>
        </div>

        {/* 3. Bottom CTA Button (Marked Position Above Pillars) */}
        <div className={styles.mobileCtaWrap}>
          <a href="#story" className={styles.mobileDiscoverLink} data-story-text>
            <span className={styles.mobileDiscoverText}>DISCOVER OUR STORY</span>
            <span className={styles.mobileLinkArrow} aria-hidden="true">→</span>
          </a>
        </div>

        {/* Bottom Horizontal Thin Divider */}
        <div className={styles.mobilePillarsSeparator} aria-hidden="true" />

        {/* 4 Brand Pillars Row with Vertical Dividers */}
        <div className={styles.mobilePillarsGrid}>
          {/* Pillar 1: Timeless Designs */}
          <div className={styles.mobilePillarCol}>
            <div className={styles.mobilePillarIconWrap}>
              <BloomingLotusIcon width={24} height={17} stroke="#A98455" />
            </div>
            <span className={styles.mobilePillarText}>
              TIMELESS<br />DESIGNS
            </span>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Pillar 2: Ethical Practices */}
          <div className={styles.mobilePillarCol}>
            <div className={styles.mobilePillarIconWrap}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                <path d="M4 14c1.8-1.2 3.8-.5 5 1.2l3 3.3" strokeWidth="1.2" />
                <path d="M20 14c-1.8-1.2-3.8-.5-5 1.2l-3 3.3" strokeWidth="1.2" />
              </svg>
            </div>
            <span className={styles.mobilePillarText}>
              ETHICAL<br />PRACTICES
            </span>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Pillar 3: Honest Craftsmanship */}
          <div className={styles.mobilePillarCol}>
            <div className={styles.mobilePillarIconWrap}>
              <svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3.5h14c.6 0 1 .4 1 1s-.4 1-1 1H5c-.6 0-1-.4-1-1s.4-1 1-1z" />
                <path d="M5 20.5h14c.6 0 1 .4 1 1s-.4 1-1 1H5c-.6 0-1-.4-1-1s.4-1 1-1z" />
                <path d="M7 5.5v15M17 5.5v15" />
                <ellipse cx="12" cy="9" rx="4" ry="1.2" />
                <ellipse cx="12" cy="12" rx="4" ry="1.2" />
                <ellipse cx="12" cy="15" rx="4" ry="1.2" />
                <ellipse cx="12" cy="18" rx="4" ry="1.2" />
              </svg>
            </div>
            <span className={styles.mobilePillarText}>
              HONEST<br />CRAFTSMANSHIP
            </span>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Pillar 4: Rooted In Tradition */}
          <div className={styles.mobilePillarCol}>
            <div className={styles.mobilePillarIconWrap}>
              <svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V3" />
                <path d="M12 3c-1.5 2.5-1.5 4.5 0 6 1.5-1.5 1.5-3.5 0-6z" />
                <path d="M12 11c-3.5-1-6 0-7 2.5 2 1.5 4.5 1 7-1z" />
                <path d="M12 11c3.5-1 6 0 7 2.5-2 1.5-4.5 1-7-1z" />
                <path d="M12 16c-3-1-5 0-6 2 1.5 1.2 3.5.8 6-1z" />
                <path d="M12 16c3-1 5 0 6 2-1.5 1.2-3.5.8-6-1z" />
              </svg>
            </div>
            <span className={styles.mobilePillarText}>
              ROOTED IN<br />TRADITION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TheStory;
