import { useState, useEffect, useRef } from 'react';
import searchIconImg from '../../assets/Search-icon_original.png';
import accountIconImg from '../../assets/account-icon_original.png';
import cartIconImg from '../../assets/cart icon_original.png';
import shlokaLogoTypo from '../../assets/Shloka-Logo-Typo.png';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import { getCartCount } from '../../utils/cart';
import styles from './Navbar.module.css';

const NAV_LINKS_LEFT = [
  { label: 'COLLECTIONS', href: '#collections' },
  { label: 'NEW ARRIVALS', href: '#new-arrivals' },
];

const NAV_LINKS_RIGHT = [
  { label: 'OUR STORY', href: '#story' },
  { label: 'CONTACT', href: '#contact' },
];

const NAV_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT];

const SEARCH_TAGS = [
  'Kanchipuram Silk',
  'Royal Crimson Sarees',
  'Zari Motifs',
  'Festive Edit',
  'The Craft',
  'Boutiques',
];

export default function Navbar({ onOpenAuth, onOpenCart, currentPatron }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Sync cart count on mount & events
  useEffect(() => {
    const updateCount = () => {
      setCartCount(getCartCount());
    };
    updateCount();
    window.addEventListener('shloka_cart_updated', updateCount);
    return () => window.removeEventListener('shloka_cart_updated', updateCount);
  }, []);

  // Auto-focus input when search bar opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  return (
    <nav className={styles.nav} data-hero-nav aria-label="Main navigation">
      {/* Desktop Navigation */}
      <div className={styles.desktop}>
        {/* Center Container: Nav Links + Centered SHLOKA Emblem */}
        <div className={styles.centerSection}>
          {/* Navigation Links Row */}
          <div className={styles.linksRow}>
            {/* Left links */}
            <ul className={styles.links}>
              {NAV_LINKS_LEFT.map((link, i) => (
                <li key={link.label} className={styles.navItem}>
                  {i > 0 && <span className={styles.dotSeparator} aria-hidden="true">•</span>}
                  <a
                    href={link.href}
                    className={styles.link}
                    id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => {
                      if (window.innerWidth > 768) {
                        e.preventDefault();
                        window.location.hash = link.href;
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Spacer for the center logo gap */}
            <div className={styles.logoSpacer} />

            {/* Right links */}
            <ul className={styles.links}>
              {NAV_LINKS_RIGHT.map((link, i) => (
                <li key={link.label} className={styles.navItem}>
                  {i > 0 && <span className={styles.dotSeparator} aria-hidden="true">•</span>}
                  <a
                    href={link.href}
                    className={styles.link}
                    id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => {
                      if (window.innerWidth > 768) {
                        e.preventDefault();
                        window.location.hash = link.href;
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Centered Brand Logo */}
          <a
            href="/"
            className={styles.centerLogo}
            id="nav-logo"
            data-hero-logo
            aria-label="SHLOKA Home"
            onClick={(e) => {
              if (window.innerWidth > 768) {
                e.preventDefault();
                history.pushState(null, null, ' '); // clear hash
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }
            }}
          >
            <img src={shlokaLogoTypo} alt="SHLOKA" className={styles.typoLogo} />
          </a>
        </div>

        {/* Right: Action Icon Image Buttons & Dropdown Search Bar */}
        <div className={styles.actionsContainer} ref={searchContainerRef}>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
              aria-label="Toggle Search Bar"
              id="nav-search"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <img src={searchIconImg} alt="Search" className={`${styles.iconBtnImg} ${styles.searchIconImg}`} />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label={currentPatron ? `Patron Account: ${currentPatron.fullName}` : "Account Login"}
              id="nav-account"
              onClick={onOpenAuth}
              title={currentPatron ? `Signed in as ${currentPatron.fullName}` : "Sign In / Register"}
            >
              <img src={accountIconImg} alt="Account" className={`${styles.iconBtnImg} ${styles.accountIconImg}`} />
              {currentPatron && <span className={styles.patronOnlineBadge} aria-hidden="true" />}
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label={`Shopping Cart (${cartCount} items)`}
              id="nav-bag"
              onClick={onOpenCart}
              title="View Atelier Shopping Bag"
            >
              <img src={cartIconImg} alt="Cart" className={`${styles.iconBtnImg} ${styles.cartIconImg}`} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>
          </div>

          {/* Capsule Search Bar Dropdown */}
          <div className={`${styles.dropdownSearchBar} ${searchOpen ? styles.dropdownSearchBarOpen : ''}`}>
            <form
              className={styles.dropdownSearchForm}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <span className={styles.dropdownSearchIcon} aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A98455" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16.5 16.5 4.5 4.5" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.dropdownSearchInput}
                placeholder="Search Sarees, Silks & Collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search site content"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.dropdownSearchClear}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Quick Filter Search Tags */}
            <div className={styles.quickTagsSection}>
              <span className={styles.quickTagsHeading}>POPULAR SEARCHES</span>
              <div className={styles.quickTagsList}>
                {SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={styles.tagChip}
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={styles.mobile}>
        <a href="/" className={styles.mobileBrand} aria-label="SHLOKA Home">
          <svg width="22" height="15" viewBox="0 0 28 20" fill="none" className={styles.lotusIconMobile}>
            <path d="M14 1C14 1 17.5 9 14 17C10.5 9 14 1 14 1Z" stroke="currentColor" strokeWidth="1.1" />
            <path d="M6 7C6 7 12.5 10 14 17C8.5 13 6 7 6 7Z" stroke="currentColor" strokeWidth="1.1" />
            <path d="M22 7C22 7 15.5 10 14 17C19.5 13 22 7 22 7Z" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="14" cy="18.5" r="1" fill="currentColor" />
          </svg>
          <img src={shlokaLogoTypo} alt="SHLOKA" className={styles.typoLogoMobile} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Toggle Search Bar"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <img src={searchIconImg} alt="Search" className={`${styles.iconBtnImg} ${styles.searchIconImg}`} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={currentPatron ? `Patron Account: ${currentPatron.fullName}` : "Account Login"}
            onClick={onOpenAuth}
            style={{ position: 'relative' }}
          >
            <img src={accountIconImg} alt="Account" className={`${styles.iconBtnImg} ${styles.accountIconImg}`} />
            {currentPatron && <span className={styles.patronOnlineBadge} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Shopping Cart (${cartCount} items)`}
            onClick={onOpenCart}
            style={{ position: 'relative' }}
          >
            <img src={cartIconImg} alt="Cart" className={`${styles.iconBtnImg} ${styles.cartIconImg}`} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            id="nav-mobile-menu"
          >
            {mobileOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`${styles.overlay} ${mobileOpen ? styles.overlayOpen : ''}`}>
        <div className={styles.overlayInner}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.overlayLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className={styles.overlayLink}
            style={{ background: 'none', border: 'none', color: '#A07F3A', cursor: 'pointer', marginTop: '12px' }}
            onClick={() => {
              setMobileOpen(false);
              onOpenAuth?.();
            }}
          >
            ❖ {currentPatron ? `PATRON: ${currentPatron.fullName.toUpperCase()}` : 'SIGN IN / ACCOUNT'}
          </button>
        </div>
      </div>
    </nav>
  );
}
