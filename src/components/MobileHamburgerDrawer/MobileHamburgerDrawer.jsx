import { useState, useEffect } from 'react';
import sareeDrawerImg from '../../assets/Saree-hamburger-drawer-image.png';
import flowerDrawerImg from '../../assets/Flower-hamburger-drawer-image.png';
import shlokaLogoTypo from '../../assets/Shloka-Logo-Typo.png';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import styles from './MobileHamburgerDrawer.module.css';

// ── Golden Line-Art Motifs (Consistent 1.5px stroke in brand gold) ──
function MotifFloral({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 4 4c0 2.5-4 6-4 6s-4-3.5-4-6a4 4 0 0 1 4-4Z" />
      <path d="M12 22a4 4 0 0 1-4-4c0-2.5 4-6 4-6s4 3.5 4 6a4 4 0 0 1-4 4Z" />
      <path d="M2 12a4 4 0 0 1 4-4c2.5 0 6 4 6 4s-3.5 4-6 4a4 4 0 0 1-4-4Z" />
      <path d="M22 12a4 4 0 0 1-4 4c-2.5 0-6-4-6-4s3.5-4 6-4a4 4 0 0 1 4 4Z" />
    </svg>
  );
}

function MotifMandala({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="8" strokeDasharray="1.5 2" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 17.66l1.42-1.42M16.24 7.76l1.42-1.42" />
    </svg>
  );
}

function MotifWear({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l2 6-4 2v10H8V11L4 9l2-6Z" />
      <path d="M10 3v4a2 2 0 0 0 4 0V3" />
    </svg>
  );
}

function MotifFabric({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="2" />
      <ellipse cx="12" cy="19" rx="7" ry="2" />
      <path d="M5 5v14M19 5v14M8 8l8 4M8 12l8 4" />
    </svg>
  );
}

function MotifSaree({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6c3-2 6-2 9 0s6 2 9 0v12c-3 2-6 2-9 0s-6-2-9 0V6Z" />
      <path d="M12 6v12M3 10c3-2 6-2 9 0M12 14c3 2 6 2 9 0" />
    </svg>
  );
}

function MotifOccasion({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1.5" fill="#B8893E" />
    </svg>
  );
}

function MotifEdits({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 6.6L21 11l-5.3 4.2L17 22l-5-3.8L7 22l1.3-6.8L3 11l6.6-2.4L12 2Z" />
    </svg>
  );
}

function MotifGift({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M12 8c-2-2-4-2-4 0s2 2 4 2c2 0 4 0 4-2s-2-2-4 0" />
    </svg>
  );
}

function MotifJournal({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function MotifBoutique({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function MotifContact({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

// ── 32 SHLOKA Collections (arranged in exact 2-column order from reference) ──
const COLLECTIONS_COL1 = [
  'THAAIMAI',
  'MAGIZHVI',
  'KAADHAL MOZHI',
  'JODI',
  'LINEN',
  'KUTCHERI',
  'GEORGETTE',
  'AJRAKH',
  'SUMANGALI',
  'SHLOKA WOMEN',
  'MALAR',
  'MARABU',
  'DULHAN',
];

const COLLECTIONS_COL2 = [
  'MIRDULA / SOFT SILKS',
  'BANARAS',
  'VASANTHAM',
  'THANGAM',
  'SIGAPU',
  'ILANJIVAPPU',
  'SEMMANJAL',
  'MANJAL',
  'PACHAI',
  'NEELAM',
  'VADAMALLI',
  'MUDHRA',
  'CHAKRA',
  'MAYURA',
  'AVAL EZHIL',
  'THENDRAL',
  'SUDAR',
  'NALINI',
  'PUVI',
];

// ── Shopping Categorization Data ──
const WEAR_CATEGORIES = [
  {
    name: 'CASUAL WEAR',
    items: ['Kurti Pants', 'Salwars', 'Co-ord Sets', 'Dress Materials'],
  },
  {
    name: 'FUNCTION WEAR',
    items: ['Lehenga', 'Gowns', 'Co-ord Tops', 'Palazzo', 'Patiala', 'Indo-Western', 'Anarkali'],
  },
  {
    name: 'INDO-WESTERN',
    items: ['Fusion Drapes', 'Crop Jackets', 'Cape Sets'],
  },
];

const FABRIC_CATEGORIES = [
  'COTTON',
  'TUSSAR',
  'CHANDERI',
  'LINEN',
  'LINEN COTTON',
  'GEORGETTE',
  'NET SAREES',
  'SUPER NET',
  'SILK',
  'KANJIVARAM',
  'SOFT SILK',
  'BANARASI',
  'IKKAT',
  'PATOLA',
  'KALAMKARI',
  'BANDHANI',
  'PAITHANI',
  'KOTA',
];

const SAREE_FILTERS = ['FUNCTION', 'CASUAL', 'BRIDAL'];

export default function MobileHamburgerDrawer({
  isOpen,
  onClose,
  onSelectTab,
  onOpenSearch,
  onOpenProfile,
  onOpenBag,
  onSelectProduct,
}) {
  // Accordion open states (COLLECTIONS is open by default like the reference design)
  const [openSections, setOpenSections] = useState({
    collections: true,
    shopByWear: false,
    shopByFabric: false,
    sarees: false,
    occasions: false,
    curatedEdits: false,
    gifts: false,
    journal: false,
    boutiques: false,
  });

  const [activeWearSub, setActiveWearSub] = useState(null);

  // Body scroll locking when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleDestination = (type, payload) => {
    onClose();
    if (type === 'search') {
      onOpenSearch?.();
    } else if (type === 'tab') {
      onSelectTab?.(payload);
    } else if (type === 'scroll') {
      onSelectTab?.('home');
      setTimeout(() => {
        const el = document.querySelector(payload);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="SHLOKA Mobile Menu"
    >
      <aside
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top-Right Flowing Silk Saree Pallu Decorative Background ── */}
        <img
          src={sareeDrawerImg}
          alt=""
          className={styles.topSareeDeco}
          aria-hidden="true"
        />

        {/* ── Bottom-Right Botanical Lotus Artwork Background ── */}
        <img
          src={flowerDrawerImg}
          alt=""
          className={styles.bottomLotusDeco}
          aria-hidden="true"
        />

        {/* ── Drawer Scrollable Content ── */}
        <div className={styles.scrollContainer}>
          {/* 1. Header with Logo & Close Button */}
          <header className={styles.header}>
            <div className={styles.brandRow}>
              <div className={styles.lotusIconWrap}>
                <BloomingLotusIcon width={22} height={16} stroke="#A07F3A" />
              </div>
              <img src={shlokaLogoTypo} alt="Shloka" className={styles.drawerBrandLogo} />
            </div>

            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close menu"
            >
              ✕
            </button>
          </header>

          {/* 2. Primary Navigation Rows */}
          <nav className={styles.navBlock} aria-label="Main Navigation">
            {/* NEW ARRIVALS */}
            <div
              className={styles.navRow}
              onClick={() => handleDestination('search')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.rowLeft}>
                <MotifFloral className={styles.rowIcon} />
                <span className={styles.rowLabel}>NEW ARRIVALS</span>
              </div>
              <span className={styles.newBadge}>NEW</span>
            </div>

            {/* ABOUT SHLOKA */}
            <div
              className={styles.navRow}
              onClick={() => handleDestination('scroll', '#story')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.rowLeft}>
                <div className={styles.rowLotusIcon}>
                  <BloomingLotusIcon width={17} height={12} stroke="#A07F3A" />
                </div>
                <span className={styles.rowLabel}>ABOUT SHLOKA</span>
              </div>
            </div>

            {/* COLLECTIONS (Main Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('collections')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.collections}
              >
                <div className={styles.rowLeft}>
                  <MotifMandala className={styles.rowIcon} />
                  <span className={styles.rowLabel}>COLLECTIONS</span>
                </div>
                <span className={`${styles.chevron} ${openSections.collections ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.collections && (
                <div className={styles.collectionsAccordionContent}>
                  <div className={styles.collectionsGrid}>
                    {/* Column 1 */}
                    <div className={styles.colColumn}>
                      {COLLECTIONS_COL1.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={styles.colBtn}
                          onClick={() => handleDestination('search', name)}
                        >
                          <MotifFloral className={styles.colMotif} />
                          <span className={styles.colText}>{name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className={styles.colColumn}>
                      {COLLECTIONS_COL2.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={styles.colBtn}
                          onClick={() => handleDestination('search', name)}
                        >
                          <MotifFloral className={styles.colMotif} />
                          <span className={styles.colText}>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SHOP BY WEAR (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('shopByWear')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.shopByWear}
              >
                <div className={styles.rowLeft}>
                  <MotifWear className={styles.rowIcon} />
                  <span className={styles.rowLabel}>SHOP BY WEAR</span>
                </div>
                <span className={`${styles.chevron} ${openSections.shopByWear ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.shopByWear && (
                <div className={styles.subAccordionContent}>
                  {WEAR_CATEGORIES.map((cat) => {
                    const isSubOpen = activeWearSub === cat.name;
                    return (
                      <div key={cat.name} className={styles.nestedCatGroup}>
                        <div
                          className={styles.nestedCatRow}
                          onClick={() => setActiveWearSub(isSubOpen ? null : cat.name)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className={styles.nestedCatName}>{cat.name}</span>
                          <span className={`${styles.subChevron} ${isSubOpen ? styles.subChevronOpen : ''}`}>
                            ›
                          </span>
                        </div>
                        {isSubOpen && (
                          <div className={styles.nestedItemsList}>
                            {cat.items.map((item) => (
                              <button
                                key={item}
                                type="button"
                                className={styles.nestedLeafBtn}
                                onClick={() => handleDestination('search', item)}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SHOP BY FABRIC (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('shopByFabric')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.shopByFabric}
              >
                <div className={styles.rowLeft}>
                  <MotifFabric className={styles.rowIcon} />
                  <span className={styles.rowLabel}>SHOP BY FABRIC</span>
                </div>
                <span className={`${styles.chevron} ${openSections.shopByFabric ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.shopByFabric && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.fabricsGrid}>
                    {FABRIC_CATEGORIES.map((fabric) => (
                      <button
                        key={fabric}
                        type="button"
                        className={styles.fabricPill}
                        onClick={() => handleDestination('search', fabric)}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SAREES (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('sarees')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.sarees}
              >
                <div className={styles.rowLeft}>
                  <MotifSaree className={styles.rowIcon} />
                  <span className={styles.rowLabel}>SAREES</span>
                </div>
                <span className={`${styles.chevron} ${openSections.sarees ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.sarees && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {SAREE_FILTERS.map((sareeType) => (
                      <button
                        key={sareeType}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('search', sareeType)}
                      >
                        <span>{sareeType}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* OCCASIONS (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('occasions')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.occasions}
              >
                <div className={styles.rowLeft}>
                  <MotifOccasion className={styles.rowIcon} />
                  <span className={styles.rowLabel}>OCCASIONS</span>
                </div>
                <span className={`${styles.chevron} ${openSections.occasions ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.occasions && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {['Bridal & Wedding', 'Festive & Pujas', 'Receptions & Cocktails', 'Heritage Gifting'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('search', item)}
                      >
                        <span>{item}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CURATED EDITS (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('curatedEdits')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.curatedEdits}
              >
                <div className={styles.rowLeft}>
                  <MotifEdits className={styles.rowIcon} />
                  <span className={styles.rowLabel}>CURATED EDITS</span>
                </div>
                <span className={`${styles.chevron} ${openSections.curatedEdits ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.curatedEdits && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {['Royal Kanchipuram Weaves', 'Banarasi Brocade Vault', 'Pure Zari Masterpieces'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('search', item)}
                      >
                        <span>{item}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* GIFTS & HAMPERS (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('gifts')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.gifts}
              >
                <div className={styles.rowLeft}>
                  <MotifGift className={styles.rowIcon} />
                  <span className={styles.rowLabel}>GIFTS & HAMPERS</span>
                </div>
                <span className={`${styles.chevron} ${openSections.gifts ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.gifts && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {['Luxury Saree Gift Sets', 'Couture Potlis & Blouses', 'Bespoke Trousseau Box'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('search', item)}
                      >
                        <span>{item}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* THE JOURNAL (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('journal')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.journal}
              >
                <div className={styles.rowLeft}>
                  <MotifJournal className={styles.rowIcon} />
                  <span className={styles.rowLabel}>THE JOURNAL</span>
                </div>
                <span className={`${styles.chevron} ${openSections.journal ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.journal && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {['The Heritage of Kanchi Silk', 'Master Weavers of Banaras', 'Preserving Zari Craft'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('scroll', '#journal')}
                      >
                        <span>{item}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* OUR BOUTIQUES (Accordion) */}
            <div className={styles.accordionGroup}>
              <div
                className={styles.navRow}
                onClick={() => toggleSection('boutiques')}
                role="button"
                tabIndex={0}
                aria-expanded={openSections.boutiques}
              >
                <div className={styles.rowLeft}>
                  <MotifBoutique className={styles.rowIcon} />
                  <span className={styles.rowLabel}>OUR BOUTIQUES</span>
                </div>
                <span className={`${styles.chevron} ${openSections.boutiques ? styles.chevronOpen : ''}`}>
                  ˅
                </span>
              </div>

              {openSections.boutiques && (
                <div className={styles.subAccordionContent}>
                  <div className={styles.simpleSubList}>
                    {['Coimbatore Flagship', 'Chennai Atelier', 'Bangalore Salon'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.simpleSubItem}
                        onClick={() => handleDestination('scroll', '#boutiques')}
                      >
                        <span>{item}</span>
                        <span className={styles.subArrow}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CONTACT US */}
            <div
              className={styles.navRow}
              onClick={() => handleDestination('scroll', '#boutiques')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.rowLeft}>
                <MotifContact className={styles.rowIcon} />
                <span className={styles.rowLabel}>CONTACT US</span>
              </div>
            </div>
          </nav>

          {/* 3. Luxury Brand Footer Block */}
          <footer className={styles.drawerFooter}>
            <p className={styles.footerTagline}>WOVEN WITH HERITAGE. MADE FOR YOU.</p>

            {/* Diamond Motif Divider */}
            <div className={styles.footerDivider} aria-hidden="true">
              <span className={styles.dividerLine} />
              <span className={styles.dividerDiamond}>◇</span>
              <span className={styles.dividerLine} />
            </div>

            {/* Social Links Circular Outlines */}
            <div className={styles.socialRow}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Pinterest"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="YouTube"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
}
