import { useState, useEffect, useRef } from 'react';
import shlokaLogoTypo from '../../assets/Shloka-Logo-Typo.png';
import accountIconImg from '../../assets/account-icon_original.png';
import cartIconImg from '../../assets/cart icon_original.png';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import MobileHamburgerDrawer from '../MobileHamburgerDrawer/MobileHamburgerDrawer';
import MobileVisualSearch from '../MobileVisualSearch/MobileVisualSearch';
import { getCartCount } from '../../utils/cart';
import { searchSarees, SEARCH_CHIPS } from '../../utils/catalog';
import styles from './MobileTopHeader.module.css';

export default function MobileTopHeader({
  onOpenSearch,
  onOpenProfile,
  onOpenBag,
  onSelectTab,
  onSelectProduct,
  currentPatron,
  activeMobileTab,
}) {
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync cart count
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('shloka_cart_updated', handleCartUpdate);
    return () => window.removeEventListener('shloka_cart_updated', handleCartUpdate);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Live search results
  const liveResults = searchQuery.trim() ? searchSarees(searchQuery).slice(0, 4) : [];

  // Voice Search Handler
  const handleVoiceSearch = (e) => {
    e.stopPropagation();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsFocused(true);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      const voiceTerm = prompt('Voice Search: Speak or type your search query (e.g. Kanchipuram, Bridal Silk):');
      if (voiceTerm) {
        setSearchQuery(voiceTerm);
        setIsFocused(true);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsFocused(false);
      onOpenSearch?.();
    }
  };

  const handleNavClick = (hash) => {
    setDrawerOpen(false);
    onSelectTab?.('home');
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <header
        className={styles.header}
        ref={searchContainerRef}
        aria-label="Mobile Navigation Header"
        style={activeMobileTab === 'profile' ? { display: 'none' } : undefined}
      >
        {/* Row 1: Animated Hamburger Menu (Left), Shloka Logo (Center), Round Action Icons (Right) */}
        <div className={styles.topRow}>
          {/* Attractive Animated Hamburger Button */}
          <button
            type="button"
            className={`${styles.hamburgerBtn} ${drawerOpen ? styles.hamburgerBtnActive : ''}`}
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-label={drawerOpen ? "Close menu" : "Open luxury menu"}
            aria-expanded={drawerOpen}
          >
            <span className={`${styles.hamLine} ${styles.hamLineTop}`} />
            <span className={`${styles.hamLine} ${styles.hamLineMid}`} />
            <span className={`${styles.hamLine} ${styles.hamLineBot}`} />
          </button>

          {/* Shloka Wordmark Logo (Centered) */}
          <button
            type="button"
            className={styles.logoBtn}
            onClick={() => {
              onSelectTab?.('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="SHLOKA Home"
          >
            <img src={shlokaLogoTypo} alt="Shloka" className={styles.wordmarkLogo} />
          </button>

          <div className={styles.actionIconsGroup}>
            {/* 1. Profile / Account Circular Icon */}
            <button
              type="button"
              className={styles.roundActionBtn}
              onClick={onOpenProfile}
              aria-label={currentPatron ? `Patron Account: ${currentPatron.fullName}` : "Account Login"}
            >
              <img src={accountIconImg} alt="Profile" className={styles.roundIconImg} />
              {currentPatron && <span className={styles.patronDot} aria-hidden="true" />}
            </button>

            {/* 3. Shopping Bag Circular Icon */}
            <button
              type="button"
              className={styles.roundActionBtn}
              onClick={onOpenBag}
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <img src={cartIconImg} alt="Bag" className={styles.roundIconImg} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Row 2: Full-Width Real Interactive Input Search Bar */}
        <div className={styles.searchBarRow}>
          <form onSubmit={handleFormSubmit} className={`${styles.searchBarCapsule} ${isFocused ? styles.searchBarCapsuleActive : ''}`}>
            {/* Left Magnifying Glass Icon */}
            <span className={styles.searchIconSpan} aria-hidden="true">
              <svg
                className={styles.searchIcon}
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A6855"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4.5 4.5" />
              </svg>
            </span>

            {/* Real Input Field */}
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search sarees, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              aria-label="Search sarees, collections"
            />

            {/* Clear Button when Query Exists */}
            {searchQuery && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}

            {/* Visual / Camera Search Button (Marked Position) */}
            <button
              type="button"
              className={styles.visualSearchBtn}
              onClick={(e) => {
                e.stopPropagation();
                setIsFocused(false);
                setIsVisualSearchOpen(true);
              }}
              aria-label="Search sarees by image"
              title="Visual Saree Search"
            >
              <svg
                className={styles.visualSearchIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8C7355"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="3.5" />
                {/* Tiny sparkle motif */}
                <path d="M18 5l.6 1.2L20 7l-1.4.6L18 9l-.6-1.4L16 7l1.4-.6L18 5z" fill="#B8893E" stroke="none" />
              </svg>
            </button>

            {/* Right Microphone Icon (Voice Search) */}
            <button
              type="button"
              className={`${styles.micBtn} ${isListening ? styles.micBtnListening : ''}`}
              onClick={handleVoiceSearch}
              aria-label="Voice Search"
              title={isListening ? "Listening..." : "Voice Search"}
            >
              <svg
                className={styles.micIcon}
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={isListening ? "#8A1528" : "none"}
                stroke={isListening ? "#8A1528" : "#7A6855"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
          </form>

          {/* Live Search Suggestions Dropdown Overlay */}
          {isFocused && (
            <div className={styles.liveDropdown}>
              {/* Quick Filter Tag Chips */}
              <div className={styles.tagsContainer}>
                <span className={styles.tagsHeading}>EXPLORE POPULAR WEAVES</span>
                <div className={styles.chipsScroll}>
                  {SEARCH_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={styles.tagChip}
                      onClick={() => {
                        setSearchQuery(chip);
                        inputRef.current?.focus();
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Search Products List */}
              {searchQuery.trim() && (
                <div className={styles.liveResultsList}>
                  <span className={styles.resultsHeading}>
                    {liveResults.length > 0 ? `FOUND ${liveResults.length} MASTERPIECES` : 'NO WEAVES MATCHED'}
                  </span>

                  {liveResults.map((saree) => (
                    <div
                      key={saree.id}
                      className={styles.liveResultItem}
                      onClick={() => {
                        setIsFocused(false);
                        onSelectProduct?.(saree);
                      }}
                    >
                      <img src={saree.image} alt={saree.name} className={styles.itemThumb} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{saree.name}</span>
                        <span className={styles.itemCategory}>{saree.category} • {saree.color}</span>
                        <span className={styles.itemPrice}>₹{saree.price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className={styles.itemArrow}>→</span>
                    </div>
                  ))}

                  <button
                    type="button"
                    className={styles.viewAllResultsBtn}
                    onClick={() => {
                      setIsFocused(false);
                      onOpenSearch?.();
                    }}
                  >
                    VIEW ALL RESULTS IN SEARCH SCREEN →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Luxury Full-Height Mobile Hamburger Navigation Drawer (<= 768px) */}
      <MobileHamburgerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectTab={onSelectTab}
        onOpenSearch={onOpenSearch}
        onOpenProfile={onOpenProfile}
        onOpenBag={onOpenBag}
        onSelectProduct={onSelectProduct}
      />

      {/* Luxury Visual Saree Search / Image Upload Matcher (<= 768px) */}
      <MobileVisualSearch
        isOpen={isVisualSearchOpen}
        onClose={() => setIsVisualSearchOpen(false)}
        onSelectProduct={onSelectProduct}
        onOpenBag={onOpenBag}
      />
    </>
  );
}
