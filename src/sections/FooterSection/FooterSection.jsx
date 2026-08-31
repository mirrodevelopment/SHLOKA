import { forwardRef, useRef, useState } from 'react';
import footerArchImg from '../../assets/Footer-img.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import styles from './FooterSection.module.css';

const ACCORDION_SECTIONS = [
  {
    id: 'collections',
    title: 'COLLECTIONS',
    links: [
      { name: 'Bridal Kanchipuram Sarees', href: '#collections' },
      { name: 'Pure Tissue Silk Sarees', href: '#collections' },
      { name: 'Handwoven Festive Edits', href: '#collections' },
      { name: 'Designer Stitched Blouses', href: '#collections' },
      { name: 'Silk Lehengas & Sets', href: '#collections' },
      { name: 'New Arrivals', href: '#collections' },
    ],
  },
  {
    id: 'heritage',
    title: 'OUR HERITAGE',
    links: [
      { name: 'The Shloka Story', href: '#story' },
      { name: 'The Craft & The Weave', href: '#craft' },
      { name: 'Master Artisans of Tamil Nadu', href: '#craft' },
      { name: 'The Saree Journal & Editorial', href: '#journal' },
    ],
  },
  {
    id: 'services',
    title: 'CLIENT CARE & SERVICES',
    links: [
      { name: 'Virtual Stylist Consultation', href: '#boutiques' },
      { name: 'Saree Care & Preservation Guide', href: '#craft' },
      { name: 'Silk Mark & Zari Certification', href: '#craft' },
      { name: 'Complimentary Fall & Pico', href: '#collections' },
      { name: 'Shipping & Delivery Info', href: '#faq' },
      { name: 'Returns & Exchange Policy', href: '#faq' },
    ],
  },
  {
    id: 'boutiques',
    title: 'OUR BOUTIQUES',
    links: [
      { name: 'Coimbatore — Flagship Atelier (Race Course)', href: '#boutiques' },
      { name: 'Chennai — Nungambakkam High Road', href: '#boutiques' },
      { name: 'Bengaluru — Lavelle Road', href: '#boutiques' },
      { name: 'Hyderabad — Jubilee Hills', href: '#boutiques' },
      { name: 'Mumbai — Kala Ghoda', href: '#boutiques' },
    ],
  },
];

const FooterSection = forwardRef(function FooterSection(props, ref) {
  const sectionRef = useRef(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <footer
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="footer"
      aria-label="SHLOKA Footer - The Epilogue"
    >
      {/* ── DESKTOP EXCLUSIVE FOOTER (min-width: 769px) — 100% PRESERVED ── */}
      <div className={styles.desktopOnlyFooter}>
        <div className={styles.container}>
          {/* Top Header Block */}
          <header className={styles.header}>
            <div className={styles.topLotus} aria-hidden="true" data-ftr-text>
              <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
            </div>

            <span className={styles.eyebrow} data-ftr-text>T H E  E P I L O G U E</span>

            <blockquote className={styles.quoteText} data-ftr-text>
              Some stories are never folded.
              <br />
              They are inherited.
            </blockquote>

            <div className={styles.diamondDivider} aria-hidden="true" data-ftr-text>
              <span className={styles.divLine} />
              <span className={styles.divDot} />
              <span className={styles.divLine} />
            </div>
          </header>

          {/* Center Mughal Arch Photograph Banner (Footer-img.png) */}
          <div className={styles.archFrameContainer}>
            <img
              src={footerArchImg}
              alt="SHLOKA Heritage Archway & Gold Silk Saree Drape"
              className={styles.archImage}
              loading="eager"
            />
          </div>

          {/* Horizontal Navigation Links Bar */}
          <nav className={styles.navBar} aria-label="Footer Navigation" data-ftr-text>
            <a
              href="#collections"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#collections');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              COLLECTIONS
            </a>
            <span className={styles.dot}>•</span>
            <a
              href="#story"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#story');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              STORY
            </a>
            <span className={styles.dot}>•</span>
            <a
              href="#craft"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#craft');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              CRAFT
            </a>
            <span className={styles.dot}>•</span>
            <a
              href="#journal"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#journal');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              JOURNAL
            </a>
            <span className={styles.dot}>•</span>
            <a
              href="#about"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#about');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              ABOUT
            </a>
            <span className={styles.dot}>•</span>
            <a
              href="#contact"
              onClick={(e) => {
                if (window.innerWidth > 768) {
                  e.preventDefault();
                  history.pushState(null, null, '#contact');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
            >
              CONTACT
            </a>
          </nav>

          {/* Brand Signature Block */}
          <div className={styles.brandSignature} data-ftr-text>
            <div className={styles.brandLotus} aria-hidden="true">
              <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
            </div>
            <h2 className={styles.brandName}>S H L O K A</h2>
            <p className={styles.brandSubtitle}>THREADS OF LEGACY</p>
          </div>

          {/* Bottom Fine Print Bar */}
          <div className={styles.bottomBar} data-ftr-text>
            {/* Left Column: Boutiques */}
            <div className={styles.barCol}>
              <span className={styles.barCategory}>BOUTIQUES</span>
              <div className={styles.barLinks}>
                <span>COIMBATORE</span>
                <span className={styles.bDot}>•</span>
                <span>CHENNAI</span>
                <span className={styles.bDot}>•</span>
                <span>BENGALURU</span>
                <span className={styles.bDot}>•</span>
                <span>HYDERABAD</span>
                <span className={styles.bDot}>•</span>
                <span>MUMBAI</span>
              </div>
            </div>

            {/* Center Column: Follow Us */}
            <div className={styles.barCol}>
              <span className={styles.barCategory}>FOLLOW US</span>
              <div className={styles.barLinks}>
                <a href="#instagram">INSTAGRAM</a>
                <span className={styles.bDot}>•</span>
                <a href="#pinterest">PINTEREST</a>
                <span className={styles.bDot}>•</span>
                <a href="#youtube">YOUTUBE</a>
              </div>
            </div>

            {/* Right Column: Copyright */}
            <div className={styles.barColRight}>
              <div className={styles.copyrightGroup}>
                <BloomingLotusIcon width={18} height={13} stroke="#A98455" className={styles.cLotus} />
                <span className={styles.copyrightText}>© SHLOKA 2026. ALL RIGHTS RESERVED.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE EXCLUSIVE LUXURY FOOTER (max-width: 768px) ── */}
      <div className={styles.mobileOnlyFooter}>
        <div className={styles.mobileContainer}>
          {/* 1. Brand Epilogue Emblem & Header */}
          <div className={styles.mobileBrandHeader}>
            <div className={styles.mobileLotusIcon} aria-hidden="true">
              <BloomingLotusIcon width={26} height={19} stroke="#A98455" />
            </div>
            <span className={styles.mobileEpilogueEyebrow}>THE EPILOGUE</span>
            <h2 className={styles.mobileBrandLogo}>S H L O K A</h2>
            <p className={styles.mobileBrandMotto}>HANDWOVEN SILK COUTURE • TIMELESS LEGACY</p>
            <blockquote className={styles.mobileEpilogueQuote}>
              “Some stories are never folded. They are inherited.”
            </blockquote>
          </div>

          {/* 2. Thin Divider line */}
          <div className={styles.mobileMainDivider} aria-hidden="true">
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>

          {/* 3. Link columns grid (3 columns top row, 2 columns bottom row) */}
          <div className={styles.mobileLinksGrid}>
            {/* SHOP COLUMN */}
            <div className={styles.mobileLinkColumn}>
              <h3 className={styles.columnTitle}>SHOP</h3>
              <div className={styles.columnTitleDivider} aria-hidden="true">
                <span className={styles.columnTitleLine} />
                <span className={styles.columnTitleDot} />
                <span className={styles.columnTitleLine} />
              </div>
              <ul className={styles.columnLinks}>
                <li><a href="#collections" className={styles.columnLink}>Sarees</a></li>
                <li><a href="#collections" className={styles.columnLink}>New Arrivals</a></li>
                <li><a href="#collections" className={styles.columnLink}>Blouses</a></li>
                <li><a href="#collections" className={styles.columnLink}>Ethnic Wear</a></li>
                <li><a href="#giftcards" className={styles.columnLink}>Gift Cards</a></li>
              </ul>
            </div>

            {/* HELP COLUMN */}
            <div className={styles.mobileLinkColumn}>
              <h3 className={styles.columnTitle}>HELP</h3>
              <div className={styles.columnTitleDivider} aria-hidden="true">
                <span className={styles.columnTitleLine} />
                <span className={styles.columnTitleDot} />
                <span className={styles.columnTitleLine} />
              </div>
              <ul className={styles.columnLinks}>
                <li><a href="#contact" className={styles.columnLink}>Contact Us</a></li>
                <li><a href="#shipping" className={styles.columnLink}>Shipping & Delivery</a></li>
                <li><a href="#returns" className={styles.columnLink}>Returns & Exchanges</a></li>
                <li><a href="#faq" className={styles.columnLink}>FAQ</a></li>
                <li><a href="#size-guide" className={styles.columnLink}>Size Guide</a></li>
              </ul>
            </div>

            {/* ABOUT COLUMN */}
            <div className={styles.mobileLinkColumn}>
              <h3 className={styles.columnTitle}>ABOUT</h3>
              <div className={styles.columnTitleDivider} aria-hidden="true">
                <span className={styles.columnTitleLine} />
                <span className={styles.columnTitleDot} />
                <span className={styles.columnTitleLine} />
              </div>
              <ul className={styles.columnLinks}>
                <li><a href="#story" className={styles.columnLink}>Our Story</a></li>
                <li><a href="#craft" className={styles.columnLink}>The Craft</a></li>
                <li><a href="#sustainability" className={styles.columnLink}>Sustainability</a></li>
                <li><a href="#boutiques" className={styles.columnLink}>Visit Shloka</a></li>
                <li><a href="#careers" className={styles.columnLink}>Careers</a></li>
              </ul>
            </div>

            {/* ACCOUNT COLUMN */}
            <div className={styles.mobileLinkColumn}>
              <h3 className={styles.columnTitle}>ACCOUNT</h3>
              <div className={styles.columnTitleDivider} aria-hidden="true">
                <span className={styles.columnTitleLine} />
                <span className={styles.columnTitleDot} />
                <span className={styles.columnTitleLine} />
              </div>
              <ul className={styles.columnLinks}>
                <li><a href="#profile" className={styles.columnLink}>My Account</a></li>
                <li><a href="#orders" className={styles.columnLink}>Orders</a></li>
                <li><a href="#wishlist" className={styles.columnLink}>Wishlist</a></li>
                <li><a href="#rewards" className={styles.columnLink}>Shloka Rewards</a></li>
                <li><a href="#addresses" className={styles.columnLink}>Address Book</a></li>
              </ul>
            </div>

            {/* POLICIES COLUMN */}
            <div className={styles.mobileLinkColumn}>
              <h3 className={styles.columnTitle}>POLICIES</h3>
              <div className={styles.columnTitleDivider} aria-hidden="true">
                <span className={styles.columnTitleLine} />
                <span className={styles.columnTitleDot} />
                <span className={styles.columnTitleLine} />
              </div>
              <ul className={styles.columnLinks}>
                <li><a href="#privacy" className={styles.columnLink}>Privacy Policy</a></li>
                <li><a href="#terms" className={styles.columnLink}>Terms & Conditions</a></li>
                <li><a href="#cookie-policy" className={styles.columnLink}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* 4. Middle Quote Card with Lotus & Socials */}
          <div className={styles.middleCard}>
            <div className={styles.middleLotus} aria-hidden="true">
              <BloomingLotusIcon width={24} height={18} stroke="#A98455" />
            </div>
            <h3 className={styles.middleQuote}>Timeless weaves, eternal beauty.</h3>
            <p className={styles.middleThankYou}>
              Thank you for supporting mindful craftsmanship and the weavers of India.
            </p>
            <div className={styles.socialRow}>
              <a href="#instagram" className={styles.socialCircle} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#facebook" className={styles.socialCircle} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#pinterest" className={styles.socialCircle} aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 22c.16-.9.6-2.58.82-3.46.22-.88 1.14-4.56 1.14-4.56s-.28-.56-.28-1.4c0-1.3.76-2.28 1.7-2.28.8 0 1.18.6 1.18 1.32 0 .8-.5 2-.78 3.12-.22.92.46 1.66 1.36 1.66 1.64 0 2.9-1.74 2.9-4.24 0-2.22-1.6-3.76-3.86-3.76-2.62 0-4.16 1.97-4.16 4 0 .8.3 1.66.68 2.12.08.1.08.16.06.24l-.26 1.06c-.04.16-.14.22-.32.14-1.2-.56-1.95-2.32-1.95-3.74 0-3.04 2.2-5.83 6.37-5.83 3.34 0 5.94 2.38 5.94 5.56 0 3.33-2.1 6-5.02 6-.98 0-1.9-.5-2.22-1.12l-.6 2.3c-.22.84-.8 1.9-1.2 2.54A9 9 0 0 0 8 22z" />
                </svg>
              </a>
              <a href="#youtube" className={styles.socialCircle} aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* 5. Trust Badges Row (4 Columns in 2x2 grid on mobile) */}
          <div className={styles.trustBadgesGrid}>
            <div className={styles.trustBadgeItem}>
              <div className={styles.trustIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h4 className={styles.trustTitle}>COMPLIMENTARY SHIPPING</h4>
              <p className={styles.trustSub}>On all orders</p>
            </div>

            <div className={styles.trustBadgeItem}>
              <div className={styles.trustIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="21 8 21 21 3 21 3 8" />
                  <rect x="1" y="3" width="22" height="5" />
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              </div>
              <h4 className={styles.trustTitle}>EASY RETURNS</h4>
              <p className={styles.trustSub}>Within 7 days</p>
            </div>

            <div className={styles.trustBadgeItem}>
              <div className={styles.trustIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 11 11 13 15 9" />
                </svg>
              </div>
              <h4 className={styles.trustTitle}>SECURE PAYMENTS</h4>
              <p className={styles.trustSub}>100% protected</p>
            </div>

            <div className={styles.trustBadgeItem}>
              <div className={styles.trustIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h4 className={styles.trustTitle}>AUTHENTIC WEAVES</h4>
              <p className={styles.trustSub}>Handpicked with care</p>
            </div>
          </div>

          {/* 6. Copyright and Currency Row */}
          <div className={styles.bottomRow}>
            <p className={styles.copyrightText}>
              © 2024 Shloka House of Weaves. All rights reserved.
            </p>
            <div className={styles.currencySelector}>
              <span>INDIA (INR ₹)</span>
              <span className={styles.currencyArrow}>▼</span>
            </div>
          </div>

          {/* 7. Wavy Border at the end */}
          <div className={styles.wavyBottomBorder} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
});

export default FooterSection;
