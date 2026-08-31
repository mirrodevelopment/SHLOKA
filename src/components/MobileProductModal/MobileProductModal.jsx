import { useState, useEffect, useRef } from 'react';
import padmaImg from '../../assets/Padma-Saree.png';
import padmaStandingImg from '../../assets/image (2).png';
import padmaDetailImg from '../../assets/Padma-Saree-page-img2.png';
import saree1Img from '../../assets/Saree-1.png';
import saree2Img from '../../assets/Saree-2.png';
import saree4Img from '../../assets/Saree-4.png';
import weaveArchImg from '../../assets/Padma-Saree-theweave-img.png';
import blouseImg from '../../assets/padma-blouse.jpg';
import potliImg from '../../assets/padma-potli.jpg';
import sareeFallImg from '../../assets/padma-saree-fall.png';
import sareeCoverImg from '../../assets/Saree-Cover.png';
import plusIconImg from '../../assets/plus-icon.png';
import flowerIconImg from '../../assets/Flower-icon.png';
import shlokaLogoTypo from '../../assets/Shloka-Logo-Typo.png';
import addToBagBtnImg from '../../assets/Add-to-bag-btn.png';
import discoverMoreBtnImg from '../../assets/DiscoverMore-Btn.png';
import { addToCart, getCartCount } from '../../utils/cart';
import { isInWishlist, toggleWishlist } from '../../utils/wishlist';
import styles from './MobileProductModal.module.css';

const ACCESSORIES = [
  {
    id: 'acc-blouse',
    name: 'PADMA BLOUSE',
    subtitle: 'Silk Brocade',
    price: 8900,
    image: blouseImg,
    category: 'Blouse',
  },
  {
    id: 'acc-petticoat',
    name: 'PADMA PETTICOAT',
    subtitle: 'Cotton Silk',
    price: 2200,
    image: potliImg,
    category: 'Petticoat',
  },
  {
    id: 'acc-saree-fall',
    name: 'PADMA SAREE FALL',
    subtitle: 'Silk with Zari',
    price: 1800,
    image: sareeFallImg,
    category: 'Accessories',
  },
  {
    id: 'acc-saree-cover',
    name: 'SAREE COVER',
    subtitle: 'Premium Fabric',
    price: 1200,
    image: sareeCoverImg,
    category: 'Accessories',
  },
];

const RELATED_SAREES = [
  {
    id: 'saree-padma',
    name: 'PADMA',
    subtitle: 'Kanchipuram Silk Saree',
    price: 48500,
    image: saree1Img,
  },
  {
    id: 'saree-megh',
    name: 'MEGH',
    subtitle: 'Banarasi Silk Saree',
    price: 46800,
    image: saree2Img,
  },
  {
    id: 'saree-sitara',
    name: 'SITARA',
    subtitle: 'Royal Purple Silk Saree',
    price: 54500,
    image: saree4Img,
  },
];

export default function MobileProductModal({
  product,
  onClose,
  onOpenBag,
  onSelectProduct,
  onNavigateToWeave,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [toastMessage, setToastMessage] = useState('');
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  const handleWeaveRedirect = () => {
    if (onNavigateToWeave) {
      onNavigateToWeave();
    } else {
      onClose?.();
      setTimeout(() => {
        const el = document.getElementById('craft');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  };

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 180, behavior: 'smooth' });
    }
  };

  // Gallery slides: For PADMA, use the rich high-res sequence
  const isPadma = !product || product.id === 'saree-padma' || product.name?.toLowerCase() === 'padma';
  const slides = isPadma
    ? [padmaImg, potliImg, blouseImg, padmaDetailImg, padmaStandingImg, saree1Img]
    : [product.image, saree1Img, saree2Img, saree4Img];

  const totalSlides = slides.length;

  useEffect(() => {
    if (product) {
      setInWishlist(isInWishlist(product.id));
      setActiveSlide(0);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [product]);

  useEffect(() => {
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener('shloka_cart_updated', handleCartUpdate);
    return () => window.removeEventListener('shloka_cart_updated', handleCartUpdate);
  }, []);

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
      setInWishlist((prev) => !prev);
      showToast(!inWishlist ? 'Saved to your Wishlist' : 'Removed from Wishlist');
    }
  };

  const handleAddToCart = (itemToAdd = product) => {
    if (itemToAdd) {
      addToCart(itemToAdd);
      showToast(`${itemToAdd.name} added to Bag`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  // Touch swipe support for gallery
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 45) {
      // Swiped left -> next slide
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }
    if (touchEnd - touchStart > 45) {
      // Swiped right -> prev slide
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  if (!product) return null;

  const displayPrice = product.price || 48500;
  const displayName = product.name || 'PADMA';
  const displaySubtitle = product.subtitle || 'Kanchipuram Silk Saree';

  return (
    <div className={styles.pageScreen} role="region" aria-label="Product Detail">
      {/* ── 1. Top Header Bar ── */}
      <header className={styles.topHeader}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Back to Shop"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#26201B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.headerBrand} onClick={onClose} role="button" tabIndex={0} aria-label="Shloka Home">
          <img src={shlokaLogoTypo} alt="Shloka" className={styles.headerBrandLogo} />
        </div>

        <div className={styles.headerRightActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={inWishlist ? '#8A1528' : 'none'}
              stroke={inWishlist ? '#8A1528' : '#26201B'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={onOpenBag}
            aria-label={`Shopping Bag (${cartCount} items)`}
          >
            <div className={styles.bagIconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#26201B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* ── Scrollable Body ── */}
      <div className={styles.scrollContent} ref={containerRef}>
        {/* ── 2. Main Hero Gallery with Vertical Pagination ── */}
        <section
          className={styles.galleryHeroSection}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Product Image Gallery"
        >
          {/* Vertical Slide Indicator on Left */}
          <div className={styles.verticalPagination} aria-hidden="true">
            <span className={styles.pageNumber}>01</span>
            <div className={styles.dotTrack}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.pageDot} ${activeSlide === idx ? styles.pageDotActive : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className={styles.pageNumber}>{String(totalSlides).padStart(2, '0')}</span>
          </div>

          {/* Active Image with subtle luxury breathing animation */}
          <div className={styles.heroImageFrame}>
            <img
              src={slides[activeSlide]}
              alt={`${displayName} Saree angle ${activeSlide + 1}`}
              className={styles.heroImg}
            />
          </div>
        </section>

        {/* ── 3. Title, Subtitle, Price & Top "ADD TO BAG" ── */}
        <section className={styles.productMainRow}>
          <div className={styles.titlePriceCol}>
            <h1 className={styles.productName}>{displayName}</h1>
            <p className={styles.productSubtitle}>{displaySubtitle}</p>
            <p className={styles.productPrice}>₹ {displayPrice.toLocaleString('en-IN')}</p>
          </div>

          <button
            type="button"
            className={styles.topAddBagImgBtn}
            onClick={() => handleAddToCart(product)}
            aria-label="Add to Bag"
          >
            <img src={addToBagBtnImg} alt="Add to Bag" className={styles.topBtnPatchImg} />
          </button>
        </section>

        {/* ── 4. "THE WEAVE" Craft Heritage Section ── */}
        <section className={styles.theWeaveSection} aria-label="The Weave Craft Details">
          <div className={styles.weaveContainer}>
            {/* Left Column: Pit-Loom Architectural Illustration */}
            <div className={styles.weaveArchCol}>
              <img
                src={weaveArchImg}
                alt="Traditional Indian Handloom Pit Loom in Archway"
                className={styles.weaveArchImg}
                loading="lazy"
              />
            </div>

            {/* Right Column: Title, Note & Specs Table */}
            <div className={styles.weaveDetailsCol}>
              <div
                className={styles.weaveHeaderRow}
                onClick={handleWeaveRedirect}
                role="button"
                tabIndex={0}
                aria-label="View The Weave craft section on home screen"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleWeaveRedirect();
                  }
                }}
              >
                <div className={styles.weaveTitleGroup}>
                  <img src={flowerIconImg} alt="" className={styles.weaveLotus} />
                  <h2 className={styles.weaveTitle}>THE WEAVE</h2>
                </div>
                <button
                  type="button"
                  className={styles.weaveChevronBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWeaveRedirect();
                  }}
                  aria-label="Redirect to The Weave on home screen"
                >
                  <span className={styles.weaveChevron}>›</span>
                </button>
              </div>

              <p className={styles.weaveDescription}>
                Woven in pure silk, finished with traditional zari craftsmanship.
              </p>

              <div className={styles.specsGrid}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>FABRIC</span>
                  <span className={styles.specValue}>Pure Kanchipuram Silk</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>ZARI</span>
                  <span className={styles.specValue}>Tested Zari</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>CRAFT</span>
                  <span className={styles.specValue}>Handwoven</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>ORIGIN</span>
                  <span className={styles.specValue}>Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Heritage Story Banner with Inset Text and Button ── */}
        <section className={styles.storyBannerSection}>
          <div className={styles.storyBannerContainer}>
            <img
              src={padmaDetailImg}
              alt="Padma Saree Heritage Weave"
              className={styles.storyBannerImg}
              loading="lazy"
            />
            <div className={styles.storyContentOverlay}>
              <h3 className={styles.storyTitle}>
                Every thread<br />carries a story.
              </h3>
              <div className={styles.storyDividerLine}>
                <span className={styles.dividerBar} />
                <span className={styles.dividerStar}>✧</span>
                <span className={styles.dividerBar} />
              </div>
              <button
                type="button"
                className={styles.discoverImgBtn}
                onClick={() => showToast('Opening The Artisan Story')}
                aria-label="Discover more about the weaver's journey"
              >
                <img src={discoverMoreBtnImg} alt="Discover More" className={styles.discoverBtnPatchImg} />
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. "COMPLETE THE LOOK" Section ── */}
        <section className={styles.completeLookSection} aria-label="Complete The Look">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>COMPLETE THE LOOK</h2>
            <button
              type="button"
              className={styles.viewAllLink}
              onClick={() => showToast('Opening Accessories Atelier')}
            >
              VIEW ALL →
            </button>
          </div>

          <div className={styles.carouselWrapper}>
            <button
              type="button"
              className={`${styles.carouselArrowBtn} ${styles.carouselArrowLeft}`}
              onClick={() => scrollCarousel(-1)}
              aria-label="Previous accessories"
            >
              ‹
            </button>

            <div className={styles.accessoriesRow} ref={carouselRef}>
              {ACCESSORIES.map((item) => (
                <div
                  key={item.id}
                  className={styles.accessoryCard}
                  onClick={() => handleAddToCart(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Add ${item.name} for ₹${item.price.toLocaleString('en-IN')}`}
                >
                  <div className={styles.accessoryMedia}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.accessoryImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.accessoryInfo}>
                    <h4 className={styles.accessoryName}>{item.name}</h4>
                    <p className={styles.accessorySubtitle}>{item.subtitle}</p>
                    <div className={styles.accessoryBottomRow}>
                      <span className={styles.accessoryPrice}>₹ {item.price.toLocaleString('en-IN')}</span>
                      <button
                        type="button"
                        className={styles.plusPatchBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        aria-label={`Add ${item.name} to Bag`}
                      >
                        <img src={plusIconImg} alt="Add" className={styles.plusPatchImg} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.carouselArrowBtn} ${styles.carouselArrowRight}`}
              onClick={() => scrollCarousel(1)}
              aria-label="Next accessories"
            >
              ›
            </button>
          </div>
        </section>

        {/* ── 7. "YOU MAY ALSO LOVE" Section ── */}
        <section className={styles.youMayLoveSection} aria-label="You May Also Love">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>YOU MAY ALSO LOVE</h2>
            <button
              type="button"
              className={styles.viewAllLink}
              onClick={onClose}
            >
              VIEW ALL →
            </button>
          </div>

          <div className={styles.relatedRow}>
            {RELATED_SAREES.map((relSaree) => {
              const isRelWish = isInWishlist(relSaree.id);
              return (
                <div
                  key={relSaree.id}
                  className={styles.relatedCard}
                  onClick={() => onSelectProduct?.(relSaree)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.relatedMedia}>
                    <img
                      src={relSaree.image}
                      alt={relSaree.name}
                      className={styles.relatedImg}
                      loading="lazy"
                    />
                    <button
                      type="button"
                      className={styles.relatedWishBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(relSaree);
                        setInWishlist((prev) => !prev);
                      }}
                      aria-label="Wishlist"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={isRelWish ? '#8A1528' : 'none'}
                        stroke={isRelWish ? '#8A1528' : '#FFFFFF'}
                        strokeWidth="1.8"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Extra spacing for sticky bottom bar */}
        <div className={styles.bottomSpacer} />
      </div>

      {/* ── 8. Fixed Bottom Sticky Action Bar ── */}
      <footer className={styles.stickyFooterBar}>
        <div className={styles.stickyPriceCol}>
          <span className={styles.stickyPriceLabel}>TOTAL AMOUNT</span>
          <span className={styles.stickyPriceValue}>₹ {displayPrice.toLocaleString('en-IN')}</span>
        </div>

        <button
          type="button"
          className={styles.stickyAddBagImgBtn}
          onClick={() => handleAddToCart(product)}
          aria-label="Add to Bag"
        >
          <img src={addToBagBtnImg} alt="Add to Bag" className={styles.stickyBtnPatchImg} />
        </button>
      </footer>

      {/* ── Live Toast Notification ── */}
      {toastMessage && (
        <div className={styles.toastNotification} role="status">
          <span className={styles.toastDot}>●</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
