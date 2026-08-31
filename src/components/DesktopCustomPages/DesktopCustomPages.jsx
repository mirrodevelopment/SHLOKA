import { useState, useEffect } from 'react';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import styles from './DesktopCustomPages.module.css';

// Import images from assets to make pages look premium
import saree1Img from '../../assets/Saree-1.png';
import saree2Img from '../../assets/Saree-2.png';
import saree3Img from '../../assets/Saree-3.png';
import saree4Img from '../../assets/Saree-4.png';
import storyHero from '../../assets/story-hero.jpg';
import padmaBlouse from '../../assets/padma-blouse.jpg';
import padmaPotli from '../../assets/padma-potli.jpg';

import sec51Img from '../../assets/Sec-5-1.png';
import sec52Img from '../../assets/Sec-5-2.png';
import sec53Img from '../../assets/Sec-5-3.png';
import tariniImg from '../../assets/Sec-4.png';
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

export function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('SAREES');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(100000);
  const [checkedCollections, setCheckedCollections] = useState({});
  const [isColAccordionOpen, setIsColAccordionOpen] = useState(true);
  const [sortBy, setSortBy] = useState('Featured');
  const [wishlistTick, setWishlistTick] = useState(0);

  // Sync wishlist updates
  useEffect(() => {
    const syncWishlist = () => setWishlistTick((t) => t + 1);
    window.addEventListener('shloka_wishlist_updated', syncWishlist);
    return () => window.removeEventListener('shloka_wishlist_updated', syncWishlist);
  }, []);

  const filterCollectionsList = [
    { name: 'THAAIMAI', count: 24 },
    { name: 'MAGIZHVI', count: 18 },
    { name: 'KAADHAL MOZHI', count: 22 },
    { name: 'JODI', count: 16 },
    { name: 'LINEN', count: 20 },
    { name: 'KUTCHERI', count: 28 },
    { name: 'GEORGETTE', count: 26 },
    { name: 'AJRAKH', count: 14 },
    { name: 'SUMANGALI', count: 18 },
    { name: 'SHLOKA WOMEN', count: 30 },
    { name: 'MALAR', count: 20 },
    { name: 'MARABU', count: 22 },
    { name: 'DULHAN', count: 24 },
    { name: 'MIRDULA / SOFT SILKS', count: 26 },
    { name: 'BANARAS', count: 32 },
    { name: 'VASANTHAM', count: 18 },
    { name: 'THANGAM', count: 20 },
    { name: 'SIGAPU', count: 12 },
    { name: 'ILANJIVAPPU', count: 12 },
    { name: 'SEMMANJAL', count: 12 },
    { name: 'MANJAL', count: 12 },
    { name: 'PACHAI', count: 12 },
    { name: 'NEELAM', count: 12 },
    { name: 'VADAMALLI', count: 12 },
    { name: 'MUDHRA', count: 16 },
    { name: 'CHAKRA', count: 16 },
    { name: 'MAYURA', count: 16 },
    { name: 'AVAL EZHIL', count: 14 },
    { name: 'THENDRAL', count: 14 },
    { name: 'SUDAR', count: 14 },
    { name: 'NALINI', count: 14 },
    { name: 'PUVI', count: 14 },
  ];

  const categories = [
    { name: 'SAREES', image: cat1Img },
    { name: 'NEW ARRIVALS', image: cat2Img },
    { name: 'BRIDALS', image: cat3Img },
    { name: 'BLOUSES', image: cat4Img },
    { name: 'ETHNIC WEAR', image: cat5Img },
    { name: 'LEHANGAS', image: cat6Img },
    { name: 'KURTIS', image: cat7Img },
    { name: 'SALWARS', image: cat8Img },
    { name: 'KURTA SET', image: cat9Img },
    { name: 'CO-ORDS', image: cat10Img },
    { name: 'INDO WESTEAR', image: cat11Img },
    { name: 'CASUAL WEAR', image: cat12Img },
  ];

  const tagsList = [
    'ALL',
    'NEW ARRIVALS',
    'BEST SELLERS',
    'SILK',
    'KANCHIPURAM',
    'BANARAS',
    'LINEN',
    'FESTIVE WEAR'
  ];

  const shopSarees = [
    {
      id: 'saree-padma',
      name: 'KANCHIPURAM SILK SAREE',
      subtitle: 'PADMA',
      price: 24500,
      image: saree1Img,
      tags: ['ALL', 'SILK', 'KANCHIPURAM', 'BEST SELLERS'],
      category: 'SAREES',
      collection: 'THAAIMAI'
    },
    {
      id: 'saree-megh',
      name: 'BANARASI SILK SAREE',
      subtitle: 'MEGH',
      price: 28900,
      image: saree2Img,
      tags: ['ALL', 'SILK', 'BANARAS', 'NEW ARRIVALS'],
      category: 'SAREES',
      collection: 'MAGIZHVI'
    },
    {
      id: 'saree-amara',
      name: 'PURE SOFT SILK SAREE',
      subtitle: 'AMARA',
      price: 22900,
      image: saree3Img,
      tags: ['ALL', 'SILK', 'BEST SELLERS'],
      category: 'SAREES',
      collection: 'KAADHAL MOZHI'
    },
    {
      id: 'saree-sitara',
      name: 'KANCHI SILK SAREE',
      subtitle: 'SITARA',
      price: 24900,
      image: saree4Img,
      tags: ['ALL', 'SILK', 'KANCHIPURAM', 'NEW ARRIVALS'],
      category: 'SAREES',
      collection: 'JODI'
    },
    {
      id: 'saree-ritu',
      name: 'ROYAL CRIMSON KANCHI',
      subtitle: 'RITU',
      price: 94500,
      image: sec52Img,
      tags: ['ALL', 'SILK', 'KANCHIPURAM', 'BEST SELLERS', 'FESTIVE WEAR'],
      category: 'BRIDALS',
      collection: 'KUTCHERI'
    },
    {
      id: 'saree-vaanya',
      name: 'IVORY CHANDERI SILK',
      subtitle: 'VAANYA',
      price: 72000,
      image: sec51Img,
      tags: ['ALL', 'SILK', 'BEST SELLERS', 'LINEN'],
      category: 'ETHNIC WEAR',
      collection: 'GEORGETTE'
    },
    {
      id: 'saree-ananya',
      name: 'VERMILION BRIDAL SAREE',
      subtitle: 'ANANYA',
      price: 98000,
      image: sec53Img,
      tags: ['ALL', 'SILK', 'BEST SELLERS', 'FESTIVE WEAR'],
      category: 'BRIDALS',
      collection: 'AJRAKH'
    },
    {
      id: 'saree-tarini',
      name: 'AMBER GOLD MULBERRY',
      subtitle: 'TARINI',
      price: 89000,
      image: tariniImg,
      tags: ['ALL', 'SILK', 'KANCHIPURAM', 'NEW ARRIVALS'],
      category: 'SAREES',
      collection: 'SUMANGALI'
    }
  ];

  const handleCollectionCheckboxChange = (name) => {
    setCheckedCollections((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleClearAll = () => {
    setCheckedCollections({});
    setPriceRange(100000);
    setSearchQuery('');
    setSelectedTag('ALL');
    setActiveCategory('SAREES');
  };

  const handleAddToBag = (saree) => {
    const cartItem = {
      id: saree.id,
      name: saree.name,
      price: saree.price,
      image: saree.image,
      quantity: 1
    };
    import('../../utils/cart').then(({ addToCart }) => {
      addToCart(cartItem);
      window.dispatchEvent(new Event('shloka_cart_updated'));
    });
  };

  const filteredProducts = shopSarees.filter((saree) => {
    if (activeCategory && saree.category !== activeCategory) {
      if (activeCategory === 'NEW ARRIVALS' && !saree.tags.includes('NEW ARRIVALS')) return false;
      if (activeCategory !== 'NEW ARRIVALS') return false;
    }
    if (selectedTag !== 'ALL' && !saree.tags.includes(selectedTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!saree.name.toLowerCase().includes(q) && !saree.subtitle.toLowerCase().includes(q)) return false;
    }
    if (saree.price > priceRange) return false;
    const selectedCols = Object.keys(checkedCollections).filter(k => checkedCollections[k]);
    if (selectedCols.length > 0 && !selectedCols.includes(saree.collection)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  return (
    <div className={styles.shopLayoutContainer}>
      {/* Left Sidebar Filter Panel */}
      <aside className={styles.sidebarFilter}>
        <div className={styles.filterHeader}>
          <span className={styles.filterTitle}>FILTERS</span>
          <button type="button" className={styles.clearAllBtn} onClick={handleClearAll}>
            CLEAR ALL
          </button>
        </div>

        {/* Collections Accordion */}
        <div className={styles.accordionSection}>
          <button
            type="button"
            className={styles.accordionToggle}
            onClick={() => setIsColAccordionOpen(!isColAccordionOpen)}
          >
            <span className={styles.accordionLabel}>
              <BloomingLotusIcon width={14} height={10} stroke="#A98455" className={styles.miniLotus} />
              COLLECTIONS
            </span>
            <span className={`${styles.accordionArrow} ${isColAccordionOpen ? styles.arrowUp : ''}`}>
              ▼
            </span>
          </button>
          {isColAccordionOpen && (
            <div className={styles.checkboxScrollContainer}>
              {filterCollectionsList.map((col) => (
                <label key={col.name} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={!!checkedCollections[col.name]}
                    onChange={() => handleCollectionCheckboxChange(col.name)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>
                    {col.name} <span className={styles.checkboxCount}>({col.count})</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className={styles.priceFilterSection}>
          <div className={styles.priceToggle}>
            <span className={styles.priceLabel}>PRICE RANGE</span>
            <span>▼</span>
          </div>
          <div className={styles.sliderWrap}>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className={styles.priceSlider}
            />
            <div className={styles.sliderValues}>
              <span>₹ 1,000</span>
              <span>₹ {priceRange.toLocaleString()}{priceRange >= 100000 ? '+' : ''}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Right Side Content */}
      <div className={styles.shopMainContent}>
        {/* Search Bar */}
        <div className={styles.searchBarWrapper}>
          <span className={styles.searchIconLeft}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C7862" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4.5 4.5" />
            </svg>
          </span>
          <input
            type="text"
            className={styles.searchInputField}
            placeholder="Search sarees, collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.searchIconsRight}>
            <button type="button" className={styles.searchAuxBtn} aria-label="Visual Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M7 7h.01M17 7h.01" />
              </svg>
            </button>
            <button type="button" className={styles.searchAuxBtn} aria-label="Voice Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.8">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="none" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Shop By Category Horizontal Row */}
        <div className={styles.categoryShowcaseSection}>
          <h2 className={styles.categorySectionTitle}>SHOP BY CATEGORY</h2>
          <div className={styles.categoryDividerRow}>
            <span className={styles.dividerLine} />
            <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
            <span className={styles.dividerLine} />
          </div>
          <div className={styles.categoryCircleRowWrapper}>
            <div className={styles.categoryCircleScroll}>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  className={`${styles.categoryCircleCard} ${activeCategory === cat.name ? styles.categoryCircleActive : ''}`}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  <div className={styles.circleFrame}>
                    <img src={cat.image} alt={cat.name} className={styles.circleImg} />
                  </div>
                  <span className={styles.circleLabel}>{cat.name}</span>
                </button>
              ))}
            </div>
            <button type="button" className={styles.circleArrowBtn} aria-label="Next categories">
              <span>➔</span>
            </button>
          </div>
        </div>

        {/* Category Header details */}
        <div className={styles.categoryHeaderDetails}>
          <div className={styles.headerTitlesCol}>
            <h1 className={styles.spacedCategoryTitle}>
              {activeCategory.split('').join(' ')}
            </h1>
            <p className={styles.categoryItalicSubtitle}>Timeless weaves, eternal beauty.</p>
          </div>
          <div className={styles.headerControlsCol}>
            <span className={styles.itemsCountLabel}>{sortedProducts.length} ITEMS</span>
            <div className={styles.sortByDropdownWrapper}>
              <span className={styles.sortByLabel}>SORT BY</span>
              <select
                className={styles.sortBySelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tag Pills Row */}
        <div className={styles.tagPillsRow}>
          {tagsList.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tagPill} ${selectedTag === tag ? styles.tagPillActive : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
          <button type="button" className={styles.tagPlusBtn}>+</button>
        </div>

        {/* Products Grid */}
        <div className={styles.productsDisplayGrid}>
          {sortedProducts.map((saree) => {
            const wished = isInWishlist(saree.id);
            return (
              <div key={saree.id} className={styles.productDisplayCard}>
                <div className={styles.productImgContainer}>
                  <img src={saree.image} alt={saree.name} className={styles.productGridImg} />
                  <button
                    type="button"
                    className={`${styles.wishlistToggleBtn} ${wished ? styles.wishlistedActive : ''}`}
                    onClick={() => {
                      toggleWishlist(saree);
                      setWishlistTick((t) => t + 1);
                    }}
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg width="20" height="18" viewBox="0 0 24 24" fill={wished ? "#8B2635" : "none"} stroke={wished ? "#8B2635" : "#FFF"} strokeWidth="1.6">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div className={styles.productGridInfo}>
                  <h3 className={styles.productGridTitle}>{saree.name}</h3>
                  <div className={styles.productGridFooter}>
                    <span className={styles.productGridPrice}>₹ {saree.price.toLocaleString()}</span>
                    <button
                      type="button"
                      className={styles.productBagBtn}
                      onClick={() => handleAddToBag(saree)}
                      aria-label="Add to cart"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.8">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function StoryPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>OUR ORIGINS</span>
        <h1 className={styles.mainTitle}>THE LEGEND OF SHLOKA</h1>
        <p className={styles.subtitle}>A legacy woven through generations of master artisans.</p>
      </header>

      <div className={styles.storyLayout}>
        <div className={styles.storyImageContainer}>
          <img src={storyHero} alt="Handloom artisan weaving Shloka saree" className={styles.storyHeroImg} />
          <div className={styles.storyDecorativeFrame} />
        </div>

        <div className={styles.storyContent}>
          <h2 className={styles.storySectionTitle}>Chapter I: The Loom of Time</h2>
          <p className={styles.storyParagraph}>
            <span className={styles.dropCap}>S</span>hloka was founded on a simple promise: to safeguard the timeless heritage of Indian handloom weaving while expressing it in a contemporary design language. Our journey began in the heritage weaving clusters of southern India, where the rhythmic clack of the handloom has sung for centuries.
          </p>
          <p className={styles.storyParagraph}>
            Every Shloka saree is a collaboration between master weaver and designer. It takes between 15 to 40 days of meticulous manual work to finish a single piece. The threads are dyed in small batches, the gold zari is sourced from certified craftsmen, and the designs are sketched by hand before being translated onto the loom cards.
          </p>

          <div className={styles.storyQuoteBox}>
            <p className={styles.storyQuoteText}>
              "A saree is not merely six yards of silk. It is a canvas of memories, a record of time, and a living piece of our cultural history."
            </p>
            <span className={styles.storyQuoteAuthor}>— Lead Designer, Atelier Shloka</span>
          </div>

          <h2 className={styles.storySectionTitle}>Chapter II: Hand-Woven Preservation</h2>
          <p className={styles.storyParagraph}>
            In an era of rapid fashion and machine-made duplicates, Shloka stands for slow, conscious curation. We support over 120 traditional weaving families across Tamil Nadu, Uttar Pradesh, and Andhra Pradesh, ensuring fair wages, healthy working conditions, and the preservation of rare techniques like the Korvai border and Kadwa motifs.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CraftPage() {
  const craftSteps = [
    {
      num: '01',
      title: 'Zari Curation',
      desc: 'We select genuine 24-karat gold-plated silver thread (zari), sourced from certified artisans, ensuring the border retains its rich antique patina for generations.'
    },
    {
      num: '02',
      title: 'Warp & Weft Alignment',
      desc: 'The mulberry silk threads are spun and loaded onto the loom. The alignment is calculated to micrometer accuracy to ensure a fluid drape and flawless weave.'
    },
    {
      num: '03',
      title: 'Handloom Weaving',
      desc: 'Using the traditional shuttle method, the weaver passes the weft thread manually. A single weaver finishes between 2 to 4 inches of intricate brocade daily.'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>THE METICULOUS ART</span>
        <h1 className={styles.mainTitle}>THE CRAFTSMANSHIP</h1>
        <p className={styles.subtitle}>Understanding the intricate handloom process behind every weave.</p>
      </header>

      <div className={styles.craftDetailLayout}>
        <div className={styles.craftLeftColumn}>
          <div className={styles.craftCardBig}>
            <span className={styles.craftBigLabel}>THE WARP AND WEFT</span>
            <h2 className={styles.craftBigTitle}>A Symphony of Cotton, Silk & Pure Gold</h2>
            <p className={styles.craftBigDesc}>
              The texture of a Shloka saree is its fingerprint. By combining pure South Indian mulberry silks with lightweight organic cottons, we create sarees that offer the structure of heritage drapes alongside the breezy weightlessness needed for contemporary wear.
            </p>
            <div className={styles.craftMotifSeparator}>
              <span className={styles.motifLine} />
              <span className={styles.motifStar}>✦</span>
              <span className={styles.motifLine} />
            </div>
            <div className={styles.craftMiniGrid}>
              <div className={styles.craftMiniItem}>
                <img src={padmaBlouse} alt="Silk dye" className={styles.craftMiniImg} />
                <span>Vegetable Dye Baths</span>
              </div>
              <div className={styles.craftMiniItem}>
                <img src={padmaPotli} alt="Gold thread" className={styles.craftMiniImg} />
                <span>24K Gold Threading</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.craftRightColumn}>
          <h3 className={styles.craftStepsHeading}>THE THREE PILLARS</h3>
          <div className={styles.craftStepsList}>
            {craftSteps.map((step) => (
              <div key={step.num} className={styles.craftStepCard}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JournalPage() {
  const articles = [
    {
      title: 'THE AUTUMN SILK EDIT',
      category: 'Atelier News',
      desc: 'A look into our upcoming palette: deep vermilions, mustard yellow, and sage greens inspired by South Indian temples.',
      date: 'Aug 24, 2026'
    },
    {
      title: 'PRESERVING THE KORVAI WEAVE',
      category: 'Weaving Heritage',
      desc: 'Why the interlocking border technique requires two weavers working in tandem, and why it is disappearing.',
      date: 'Aug 18, 2026'
    },
    {
      title: 'HOW TO CARE FOR PURE ZARI',
      category: 'Fabric Care',
      desc: 'Simple tips to store your bridal silks, preventing oxidation and keeping the gold thread glittering for generations.',
      date: 'Aug 09, 2026'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>EDITORIAL ESSAYS</span>
        <h1 className={styles.mainTitle}>THE SHLOKA JOURNAL</h1>
        <p className={styles.subtitle}>Articles on style, craft, and the preservation of traditional weaving.</p>
      </header>

      <div className={styles.journalGrid}>
        {articles.map((art, idx) => (
          <article key={art.title} className={styles.journalCard} style={{ animationDelay: `${idx * 0.15}s` }}>
            <span className={styles.journalMeta}>{art.category} • {art.date}</span>
            <h3 className={styles.journalTitle}>{art.title}</h3>
            <p className={styles.journalDesc}>{art.desc}</p>
            <a href="#read" className={styles.readMoreLink} onClick={(e) => e.preventDefault()}>Read Essay →</a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>OUR PHILOSOPHY</span>
        <h1 className={styles.mainTitle}>ABOUT SHLOKA</h1>
        <p className={styles.subtitle}>Redefining contemporary luxury through Indian handlooms.</p>
      </header>

      <div className={styles.aboutLayout}>
        <div className={styles.aboutCard}>
          <h2 className={styles.aboutSectionHeading}>DESIGN VISION</h2>
          <p className={styles.aboutText}>
            Shloka was established to create high-end couture that honors the past while styling the future. We believe that true luxury lies in detail—the precision of a handwoven motif, the weight of pure silk, and the ethical relationship with the artisans who breathe life into every design.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <h2 className={styles.aboutSectionHeading}>THE WEAVER RELATIONSHIP</h2>
          <p className={styles.aboutText}>
            We operate on a direct-to-artisan model. By bypassing middlemen, we guarantee that over 70% of the value of each saree goes directly to the weaving clusters. This ensures sustainable income for the artisans and allows us to maintain strict quality standards at every step of production.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>GET IN TOUCH</span>
        <h1 className={styles.mainTitle}>CONTACT THE ATELIER</h1>
        <p className={styles.subtitle}>Visit our boutiques or request a private couture appointment.</p>
      </header>

      <div className={styles.contactLayout}>
        <div className={styles.contactFormCol}>
          <h3 className={styles.contactColHeading}>SEND A MESSAGE</h3>
          {submitted ? (
            <div className={styles.successMessage}>
              <span className={styles.successMotif}>✦</span>
              <p>Thank you. Our atelier representatives will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>NAME</label>
                <input
                  type="text"
                  required
                  className={styles.formInput}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  className={styles.formInput}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>MESSAGE</label>
                <textarea
                  rows="4"
                  required
                  className={styles.formTextarea}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT INQUIRY
              </button>
            </form>
          )}
        </div>

        <div className={styles.contactDetailsCol}>
          <h3 className={styles.contactColHeading}>OUR BOUTIQUES</h3>
          <div className={styles.boutiqueList}>
            <div className={styles.boutiqueItem}>
              <h4 className={styles.boutiqueName}>COIMBATORE FLAGSHIP</h4>
              <p className={styles.boutiqueAddress}>
                The Heritage House, 82 Race Course Road,<br />
                Coimbatore, Tamil Nadu — 641018
              </p>
              <p className={styles.boutiqueContact}>atelier.cbe@shloka.com • +91 422 4567089</p>
            </div>
            <div className={styles.boutiqueItem}>
              <h4 className={styles.boutiqueName}>CHENNAI ATELIER</h4>
              <p className={styles.boutiqueAddress}>
                Khader Nawaz Khan Road, Nungambakkam,<br />
                Chennai, Tamil Nadu — 600006
              </p>
              <p className={styles.boutiqueContact}>atelier.mds@shloka.com • +91 44 28334091</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewArrivalsPage() {
  const newCollections = [
    {
      chapter: 'Chapter I',
      title: 'KANCHIPURAM BROCADES',
      season: 'AUTUMN / WINTER 2026',
      desc: 'Our signature launch featuring heavy-weight mulberry silk sarees with contrasting pure gold zari borders, handwoven in the historic temple towns of Tamil Nadu.',
      image: saree1Img,
      accent: 'Royal Crimson Red & Antique Gold',
      link: '#search'
    },
    {
      chapter: 'Chapter II',
      title: 'VARANASI KADWA SILKS',
      season: 'FESTIVE 2026 EXCLUSIVE',
      desc: 'Intricate floral and foliate motifs hand-loomed with gold and silver zari in classic double-warp Varanasi silks, curated for bridal celebrations.',
      image: saree2Img,
      accent: 'Sage Green & Champagne Zari',
      link: '#search'
    },
    {
      chapter: 'Chapter III',
      title: 'ORGANZA MEGH EDIT',
      season: 'ATELIER LAUNCH',
      desc: 'Translucent, weightless organzas finished with hand-embroidered border details and delicate pure silver zari trims for modern festive statements.',
      image: saree4Img,
      accent: 'Misty Cloud Blue & Silver Zari',
      link: '#search'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>THE LATEST RELEASES</span>
        <h1 className={styles.mainTitle}>NEW COLLECTIONS</h1>
        <p className={styles.subtitle}>Explore our newest seasonal chapters, handwoven with heritage and history.</p>
      </header>

      <div className={styles.arrivalsBannersList}>
        {newCollections.map((col) => (
          <div key={col.chapter} className={styles.arrivalBannerCard}>
            <div className={styles.bannerImageFrame}>
              <img src={col.image} alt={col.title} className={styles.bannerImg} />
              <span className={styles.bannerBadge}>NEW LAUNCH</span>
            </div>
            <div className={styles.bannerContentCol}>
              <span className={styles.bannerChapter}>{col.chapter}</span>
              <h2 className={styles.bannerTitle}>{col.title}</h2>
              <span className={styles.bannerSeason}>{col.season}</span>
              <div className={styles.bannerSeparator} />
              <p className={styles.bannerDesc}>{col.desc}</p>
              <div className={styles.bannerAccentBlock}>
                <span className={styles.accentLabel}>Palette Accent:</span>
                <span className={styles.accentText}>{col.accent}</span>
              </div>
              <a
                href={col.link}
                className={styles.bannerExploreBtn}
                onClick={() => {
                  window.location.hash = '#search';
                }}
              >
                EXPLORE COLLECTION →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
