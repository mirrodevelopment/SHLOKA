import { useState, useEffect } from 'react';
import { getWishlistItems, removeFromWishlist } from '../../utils/wishlist';
import { addToCart } from '../../utils/cart';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import exploreSareesBtnImg from '../../assets/Explore-Sarees-btn.png';
import styles from './MobileWishlistScreen.module.css';

export default function MobileWishlistScreen({ onBack, onSelectProduct, onExplore }) {
  const [items, setItems] = useState(() => getWishlistItems());
  const [addedNotification, setAddedNotification] = useState(null);

  useEffect(() => {
    const handleWishlistChange = () => setItems(getWishlistItems());
    window.addEventListener('shloka_wishlist_updated', handleWishlistChange);
    return () => window.removeEventListener('shloka_wishlist_updated', handleWishlistChange);
  }, []);

  const handleMoveToBag = (saree, e) => {
    e.stopPropagation();
    addToCart(saree);
    removeFromWishlist(saree.id);
    setAddedNotification(`${saree.name} moved to Bag`);
    setTimeout(() => setAddedNotification(null), 2500);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    removeFromWishlist(id);
  };

  return (
    <div className={styles.screen} role="region" aria-label="Wishlist">
      {/* Top Header */}
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className={styles.topTitleGroup}>
          <h2 className={styles.topTitle}>SAVED HEIRLOOMS</h2>
          <span className={styles.topCount}>{items.length} {items.length === 1 ? 'SAREE' : 'SAREES'}</span>
        </div>
        <div style={{ width: 44 }} />
      </div>

      {/* Floating Notification Toast */}
      {addedNotification && (
        <div className={styles.toast}>
          <span>✓ {addedNotification}</span>
        </div>
      )}

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyLotus}>
            <BloomingLotusIcon width={36} height={26} stroke="#A07F3A" />
          </div>
          <h3 className={styles.emptyTitle}>Your Wishlist Awaits</h3>
          <p className={styles.emptySubtitle}>
            Save the sarees that speak to you.
          </p>
          <button
            type="button"
            className={styles.exploreBtn}
            onClick={onExplore || onBack}
            aria-label="Explore Sarees"
          >
            <img
              src={exploreSareesBtnImg}
              alt="Explore Sarees"
              className={styles.exploreBtnImg}
            />
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.grid}>
            {items.map((saree) => (
              <article
                key={saree.id}
                className={styles.card}
                onClick={() => onSelectProduct?.(saree)}
              >
                <div className={styles.imageBox}>
                  <img src={saree.image} alt={saree.name} className={styles.productImg} />
                  <button
                    type="button"
                    className={styles.heartBtn}
                    onClick={(e) => handleRemove(saree.id, e)}
                    aria-label={`Remove ${saree.name} from wishlist`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#8A1528" stroke="#8A1528" strokeWidth="1.8">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>

                <div className={styles.cardInfo}>
                  <h4 className={styles.sareeName}>{saree.name}</h4>
                  <p className={styles.sareeSubtitle}>{saree.category || 'Pure Silk'}</p>
                  <p className={styles.sareePrice}>₹{saree.price.toLocaleString('en-IN')}</p>

                  <button
                    type="button"
                    className={styles.moveToBagBtn}
                    onClick={(e) => handleMoveToBag(saree, e)}
                  >
                    MOVE TO BAG
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
