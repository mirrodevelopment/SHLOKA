import { forwardRef, useRef } from 'react';
import sec4Img from '../../assets/Sec-4.png';
import craftTextImg from '../../assets/Thecraft-text-image.png';
import weaveHeroFabricImg from '../../assets/the weave-home-screen-img.png';
import weaveArchLoomImg from '../../assets/the weave-home-screen-img2.png';
import weaveIcon1 from '../../assets/the weave-home-screen-icon1.png';
import weaveIcon2 from '../../assets/the weave-home-screen-icon2.png';
import weaveIcon3 from '../../assets/the weave-home-screen-icon3.png';
import weaveIcon4 from '../../assets/the weave-home-screen-icon4.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import styles from './TheCraft.module.css';

const TheCraft = forwardRef(function TheCraft(props, ref) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="craft"
      aria-label="The Craft - Chapter III"
    >
      {/* ── DESKTOP EXCLUSIVE VIEW (min-width: 769px) ── */}
      <div className={styles.desktopOnlyCraft}>
        {/* Top Center Section Header */}
        <header className={styles.header}>
          {/* The Craft Artwork Banner Image */}
          <div className={styles.craftArtwork}>
            <img src={craftTextImg} alt="" className={styles.craftArtworkImg} />
          </div>

          {/* Top Blooming Lotus Motif */}
          <div className={styles.topLotus} aria-hidden="true" data-craft-text>
            <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
          </div>

          {/* Eyebrow */}
          <span className={styles.eyebrow} data-craft-text>THE CRAFT</span>

          {/* Main Luxury Title */}
          <h2 className={styles.title} data-craft-text>
            T H E&nbsp;&nbsp;W E A V E
          </h2>

          {/* Diamond Line Divider */}
          <div className={styles.diamondDivider} aria-hidden="true" data-craft-text>
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>

          {/* Subtitle Verses */}
          <p className={styles.subtitle} data-craft-text>Woven by hand. Rooted in tradition. Made to last.</p>

          {/* Bottom Pillar Tagline */}
          <div className={styles.taglineBar} data-craft-text>
            <span>THREAD</span>
            <span className={styles.bullet}>•</span>
            <span>WEAVE</span>
            <span className={styles.bullet}>•</span>
            <span>MOTIF</span>
            <span className={styles.bullet}>•</span>
            <span>DRAPE</span>
          </div>
        </header>

        {/* Split Grid: Left Quote Card + Right Silk Fabric Photo */}
        <div className={styles.splitGrid}>
          {/* Left Luxury Craft Story Card */}
          <div className={styles.leftCard}>
            <div className={styles.craftCardContent}>
              {/* Top Blooming Lotus Flourish */}
              <div className={styles.cardTopFlourish} aria-hidden="true" data-craft-text>
                <span className={styles.flourishLine} />
                <div className={styles.flourishLotus}>
                  <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
                </div>
                <span className={styles.flourishLine} />
              </div>

              {/* H1: Main Card Title */}
              <h3 className={styles.cardMainTitle} data-craft-text>
                THE ART OF<br />THE WEAVE
              </h3>

              {/* Middle Lotus Flourish Divider */}
              <div className={styles.cardLotusDivider} aria-hidden="true" data-craft-text>
                <span className={styles.flourishLine} />
                <div className={styles.flourishLotusSmall}>
                  <BloomingLotusIcon width={18} height={13} stroke="#A98455" />
                </div>
                <span className={styles.flourishLine} />
              </div>

              {/* H2: Subtitle */}
              <h4 className={styles.cardSubtitle} data-craft-text>
                From a Single Thread<br />to Timeless Elegance
              </h4>

              {/* Diamond Divider */}
              <div className={styles.cardDiamondDivider} aria-hidden="true" data-craft-text>
                <span className={styles.flourishLine} />
                <span className={styles.flourishDiamond} />
                <span className={styles.flourishLine} />
              </div>

              {/* Body Text */}
              <p className={styles.cardBodyText} data-craft-text>
                Every saree begins with a single thread, guided by skilled hands and generations of artistry. Through patience, precision, and tradition, each weave transforms into a timeless expression of elegance and craftsmanship.
              </p>

              {/* Bottom Flourish with Lotus and Dots */}
              <div className={styles.cardBottomFlourish} aria-hidden="true" data-craft-text>
                <span className={styles.flourishDot} />
                <span className={styles.flourishLineShort} />
                <div className={styles.flourishLotus}>
                  <BloomingLotusIcon width={22} height={15} stroke="#A98455" />
                </div>
                <span className={styles.flourishLineShort} />
                <span className={styles.flourishDot} />
              </div>
            </div>
          </div>

          {/* Right Silk Fabric Photograph Banner */}
          <div className={styles.rightImageFrame}>
            <img
              src={sec4Img}
              alt="SHLOKA Heritage Craftsmanship — Gold Zari Silk Weave Fabric"
              className={styles.craftImage}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE EXCLUSIVE VIEW (max-width: 768px) ── */}
      <div className={styles.mobileOnlyCraft}>
        {/* 1. Marked Top Artwork (Weaver Lady at Loom) - Preserved exactly as requested */}
        <div className={styles.mobileMarkedArtwork}>
          <img src={craftTextImg} alt="The Craft Heritage" className={styles.mobileMarkedImg} />
        </div>

        {/* 2. Header Emblem & Titles */}
        <div className={styles.mobileHeaderBlock}>
          <div className={styles.mobileLotus}>
            <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
          </div>
          <span className={styles.mobileEyebrow}>T H E &nbsp; W E A V E</span>
          <h2 className={styles.mobileHeadline}>Woven slowly. Finished by hand.</h2>
          <p className={styles.mobileSubline}>
            A tribute to generations of weavers<br />
            and the heritage they carry forward.
          </p>
        </div>

        {/* 3. Hero Saree Fabric Image */}
        <div className={styles.mobileFabricHeroWrap}>
          <img
            src={weaveHeroFabricImg}
            alt="Handwoven Kanchipuram Silk with pure gold zari floral brocade"
            className={styles.mobileFabricHeroImg}
            loading="lazy"
          />
        </div>

        {/* 4. Four Pillar Specification Columns with Vertical Dividers */}
        <div className={styles.mobilePillarsGrid}>
          {/* Column 1: Pure Silk */}
          <div className={styles.mobilePillarCol}>
            <img src={weaveIcon1} alt="Pure Silk" className={styles.mobilePillarIcon} />
            <h4 className={styles.mobilePillarTitle}>PURE SILK</h4>
            <p className={styles.mobilePillarDesc}>Luxurious silk that drapes like a dream.</p>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Column 2: Handwoven */}
          <div className={styles.mobilePillarCol}>
            <img src={weaveIcon2} alt="Handwoven" className={styles.mobilePillarIcon} />
            <h4 className={styles.mobilePillarTitle}>HANDWOVEN</h4>
            <p className={styles.mobilePillarDesc}>Woven by skilled hands on traditional looms.</p>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Column 3: Tested Zari */}
          <div className={styles.mobilePillarCol}>
            <img src={weaveIcon3} alt="Tested Zari" className={styles.mobilePillarIcon} />
            <h4 className={styles.mobilePillarTitle}>TESTED ZARI</h4>
            <p className={styles.mobilePillarDesc}>Real zari, tested for purity and quality.</p>
          </div>

          <div className={styles.mobilePillarDivider} aria-hidden="true" />

          {/* Column 4: Tamil Nadu */}
          <div className={styles.mobilePillarCol}>
            <img src={weaveIcon4} alt="Tamil Nadu" className={styles.mobilePillarIcon} />
            <h4 className={styles.mobilePillarTitle}>TAMIL NADU</h4>
            <p className={styles.mobilePillarDesc}>Proudly woven in the heart of Tamil Nadu.</p>
          </div>
        </div>

        {/* 5. Horizontal Diamond Divider */}
        <div className={styles.mobileDiamondLine} aria-hidden="true">
          <span className={styles.mobileDivLine} />
          <span className={styles.mobileDivDot} />
          <span className={styles.mobileDivLine} />
        </div>

        {/* 6. Pit-Loom Arches Illustration */}
        <div className={styles.mobileLoomArchWrap}>
          <img
            src={weaveArchLoomImg}
            alt="Traditional Pit Loom in Royal Court Arches"
            className={styles.mobileLoomArchImg}
            loading="lazy"
          />
        </div>

        {/* 7. Concluding Craft Verse */}
        <div className={styles.mobileFooterTextWrap}>
          <p className={styles.mobileFooterQuote}>
            Every saree is a story of time, tradition and craftsmanship.
          </p>
          <span className={styles.mobileFooterTagline}>
            WOVEN WITH PURPOSE. MADE TO BE CHERISHED.
          </span>
        </div>
      </div>
    </section>
  );
});

export default TheCraft;
