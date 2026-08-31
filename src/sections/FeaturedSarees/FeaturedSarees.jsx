import { forwardRef, useRef } from 'react';
import saree1Img from '../../assets/Sec-5-1.png';
import saree2Img from '../../assets/Sec-5-2.png';
import saree3Img from '../../assets/Sec-5-3.png';
import viewSareeBtnImg from '../../assets/ViewSaree-Btn.png';
import exploreCollectionBtnImg from '../../assets/Explore Collection-Btn.png';
import exploreCollectionBtnHoverImg from '../../assets/Explore Collection-Btn2.png';
import featuredSareeTextImg from '../../assets/featured-saree-text-img.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import { addToCart } from '../../utils/cart';
import styles from './FeaturedSarees.module.css';

const FEATURED_SAREES = [
  {
    id: 'saree-padma',
    name: 'PADMA',
    subtitle: 'Champagne Gold Tissue Silk Saree with Antique Floral Zari',
    craft: 'Pure Mulberry Silk • 3-Ply Gold Zari',
    sku: 'SHL-PAD-01',
    price: 78000,
    image: saree1Img,
    alt: 'SHLOKA Padma Saree — Champagne gold silk saree with golden floral motifs',
  },
  {
    id: 'saree-ritu',
    name: 'RITU',
    subtitle: 'Royal Crimson Red Kanchipuram Silk Saree with Gold Temple Zari',
    craft: 'Handwoven Pure Silk • 24K Electroplated Zari',
    sku: 'SHL-RTU-02',
    price: 94500,
    image: saree2Img,
    alt: 'SHLOKA Ritu Saree — Royal crimson red zari silk saree',
  },
  {
    id: 'saree-megh',
    name: 'MEGH',
    subtitle: 'Varanasi Sage Green Silk Saree with Intricate Gold Weave',
    craft: 'Handwoven Mulberry Silk • Fine Kadwa Zari',
    sku: 'SHL-MGH-03',
    price: 82000,
    image: saree3Img,
    alt: 'SHLOKA Megh Saree — Sage green silk saree with intricate gold weave',
  },
];

const FeaturedSarees = forwardRef(function FeaturedSarees(props, ref) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="featured-sarees"
      aria-label="Featured Sarees"
    >
      <div className={styles.container}>
        {/* Saree Calligraphy Artwork Banner */}
        <div className={styles.sareeArtwork} data-saree-text>
          <img src={featuredSareeTextImg} alt="" className={styles.sareeArtworkImg} />
        </div>

        {/* Header Block */}
        <header className={styles.header}>
          <div className={styles.topLotus} aria-hidden="true" data-saree-text>
            <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
          </div>

          <span className={styles.eyebrow} data-saree-text>FEATURED</span>

          <h2 className={styles.title} data-saree-text>S A R E E S</h2>

          <div className={styles.diamondDivider} aria-hidden="true" data-saree-text>
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>

          <p className={styles.subtitle} data-saree-text>Timeless weaves, eternal beauty.</p>
        </header>

        {/* 3 Featured Sarees Cards Grid */}
        <div className={styles.grid}>
          {FEATURED_SAREES.map((item) => (
            <article key={item.id} className={styles.card}>
              <div
                className={styles.imageWrapper}
                onClick={() => {
                  if (props.onSelectProduct) {
                    props.onSelectProduct(item);
                  } else {
                    addToCart(item);
                    window.location.hash = '#cart';
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.name} saree details`}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardFooter}>
                <h3 className={styles.cardName} data-saree-text>{item.name}</h3>
                <button
                  type="button"
                  className={styles.viewSareeBtnLink}
                  data-saree-text
                  aria-label={`View ${item.name} details`}
                  onClick={() => {
                    if (props.onSelectProduct) {
                      props.onSelectProduct(item);
                    } else {
                      addToCart(item);
                      window.location.hash = '#cart';
                    }
                  }}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <img
                    src={viewSareeBtnImg}
                    alt="View Saree"
                    className={styles.viewSareeBtnImg}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Explore Collection CTA */}
        <footer className={styles.footer} data-saree-text>
          <div className={styles.bottomLotus} aria-hidden="true">
            <BloomingLotusIcon width={20} height={15} stroke="#A98455" />
          </div>

          <a
            href="#collections"
            className={styles.exploreBtnLink}
            aria-label="Explore The Collection"
          >
            <img
              src={exploreCollectionBtnImg}
              alt="Explore The Collection"
              className={styles.exploreBtnDefault}
            />
            <img
              src={exploreCollectionBtnHoverImg}
              alt="Explore The Collection"
              className={styles.exploreBtnHover}
              aria-hidden="true"
            />
          </a>
        </footer>
      </div>
    </section>
  );
});

export default FeaturedSarees;
