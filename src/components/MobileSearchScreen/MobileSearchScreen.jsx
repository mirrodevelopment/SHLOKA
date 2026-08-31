import { useState, useEffect, useRef } from 'react';
import shopMobileImg from '../../assets/shop-mobile-img.png';
import saree1Img from '../../assets/Saree-1.png';
import saree2Img from '../../assets/Saree-2.png';
import saree3Img from '../../assets/Saree-3.png';
import saree4Img from '../../assets/Saree-4.png';
import sec51Img from '../../assets/Sec-5-1.png';
import sec52Img from '../../assets/Sec-5-2.png';
import sec53Img from '../../assets/Sec-5-3.png';
import tariniImg from '../../assets/Sec-4.png';
import flowerIconImg from '../../assets/Flower-icon.png';
import plusIconImg from '../../assets/plus-icon.png';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import sec2TextImg from '../../assets/sec2-text-img.png';
import cat1Img from '../../assets/Category-1.png';
import cat2Img from '../../assets/Category-2.png';
import cat3Img from '../../assets/Category-3.png';
import cat4Img from '../../assets/Category-4.png';
import cat5Img from '../../assets/Category-5.png';
import cat6Img from '../../assets/Category-6.png';
import cat7Img from '../../assets/Category-7.png';
import cat8Img from '../../assets/Category-8.png';
import cat9Img from '../../assets/Category-9.png';
import cat10Img from '../../assets/Category-10.png';
import cat11Img from '../../assets/Category-11.png';
import cat12Img from '../../assets/Category-12.png';
import { isInWishlist, toggleWishlist } from '../../utils/wishlist';
import styles from './MobileSearchScreen.module.css';

const SHOP_CATEGORIES = [
  { id: 'cat-1', name: 'SAREES', image: cat1Img, chip: 'ALL' },
  { id: 'cat-2', name: 'NEW ARRIVALS', image: cat2Img, chip: 'NEW ARRIVALS' },
  { id: 'cat-3', name: 'BRIDALS', image: cat3Img, chip: 'BRIDAL' },
  { id: 'cat-4', name: 'BLOUSES', image: cat4Img, chip: 'SILK' },
  { id: 'cat-5', name: 'ETHNIC WEAR', image: cat5Img, chip: 'ALL' },
  { id: 'cat-6', name: 'LEHANGAS', image: cat6Img, chip: 'ALL' },
  { id: 'cat-7', name: 'KURTIS', image: cat7Img, chip: 'ALL' },
  { id: 'cat-8', name: 'SALWARS', image: cat8Img, chip: 'ALL' },
  { id: 'cat-9', name: 'KURTA SET', image: cat9Img, chip: 'ALL' },
  { id: 'cat-10', name: 'CO-ORDS', image: cat10Img, chip: 'ALL' },
  { id: 'cat-11', name: 'INDO WESTERN', image: cat11Img, chip: 'ALL' },
  { id: 'cat-12', name: 'CASUAL WEAR', image: cat12Img, chip: 'ALL' },
];

const SHOP_CHIPS = [
  'ALL',
  'NEW ARRIVALS',
  'BEST SELLERS',
  'SILK',
  'KANCHIPURAM',
  'BANARASI',
  'BRIDAL',
];

const SHOP_SAREES = [
  {
    id: 'saree-padma',
    name: 'PADMA',
    subtitle: 'Kanchipuram Silk Saree',
    price: 48500,
    originalPrice: 54000,
    image: saree1Img,
    badge: 'NEW',
    category: 'KANCHIPURAM',
    tags: ['ALL', 'NEW ARRIVALS', 'SILK', 'KANCHIPURAM', 'BRIDAL'],
    fabric: 'Pure Mulberry Silk',
  },
  {
    id: 'saree-megh',
    name: 'MEGH',
    subtitle: 'Banarasi Silk Saree',
    price: 46800,
    originalPrice: 51000,
    image: saree2Img,
    badge: 'NEW',
    category: 'BANARASI',
    tags: ['ALL', 'NEW ARRIVALS', 'SILK', 'BANARASI'],
    fabric: 'Katan Silk',
  },
  {
    id: 'saree-amara',
    name: 'AMARA',
    subtitle: 'Chanderi Tissue Silk Saree',
    price: 52000,
    originalPrice: 58000,
    image: saree3Img,
    badge: 'BEST SELLER',
    category: 'SILK',
    tags: ['ALL', 'BEST SELLERS', 'SILK', 'HERITAGE'],
    fabric: 'Tissue Silk',
  },
  {
    id: 'saree-sitara',
    name: 'SITARA',
    subtitle: 'Royal Purple Silk Saree',
    price: 54500,
    originalPrice: 60000,
    image: saree4Img,
    badge: 'NEW',
    category: 'SILK',
    tags: ['ALL', 'NEW ARRIVALS', 'SILK', 'KANCHIPURAM'],
    fabric: 'Mulberry Silk',
  },
  {
    id: 'saree-ritu',
    name: 'RITU',
    subtitle: 'Royal Crimson Red Saree',
    price: 94500,
    originalPrice: 102000,
    image: sec52Img,
    badge: 'BEST SELLER',
    category: 'BRIDAL',
    tags: ['ALL', 'BEST SELLERS', 'BRIDAL', 'KANCHIPURAM', 'SILK'],
    fabric: 'Heavy GSM Pure Silk',
  },
  {
    id: 'saree-vaanya',
    name: 'VAANYA',
    subtitle: 'Pure Ivory Chanderi Saree',
    price: 72000,
    originalPrice: 78000,
    image: sec51Img,
    badge: 'BEST SELLER',
    category: 'SILK',
    tags: ['ALL', 'BEST SELLERS', 'SILK'],
    fabric: 'Pure Chanderi Silk',
  },
  {
    id: 'saree-ananya',
    name: 'ANANYA',
    subtitle: 'Vermilion Red Bridal Saree',
    price: 110000,
    originalPrice: 120000,
    image: sec53Img,
    badge: 'NEW',
    category: 'BRIDAL',
    tags: ['ALL', 'NEW ARRIVALS', 'BRIDAL', 'SILK'],
    fabric: 'Heavy GSM Pure Silk',
  },
  {
    id: 'saree-tarini',
    name: 'TARINI',
    subtitle: 'Amber Gold Mulberry Saree',
    price: 89000,
    originalPrice: 95000,
    image: tariniImg,
    badge: 'NEW',
    category: 'KANCHIPURAM',
    tags: ['ALL', 'NEW ARRIVALS', 'KANCHIPURAM', 'SILK'],
    fabric: 'Mulberry Silk',
  },
];

export default function MobileSearchScreen({ onBack, onSelectProduct }) {
  const sareesSectionRef = useRef(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [activeChip, setActiveChip] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [, setWishlistTick] = useState(0);

  const handleCategoryClick = (cat) => {
    setSelectedCategoryId(cat.id);
    if (cat.chip) {
      setActiveChip(cat.chip);
    }
    if (cat.id === 'cat-1' || cat.name === 'SAREES') {
      setTimeout(() => {
        if (sareesSectionRef.current) {
          sareesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Sync wishlist across the app
  useEffect(() => {
    const handleWishlistChange = () => setWishlistTick((t) => t + 1);
    window.addEventListener('shloka_wishlist_updated', handleWishlistChange);
    return () => window.removeEventListener('shloka_wishlist_updated', handleWishlistChange);
  }, []);

  // Filter items
  const filteredItems = SHOP_SAREES.filter((saree) => {
    const matchesChip =
      activeChip === 'ALL' ||
      saree.tags.includes(activeChip) ||
      saree.category === activeChip;

    const matchesFabric =
      selectedFabric === 'all' ||
      saree.fabric.toLowerCase().includes(selectedFabric.toLowerCase());

    return matchesChip && matchesFabric;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
    return 0;
  });

  return (
    <div className={styles.screen} role="region" aria-label="Shop Sarees">
      {/* ── 0. Shop by Category Section (Matches Reference Image 2) ── */}
      <section className={styles.shopByCategorySection} aria-label="Shop by Category">
        <div className={styles.categoryHeaderWrap}>
          <div className={styles.categoryArtworkWrap}>
            <img
              src={sec2TextImg}
              alt="The Collection Heritage Artwork"
              className={styles.categoryArtworkImg}
            />
          </div>
          <h2 className={styles.categoryHeading}>SHOP BY CATEGORY</h2>
          <div className={styles.categoryOrnament} aria-hidden="true">
            <span className={styles.ornamentLine} />
            <BloomingLotusIcon width={22} height={15} stroke="#A07F3A" />
            <span className={styles.ornamentLine} />
          </div>
        </div>

        <div className={styles.categoryCarouselWrapper}>
          {/* Row 1 Carousel */}
          <div className={styles.categoryCarouselRow}>
            {SHOP_CATEGORIES.slice(0, 6).map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryCard} ${isSelected ? styles.categoryCardActive : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                  aria-label={`Shop ${cat.name}`}
                >
                  <div className={styles.categoryMedallion}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className={styles.categoryImg}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.categoryLabel}>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Row 2 Carousel */}
          <div className={styles.categoryCarouselRow}>
            {SHOP_CATEGORIES.slice(6, 12).map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryCard} ${isSelected ? styles.categoryCardActive : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                  aria-label={`Shop ${cat.name}`}
                >
                  <div className={styles.categoryMedallion}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className={styles.categoryImg}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.categoryLabel}>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 1. Top Title Banner with Botanical Tree Artwork ── */}
      <div className={styles.titleBanner} ref={sareesSectionRef} id="sarees-section">
        <div className={styles.bannerTextCol}>
          <h1 className={styles.bannerTitle}>S A R E E S</h1>
          <div className={styles.diamondDivider} aria-hidden="true">
            <span className={styles.diamondLine} />
            <span className={styles.diamondDot} />
            <span className={styles.diamondLine} />
          </div>
          <p className={styles.bannerSubtitle}>Timeless weaves, eternal beauty.</p>
        </div>
        <div className={styles.treeArtworkWrap} aria-hidden="true">
          <img
            src={shopMobileImg}
            alt=""
            className={styles.treeArtworkImg}
          />
        </div>
      </div>

      {/* ── 2. Controls Bar: Filter | Count | Sort ── */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={`${styles.pillControlBtn} ${isFilterOpen ? styles.pillControlBtnActive : ''}`}
          onClick={() => setIsFilterOpen(true)}
          aria-label="Filter Sarees"
        >
          <span>FILTER</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
            <circle cx="8" cy="6" r="2.5" fill="#FCFAF6" stroke="currentColor" strokeWidth="2" />
            <circle cx="16" cy="18" r="2.5" fill="#FCFAF6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <span className={styles.itemsCountText}>
          {activeChip === 'ALL' && selectedFabric === 'all' ? '125 ITEMS' : `${sortedItems.length} ITEMS`}
        </span>

        <div className={styles.sortWrapper}>
          <button
            type="button"
            className={`${styles.pillControlBtn} ${isSortOpen ? styles.pillControlBtnActive : ''}`}
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-label="Sort Sarees"
          >
            <span>SORT</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isSortOpen ? styles.chevronRotated : ''}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Quick Sort Dropdown Menu */}
          {isSortOpen && (
            <div className={styles.sortDropdown}>
              <button
                type="button"
                className={`${styles.sortOption} ${sortBy === 'featured' ? styles.sortOptionActive : ''}`}
                onClick={() => {
                  setSortBy('featured');
                  setIsSortOpen(false);
                }}
              >
                Featured
              </button>
              <button
                type="button"
                className={`${styles.sortOption} ${sortBy === 'newest' ? styles.sortOptionActive : ''}`}
                onClick={() => {
                  setSortBy('newest');
                  setIsSortOpen(false);
                }}
              >
                New Arrivals
              </button>
              <button
                type="button"
                className={`${styles.sortOption} ${sortBy === 'price-low' ? styles.sortOptionActive : ''}`}
                onClick={() => {
                  setSortBy('price-low');
                  setIsSortOpen(false);
                }}
              >
                Price: Low to High
              </button>
              <button
                type="button"
                className={`${styles.sortOption} ${sortBy === 'price-high' ? styles.sortOptionActive : ''}`}
                onClick={() => {
                  setSortBy('price-high');
                  setIsSortOpen(false);
                }}
              >
                Price: High to Low
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Horizontal Filter Chips Bar ── */}
      <div className={styles.chipsScrollRow} role="tablist" aria-label="Saree Categories">
        {SHOP_CHIPS.map((chip) => {
          const isActive = activeChip === chip;
          return (
            <button
              key={chip}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.chipPill} ${isActive ? styles.chipPillActive : ''}`}
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── 4. 2-Column Product Grid ── */}
      <div className={styles.gridContainer}>
        {sortedItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No matching weaves in this category</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setActiveChip('ALL');
                setSelectedFabric('all');
              }}
            >
              VIEW ALL SAREES
            </button>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {sortedItems.map((saree) => {
              const inWishlist = isInWishlist(saree.id);
              return (
                <article
                  key={saree.id}
                  className={styles.sareeCard}
                  onClick={() => onSelectProduct?.(saree)}
                >
                  <div className={styles.cardMediaWrap}>
                    <img
                      src={saree.image}
                      alt={saree.name}
                      className={styles.cardImg}
                      loading="lazy"
                    />

                    {/* Top-Right Floating Wishlist Heart */}
                    <button
                      type="button"
                      className={`${styles.wishlistBtn} ${inWishlist ? styles.wishlistBtnActive : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(saree);
                      }}
                      aria-label={inWishlist ? `Remove ${saree.name} from Wishlist` : `Add ${saree.name} to Wishlist`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={inWishlist ? '#8A1528' : 'none'}
                        stroke={inWishlist ? '#8A1528' : '#FFFFFF'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.heartSvg}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>

                    {/* Bottom-Left Badge Pill */}
                    {saree.badge && (
                      <span className={styles.badgePill}>{saree.badge}</span>
                    )}
                  </div>

                  {/* Card Details Row */}
                  <div className={styles.cardDetailsRow}>
                    <div className={styles.cardTextInfo}>
                      <h3 className={styles.sareeName}>{saree.name}</h3>
                      <p className={styles.sareeSubtitle}>{saree.subtitle}</p>
                      <p className={styles.sareePrice}>₹ {saree.price.toLocaleString('en-IN')}</p>
                    </div>

                    <button
                      type="button"
                      className={styles.quickAddBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct?.(saree);
                      }}
                      aria-label={`View weave details for ${saree.name}`}
                    >
                      <img src={plusIconImg} alt="Add" className={styles.plusPatchImg} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 5. Personal Stylist Luxury Banner Card ── */}
      <div className={styles.stylistCard}>
        <div className={styles.stylistLeftIcon} aria-hidden="true">
          <img src={flowerIconImg} alt="Shloka Lotus" className={styles.stylistFlowerImg} />
        </div>

        <div className={styles.stylistTextGroup}>
          <h4 className={styles.stylistHeading}>LOOKING FOR SOMETHING SPECIAL?</h4>
          <p className={styles.stylistSubheading}>We'll help you find the perfect weave.</p>
        </div>

        <button
          type="button"
          className={styles.stylistActionBtn}
          onClick={() => {
            const boutiqueEl = document.querySelector('#boutique-section');
            if (boutiqueEl) {
              onBack?.();
              setTimeout(() => boutiqueEl.scrollIntoView({ behavior: 'smooth' }), 200);
            }
          }}
          aria-label="Connect with personal stylist"
        >
          <span>PERSONAL STYLIST</span>
          <span className={styles.stylistArrow}>→</span>
        </button>
      </div>

      {/* ── Filter Slide-up Drawer Modal ── */}
      {isFilterOpen && (
        <div className={styles.filterOverlay} onClick={() => setIsFilterOpen(false)}>
          <div className={styles.filterDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.filterDrawerHeader}>
              <h3 className={styles.filterDrawerTitle}>FILTERS</h3>
              <button
                type="button"
                className={styles.filterCloseBtn}
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className={styles.filterDrawerBody}>
              <div className={styles.filterGroup}>
                <h4 className={styles.filterGroupTitle}>WEAVE & CATEGORY</h4>
                <div className={styles.filterPills}>
                  {SHOP_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={`${styles.filterPillItem} ${activeChip === chip ? styles.filterPillItemActive : ''}`}
                      onClick={() => setActiveChip(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterGroupTitle}>FABRIC</h4>
                <div className={styles.filterPills}>
                  {['all', 'mulberry', 'katan', 'tissue', 'chanderi'].map((fab) => (
                    <button
                      key={fab}
                      type="button"
                      className={`${styles.filterPillItem} ${selectedFabric === fab ? styles.filterPillItemActive : ''}`}
                      onClick={() => setSelectedFabric(fab)}
                    >
                      {fab.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.filterDrawerFooter}>
              <button
                type="button"
                className={styles.filterClearBtn}
                onClick={() => {
                  setActiveChip('ALL');
                  setSelectedFabric('all');
                }}
              >
                RESET
              </button>
              <button
                type="button"
                className={styles.filterApplyBtn}
                onClick={() => setIsFilterOpen(false)}
              >
                SHOW {sortedItems.length} SAREES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
