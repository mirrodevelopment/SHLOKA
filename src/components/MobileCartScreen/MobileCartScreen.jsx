import { useState, useEffect } from 'react';
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  getCartSubtotal,
  getActivePromo,
  applyPromoCode,
  removePromoCode,
} from '../../utils/cart';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import MobileCheckoutScreen from '../MobileCheckoutScreen/MobileCheckoutScreen';
import checkoutBtnImg from '../../assets/Checkout-btn.png';
import applyBtnImg from '../../assets/Apply button.png';
import styles from './MobileCartScreen.module.css';

export default function MobileCartScreen({
  onBack,
  onOpenAuth,
  onSelectProduct,
  onExplore,
  onOpenProfile,
  currentPatron,
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [items, setItems] = useState(() => getCartItems());
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);
  const [activePromo, setActivePromoState] = useState(() => getActivePromo());

  useEffect(() => {
    const handleUpdate = () => {
      setItems(getCartItems());
      setActivePromoState(getActivePromo());
    };
    window.addEventListener('shloka_cart_updated', handleUpdate);
    return () => window.removeEventListener('shloka_cart_updated', handleUpdate);
  }, []);

  const handleQuantityChange = (id, delta) => {
    const target = items.find((i) => i.id === id);
    if (target) {
      updateCartQuantity(id, target.quantity + delta);
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMsg({ type: 'success', text: `${res.promo.label} Applied!` });
      setPromoInput('');
    } else {
      setPromoMsg({ type: 'error', text: res.message });
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoMsg(null);
  };

  const subtotal = getCartSubtotal();
  const discountAmount = activePromo ? Math.round((subtotal * activePromo.discountPercent) / 100) : 0;
  const total = subtotal - discountAmount;

  if (isCheckoutOpen) {
    return (
      <MobileCheckoutScreen
        onBack={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => {
          setIsCheckoutOpen(false);
          onOpenProfile?.();
        }}
        onExplore={() => {
          setIsCheckoutOpen(false);
          onExplore?.();
        }}
        currentPatron={currentPatron}
      />
    );
  }

  return (
    <div className={styles.screen} role="region" aria-label="Shopping Bag">
      {/* ── 1. Top Atelier Bag Header Bar ── */}
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
          <h2 className={styles.topTitle}>A T E L I E R &nbsp; B A G</h2>
          {/* Diamond Motif Divider */}
          <div className={styles.diamondDividerWrap}>
            <svg width="76" height="10" viewBox="0 0 76 10" fill="none" className={styles.diamondSvg}>
              <line x1="0" y1="5" x2="30" y2="5" stroke="#D1BEA4" strokeWidth="1" />
              <polygon points="38,1 43,5 38,9 33,5" fill="none" stroke="#9C7B42" strokeWidth="1.2" />
              <line x1="46" y1="5" x2="76" y2="5" stroke="#D1BEA4" strokeWidth="1" />
            </svg>
          </div>
          <span className={styles.topCount}>{items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}</span>
        </div>

        <div style={{ width: 44 }} />
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyLotus}>
            <BloomingLotusIcon width={36} height={26} stroke="#A07F3A" />
          </div>
          <h3 className={styles.emptyTitle}>Your Bag is Empty</h3>
          <p className={styles.emptySubtitle}>
            Indulge in our curated couture collection of pure silk handloom sarees.
          </p>
          <button
            type="button"
            className={styles.exploreBtn}
            onClick={onExplore || onBack}
          >
            DISCOVER MASTERPIECES
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          {/* ── 2. Complimentary Delivery Banner (Shield Emblem) ── */}
          <div className={styles.perkBanner}>
            <svg className={styles.perkIcon} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#9C7B42" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className={styles.perkText}>
              Complimentary insured white-glove delivery across India
            </span>
          </div>

          {/* ── 3. Cart Items List ── */}
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <div
                  className={styles.itemImageFrame}
                  onClick={() => onSelectProduct?.(item)}
                >
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                </div>

                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h4
                      className={styles.itemName}
                      onClick={() => onSelectProduct?.(item)}
                    >
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>

                  <p className={styles.itemSubtitle}>{item.craft || item.subtitle || 'Banarasi Silk Saree'}</p>
                  <p className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>

                  <div className={styles.itemControls}>
                    {/* Rounded Pill Stepper */}
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.stepVal}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => handleQuantityChange(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.itemTotal}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── 4. Three Luxury Value Pillars Row ── */}
          <div className={styles.valuePillarsRow}>
            {/* Pillar 1 */}
            <div className={styles.pillarCol}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9C7B42" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4.5a3 3 0 0 0-3 3c0 2.5 3 6.5 3 6.5s3-4 3-6.5a3 3 0 0 0-3-3z" />
                <path d="M4 17s3-1.5 6-1.5 5 1.5 8 1.5 4-1 4-1" />
                <path d="M7 21s2.5-1 5-1 5 1 5 1" />
              </svg>
              <div className={styles.pillarText}>
                <span>Handcrafted</span>
                <span>Excellence</span>
              </div>
            </div>

            <div className={styles.pillarDivider} />

            {/* Pillar 2 */}
            <div className={styles.pillarCol}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9C7B42" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
              <div className={styles.pillarText}>
                <span>Premium</span>
                <span>Weaves</span>
              </div>
            </div>

            <div className={styles.pillarDivider} />

            {/* Pillar 3 */}
            <div className={styles.pillarCol}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9C7B42" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M12 8v13" />
                <path d="M3 12h18" />
                <path d="M12 8c-2-2.5-5-1.5-5 0s5 4 5 4" />
                <path d="M12 8c2-2.5 5-1.5 5 0s-5 4-5 4" />
              </svg>
              <div className={styles.pillarText}>
                <span>Secure</span>
                <span>Packaging</span>
              </div>
            </div>
          </div>

          {/* ── 5. Promo Code Privilege Card ── */}
          <div className={styles.promoBox}>
            <span className={styles.promoHeading}>PRIVILEGE CODE</span>
            {activePromo ? (
              <div className={styles.activePromoTag}>
                <span>❖ {activePromo.code} ({activePromo.label})</span>
                <button type="button" onClick={handleRemovePromo} className={styles.removePromoBtn}>
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                <input
                  type="text"
                  placeholder="ENTER SHLOKAVIP OR ROYAL15"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className={styles.promoInput}
                />
                <button
                  type="submit"
                  className={styles.promoApplyBtn}
                  aria-label="Apply privilege code"
                >
                  <img
                    src={applyBtnImg}
                    alt="Apply"
                    className={styles.promoApplyBtnImg}
                  />
                </button>
              </form>
            )}
            {promoMsg && (
              <p className={promoMsg.type === 'success' ? styles.promoSuccess : styles.promoError}>
                {promoMsg.text}
              </p>
            )}
          </div>

          {/* ── 6. Price Summary Card ── */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryVal}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                <span>Privilege Discount ({activePromo?.discountPercent}%)</span>
                <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Insured Heritage Delivery</span>
              <span className={styles.freeBadge}>COMPLIMENTARY</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Applicable Taxes (GST 5%)</span>
              <span className={styles.summaryVal}>Included</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.grandTotalRow}`}>
              <span className={styles.grandLabel}>Total Amount</span>
              <span className={styles.grandVal}>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* ── 7. Assured & Insured Delivery Card ── */}
          <div className={styles.assuranceCard}>
            <div className={styles.assuranceLotusWrap}>
              <BloomingLotusIcon width={28} height={20} stroke="#9C7B42" />
            </div>
            <div className={styles.assuranceText}>
              <span className={styles.assuranceTitle}>ASSURED & INSURED DELIVERY</span>
              <span className={styles.assuranceSubtitle}>
                Your order is fully insured from our atelier to your doorstep.
              </span>
            </div>
            <span className={styles.assuranceArrow}>›</span>
          </div>
        </div>
      )}

      {/* ── 8. Sticky Bottom Checkout Container ── */}
      {items.length > 0 && (
        <div className={styles.stickyCheckout}>
          <div className={styles.checkoutPriceBlock}>
            <span className={styles.checkoutLabel}>TOTAL AMOUNT</span>
            <span className={styles.checkoutAmount}>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={() => setIsCheckoutOpen(true)}
            aria-label="Proceed to Checkout"
          >
            <img
              src={checkoutBtnImg}
              alt="Proceed to Checkout"
              className={styles.checkoutBtnImg}
            />
          </button>
        </div>
      )}
    </div>
  );
}
