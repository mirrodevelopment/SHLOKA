// ============================================================
// SHLOKA — Luxury Atelier Cart Drawer & Page Component
// ============================================================

import { useState, useEffect, useRef } from 'react';
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartSubtotal,
  getActivePromo,
  applyPromoCode,
  removePromoCode,
} from '../../utils/cart';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose, onOpenAuth, currentPatron }) {
  const [items, setItems] = useState(() => getCartItems());
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [activePromo, setActivePromo] = useState(() => getActivePromo());
  const [giftWrap, setGiftWrap] = useState(true);
  const [blouseFinishing, setBlouseFinishing] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const drawerRef = useRef(null);

  // Sync cart items on mount & listen to updates
  useEffect(() => {
    const syncCart = () => {
      setItems(getCartItems());
      setActivePromo(getActivePromo());
    };

    syncCart();
    window.addEventListener('shloka_cart_updated', syncCart);
    return () => window.removeEventListener('shloka_cart_updated', syncCart);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isCheckingOut) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isCheckingOut, onClose]);

  const subtotal = getCartSubtotal();
  const discountPercent = activePromo ? activePromo.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;
  const totalItemsCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (!promoCodeInput.trim()) return;

    const result = applyPromoCode(promoCodeInput);
    if (result.success) {
      setActivePromo(result.promo);
      setPromoSuccess(`Privilege Applied: ${result.promo.label}`);
      setPromoCodeInput('');
    } else {
      setPromoError(result.message || 'Invalid Atelier Promo Code');
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setActivePromo(null);
    setPromoSuccess('');
    setPromoError('');
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const generatedOrder = `SHL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setOrderConfirmed(true);
      setIsCheckingOut(false);
      clearCart();
    }, 1200);
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isCheckingOut) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Shloka Atelier Shopping Bag"
    >
      <div className={styles.drawerPanel} ref={drawerRef}>
        {/* ── Top Header ── */}
        <header className={styles.drawerHeader}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerLotusIcon} aria-hidden="true">
              <BloomingLotusIcon width={22} height={16} stroke="#A07F3A" />
            </div>
            <div>
              <span className={styles.headerEyebrow}>PRIVATE COUTURE</span>
              <h2 className={styles.headerTitle}>
                YOUR ATELIER BAG{' '}
                <span className={styles.itemCountBadge}>({totalItemsCount})</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close Shopping Bag"
          >
            ✕
          </button>
        </header>

        {/* ── Complimentary White-Glove Courier Banner ── */}
        <div className={styles.courierBanner}>
          <span className={styles.courierIcon} aria-hidden="true">✨</span>
          <span className={styles.courierText}>
            Complimentary White-Glove Insured Delivery & Palace Velvet Storage Bag
          </span>
        </div>

        {/* ── Main Scrollable Body ── */}
        <div className={styles.drawerBody}>
          {orderConfirmed ? (
            /* ── Order Confirmation Success View ── */
            <div className={styles.orderSuccessContainer}>
              <div className={styles.successLotus}>
                <BloomingLotusIcon width={48} height={36} stroke="#8A1528" />
              </div>
              <span className={styles.successEyebrow}>HEIRLOOMS RESERVED</span>
              <h3 className={styles.successTitle}>Reservation Confirmed</h3>
              <p className={styles.orderNumberText}>
                Atelier Order Reference: <strong>{orderNumber}</strong>
              </p>
              <div className={styles.successDivider} />
              <p className={styles.successMessage}>
                Thank you{currentPatron ? `, ${currentPatron.fullName}` : ''}. Our master
                draper and artisan concierge are carefully preparing your handwoven silk
                treasures with 24K electroplated zari in our signature palace wooden box.
              </p>

              <div className={styles.deliveryEstimateCard}>
                <span className={styles.estimateLabel}>ESTIMATED WHITE-GLOVE DISPATCH:</span>
                <strong className={styles.estimateDate}>Within 48 Hours • Fully Insured</strong>
              </div>

              <button
                type="button"
                className={styles.continueShoppingBtn}
                onClick={() => {
                  setOrderConfirmed(false);
                  onClose();
                }}
              >
                CONTINUE EXPLORING SHLOKA
              </button>
            </div>
          ) : items.length === 0 ? (
            /* ── Empty Cart State ── */
            <div className={styles.emptyCartContainer}>
              <div className={styles.emptyLotus}>
                <BloomingLotusIcon width={42} height={32} stroke="#C9B38D" />
              </div>
              <h3 className={styles.emptyTitle}>Your Atelier Bag is Empty</h3>
              <p className={styles.emptySub}>
                Discover timeless handloom silk sarees woven from royal heritage memory.
              </p>
              <button
                type="button"
                className={styles.exploreSareesBtn}
                onClick={() => {
                  onClose();
                  const el = document.getElementById('collections') || document.querySelector('[data-col-text]');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE CURATED SAREES
              </button>
            </div>
          ) : (
            /* ── Populated Cart List ── */
            <>
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <article key={item.id} className={styles.cartItemCard}>
                    {/* Saree Thumbnail with Gold Arch Frame */}
                    <div className={styles.itemImageWrapper}>
                      <img src={item.image} alt={item.name} className={styles.itemImage} />
                    </div>

                    {/* Saree Info */}
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeaderRow}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <button
                          type="button"
                          className={styles.removeItemBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      <p className={styles.itemSubtitle}>{item.subtitle || item.weave}</p>
                      <span className={styles.itemCraftBadge}>{item.craft || 'Handwoven Heritage Silk'}</span>

                      <div className={styles.itemPriceRow}>
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={styles.qtyValue}>{item.quantity || 1}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.itemPriceBlock}>
                          <span className={styles.itemTotalPrice}>
                            {formatINR(item.price * (item.quantity || 1))}
                          </span>
                          {(item.quantity || 1) > 1 && (
                            <span className={styles.itemUnitPrice}>
                              ({formatINR(item.price)} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* ── Luxury Bespoke Services Options ── */}
              <div className={styles.servicesSection}>
                <h5 className={styles.servicesHeading}>COMPLIMENTARY ATELIER SERVICES</h5>

                <label className={styles.serviceOption}>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className={styles.serviceCheckbox}
                  />
                  <div className={styles.serviceTextGroup}>
                    <span className={styles.serviceTitle}>Royal Wooden Gift Box & Zari Pouch</span>
                    <span className={styles.serviceSub}>
                      Archival velvet-lined box with personalized handwritten calligraphy card.
                    </span>
                  </div>
                </label>

                <label className={styles.serviceOption}>
                  <input
                    type="checkbox"
                    checked={blouseFinishing}
                    onChange={(e) => setBlouseFinishing(e.target.checked)}
                    className={styles.serviceCheckbox}
                  />
                  <div className={styles.serviceTextGroup}>
                    <span className={styles.serviceTitle}>Saree Fall, Pico & Tassel Finishing</span>
                    <span className={styles.serviceSub}>
                      Expert master-tailored edge finishing, ready to drape upon arrival.
                    </span>
                  </div>
                </label>
              </div>

              {/* ── Privilege Promo Code Input ── */}
              <div className={styles.promoSection}>
                {activePromo ? (
                  <div className={styles.activePromoCard}>
                    <div>
                      <span className={styles.activePromoBadge}>CODE APPLIED: {activePromo.code}</span>
                      <p className={styles.activePromoLabel}>{activePromo.label}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.removePromoBtn}
                      onClick={handleRemovePromo}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Enter Privilege Code (e.g. SHLOKAVIP)"
                      className={styles.promoInput}
                    />
                    <button type="submit" className={styles.promoApplyBtn}>
                      APPLY
                    </button>
                  </form>
                )}

                {promoError && <p className={styles.promoErrorText}>{promoError}</p>}
                {promoSuccess && <p className={styles.promoSuccessText}>{promoSuccess}</p>}

                {!activePromo && (
                  <div className={styles.promoHints}>
                    <span>Try: </span>
                    <button
                      type="button"
                      className={styles.promoHintChip}
                      onClick={() => setPromoCodeInput('SHLOKAVIP')}
                    >
                      SHLOKAVIP
                    </button>
                    <button
                      type="button"
                      className={styles.promoHintChip}
                      onClick={() => setPromoCodeInput('ROYAL15')}
                    >
                      ROYAL15
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Bottom Summary & Checkout Footer ── */}
        {!orderConfirmed && items.length > 0 && (
          <footer className={styles.drawerFooter}>
            <div className={styles.summaryBreakdown}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Atelier Subtotal</span>
                <span className={styles.summaryVal}>{formatINR(subtotal)}</span>
              </div>

              {activePromo && (
                <div className={`${styles.summaryRow} ${styles.summaryRowDiscount}`}>
                  <span className={styles.summaryLabel}>Patron Privilege ({activePromo.discountPercent}%)</span>
                  <span className={styles.summaryVal}>−{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Insured White-Glove Courier</span>
                <span className={styles.summaryComplimentary}>COMPLIMENTARY</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Palace Gift Packaging</span>
                <span className={styles.summaryComplimentary}>INCLUDED</span>
              </div>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total Investment</span>
                <span className={styles.totalVal}>{formatINR(finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={handleProceedToCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <span className={styles.checkoutLoading}>
                  <span className={styles.spinner} /> RESERVING HEIRLOOMS...
                </span>
              ) : (
                <>
                  <span>PROCEED TO PRIVATE CHECKOUT</span>
                  <span className={styles.checkoutArrow}>➔</span>
                </>
              )}
            </button>

            <div className={styles.trustBadges}>
              <span>🔒 256-Bit Encrypted</span>
              <span>•</span>
              <span>⚜ 100% Certified Pure Silk</span>
              <span>•</span>
              <span>✨ Silk Mark Tagged</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
