import { useState, useEffect } from 'react';
import { getCartCount } from '../../utils/cart';
import { getWishlistCount } from '../../utils/wishlist';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav({ activeTab, onSelectTab }) {
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [wishlistCount, setWishlistCount] = useState(() => getWishlistCount());

  // Subscribe to live cart & wishlist events
  useEffect(() => {
    const handleCartUpdate = () => setCartCount(getCartCount());
    const handleWishlistUpdate = () => setWishlistCount(getWishlistCount());

    window.addEventListener('shloka_cart_updated', handleCartUpdate);
    window.addEventListener('shloka_wishlist_updated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('shloka_cart_updated', handleCartUpdate);
      window.removeEventListener('shloka_wishlist_updated', handleWishlistUpdate);
    };
  }, []);

  // Also sync counts on activeTab change
  useEffect(() => {
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());
  }, [activeTab]);

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (isActive) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isActive ? 'none' : 'none'} stroke={isActive ? '#FCFAF6' : '#5E4E3E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: (isActive) => (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#FCFAF6' : '#5E4E3E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l2-5h14l2 5" />
          <path d="M21 9a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M10 22v-6h4v6" />
        </svg>
      ),
    },
    {
      id: 'bag',
      label: 'Bag',
      badge: cartCount > 0 ? cartCount : null,
      icon: (isActive) => (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#FCFAF6' : '#5E4E3E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      badge: wishlistCount > 0 ? wishlistCount : null,
      icon: (isActive) => (
        <svg width="19" height="19" viewBox="0 0 24 24" fill={isActive ? '#FCFAF6' : 'none'} stroke={isActive ? '#FCFAF6' : '#5E4E3E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (isActive) => (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#FCFAF6' : '#5E4E3E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className={styles.navBar} aria-label="Mobile Navigation">
      <div className={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (tab.id === 'shop' && activeTab === 'search');
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
              onClick={() => onSelectTab?.(tab.id)}
              aria-label={`${tab.label} ${tab.badge ? `(${tab.badge} items)` : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`${styles.iconContainer} ${isActive ? styles.iconContainerActive : ''}`}>
                {tab.icon(isActive)}
                {tab.badge && (
                  <span className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`${styles.tabLabel} ${isActive ? styles.tabLabelActive : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
