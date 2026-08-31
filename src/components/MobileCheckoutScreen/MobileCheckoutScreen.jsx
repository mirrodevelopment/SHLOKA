import { useState, useEffect } from 'react';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import {
  getCartItems,
  getCartSubtotal,
  getActivePromo,
  updateCartQuantity,
  clearCart,
} from '../../utils/cart';
import continueBtnImg from '../../assets/Continue-btn.png';
import verifyBtnImg from '../../assets/Verify-btn.png';
import styles from './MobileCheckoutScreen.module.css';

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    type: 'Home',
    name: 'Ananya Ramaswamy',
    line1: 'No. 23, Race Course Road',
    line2: 'Coimbatore, Tamil Nadu – 641018',
    phone: '+91 98421 88410',
  },
  {
    id: 'addr-2',
    type: 'Home',
    name: 'Ananya R. (Ancestral Residence)',
    line1: '14, Palace Road, Alwarpet',
    line2: 'Chennai, Tamil Nadu – 600018',
    phone: '+91 98421 88410',
  },
  {
    id: 'addr-3',
    type: 'Office',
    name: 'Studio Shloka Heritage',
    line1: 'Plot 7, Vittal Mallya Road',
    line2: 'Bengaluru, Karnataka – 560001',
    phone: '+91 98421 88410',
  },
];

const ADDRESS_STORAGE_KEY = 'shloka_saved_addresses';
const SELECTED_ADDR_KEY = 'shloka_selected_address_id';

export default function MobileCheckoutScreen({ onBack, onOrderSuccess, onExplore, currentPatron }) {
  // Navigation Steps: 'confirm' | 'payment' | 'success'
  const [step, setStep] = useState('confirm');

  // Cart Data
  const [items, setItems] = useState(() => getCartItems());
  const [activePromo, setActivePromoState] = useState(() => getActivePromo());

  // Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const raw = localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return DEFAULT_ADDRESSES;
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    try {
      const raw = localStorage.getItem(SELECTED_ADDR_KEY);
      if (raw) return raw;
    } catch {
      // fallback
    }
    return DEFAULT_ADDRESSES[0].id;
  });

  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    type: 'Home',
  });

  // Payment Methods State
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: true,
  });
  const [selectedBank, setSelectedBank] = useState('hdfc');
  const [isAmountExpanded, setIsAmountExpanded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Sync Cart
  useEffect(() => {
    const handleCartSync = () => {
      setItems(getCartItems());
      setActivePromoState(getActivePromo());
    };
    window.addEventListener('shloka_cart_updated', handleCartSync);
    return () => window.removeEventListener('shloka_cart_updated', handleCartSync);
  }, []);

  // Save Addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    } catch (err) {
      console.error(err);
    }
  }, [addresses]);

  useEffect(() => {
    try {
      localStorage.setItem(SELECTED_ADDR_KEY, selectedAddressId);
    } catch (err) {
      console.error(err);
    }
  }, [selectedAddressId]);

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || DEFAULT_ADDRESSES[0];

  // Price Calculations
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const originalSubtotal = items.reduce(
    (sum, i) => sum + (i.originalPrice || i.price * 1.15) * (i.quantity || 1),
    0
  );
  const promoDiscount = activePromo
    ? Math.round((subtotal * activePromo.discountPercent) / 100)
    : 0;
  const catalogueSavings = Math.max(0, originalSubtotal - subtotal);
  const totalSavings = catalogueSavings + promoDiscount;
  const total = Math.max(0, subtotal - promoDiscount);

  const handleQuantityChange = (id, delta) => {
    const target = items.find((i) => i.id === id);
    if (target) {
      updateCartQuantity(id, target.quantity + delta);
    }
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.line1 || !newAddress.line2) return;

    const created = {
      id: `addr-${Date.now()}`,
      type: newAddress.type || 'Home',
      name: newAddress.name,
      line1: newAddress.line1,
      line2: newAddress.line2,
      phone: newAddress.phone || '+91 98421 88410',
    };

    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressId(created.id);
    setIsAddingAddress(false);
    setNewAddress({
      name: '',
      phone: '',
      line1: '',
      line2: '',
      type: 'Home',
    });
  };

  const handleCompleteOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const orderRef = `SHL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderRecord = {
        id: orderRef,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        amount: total,
        items: [...items],
        address: { ...activeAddress },
        paymentMethod,
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem('shloka_patron_orders') || '[]');
        localStorage.setItem(
          'shloka_patron_orders',
          JSON.stringify([orderRecord, ...existingOrders])
        );
      } catch {
        // fallback
      }

      setPlacedOrder(orderRecord);
      clearCart();
      setIsProcessingPayment(false);
      setStep('success');
    }, 1400);
  };

  return (
    <div className={styles.screen} role="region" aria-label="Checkout">
      {/* ============================================================
          STEP 1: CONFIRM DETAILS (Matches Reference Image 2 & 3)
          ============================================================ */}
      {step === 'confirm' && (
        <div className={styles.stepContainer}>
          {/* Header with Back Arrow & Stepper */}
          <header className={styles.checkoutHeader}>
            <div className={styles.headerTopRow}>
              <button
                type="button"
                className={styles.headerBackBtn}
                onClick={onBack}
                aria-label="Back to bag"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className={styles.headerTitle}>Confirm details</h2>
              <div style={{ width: 36 }} />
            </div>

            {/* Stepper Progress Bar */}
            <div className={styles.stepperWrap}>
              <div className={styles.stepNode}>
                <span className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={styles.stepLabel}>Address</span>
              </div>

              <div className={`${styles.stepLine} ${styles.stepLineActive}`} />

              <div className={styles.stepNode}>
                <span className={`${styles.stepCircle} ${styles.stepCircleActive}`}>2</span>
                <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>Confirm details</span>
              </div>

              <div className={styles.stepLine} />

              <div className={styles.stepNode}>
                <span className={styles.stepCircle}>3</span>
                <span className={styles.stepLabel}>Payment</span>
              </div>
            </div>
          </header>

          {/* Scrollable Content Body */}
          <div className={styles.scrollBody}>
            {/* 1. Delivering to Card */}
            <section className={styles.deliveringSection}>
              <h4 className={styles.sectionHeading}>Delivering to</h4>
              <div className={styles.deliveringCard}>
                <div className={styles.deliveringTopRow}>
                  <div className={styles.deliveringUserGroup}>
                    <span className={styles.homeIconWrap}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </span>
                    <span className={styles.deliveringName}>{activeAddress.name}</span>
                  </div>

                  <button
                    type="button"
                    className={styles.changeAddressBtn}
                    onClick={() => setIsAddressSheetOpen(true)}
                  >
                    Change
                  </button>
                </div>

                <p className={styles.deliveringAddressText}>{activeAddress.line1}, {activeAddress.line2}</p>
                <p className={styles.deliveringPhoneText}>{activeAddress.phone}</p>
              </div>
            </section>

            {/* 2. Items Review Cards */}
            <section className={styles.itemsReviewSection}>
              {items.map((item) => (
                <div key={item.id} className={styles.itemReviewCard}>
                  <div className={styles.itemMainRow}>
                    <img src={item.image} alt={item.name} className={styles.itemThumb} />

                    <div className={styles.itemMetaCol}>
                      <span className={styles.itemHeritageBadge}>✦ Pure Handloom Silk</span>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemSubtitle}>{item.subtitle || item.weave || 'Bespoke Pure Silk Saree'}</p>

                      <div className={styles.itemPriceRow}>
                        <span className={styles.itemCurrentPrice}>₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                        {item.originalPrice && (
                          <span className={styles.itemOldPrice}>₹{(item.originalPrice * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                        )}
                        <span className={styles.itemDiscountText}>Special Privilege</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemFooterRow}>
                    <div className={styles.stepperPill}>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.stepperCount}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        onClick={() => handleQuantityChange(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.deliveryEstimatePill}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      <span>Delivery by Thursday, 3 Sep</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 3. Price Details Card */}
            <section className={styles.priceDetailsCard}>
              <h4 className={styles.priceCardTitle}>Price Details</h4>

              <div className={styles.priceRow}>
                <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <span className={styles.priceVal}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoDiscount > 0 && (
                <div className={`${styles.priceRow} ${styles.discountPriceRow}`}>
                  <span>Privilege Discount ({activePromo?.discountPercent}%)</span>
                  <span>−₹{promoDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className={styles.priceRow}>
                <span>White-Glove Heritage Delivery</span>
                <span className={styles.complimentaryVal}>COMPLIMENTARY</span>
              </div>

              <div className={styles.priceRow}>
                <span>Applicable Taxes (GST 5%)</span>
                <span className={styles.includedVal}>Included</span>
              </div>

              <div className={styles.priceDivider} />

              <div className={styles.totalPriceRow}>
                <span className={styles.totalLabel}>Total Amount</span>
                <span className={styles.totalAmountVal}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Savings Announcement Banner in soft blush red */}
              {totalSavings > 0 && (
                <div className={styles.savingsBanner}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>You will save ₹{totalSavings.toLocaleString('en-IN')} on this royal order</span>
                </div>
              )}

              {/* Trust Guarantee */}
              <div className={styles.trustRow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className={styles.trustText}>
                  Safe & encrypted payments. 100% Certified Handcrafted Heritage Silk.
                </p>
              </div>
            </section>
          </div>

          {/* Sticky Bottom Bar (Matches Reference Image 2 Exactly) */}
          <footer className={styles.stickyFooterBar}>
            {totalSavings > 0 && (
              <div className={styles.footerSavingsStrip}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>You'll save ₹{totalSavings.toLocaleString('en-IN')} on this order</span>
              </div>
            )}

            <div className={styles.footerActionRow}>
              <div className={styles.footerPriceBlock}>
                {originalSubtotal > total && (
                  <span className={styles.footerOldPrice}>₹{originalSubtotal.toLocaleString('en-IN')}</span>
                )}
                <span className={styles.footerTotalAmount}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="button"
                className={styles.continueBtn}
                onClick={() => {
                  setStep('payment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Continue to Payment"
              >
                <img
                  src={continueBtnImg}
                  alt="Continue"
                  className={styles.continueBtnImg}
                />
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* ============================================================
          STEP 2: PAYMENT METHODS (Matches Reference Image 4)
          ============================================================ */}
      {step === 'payment' && (
        <div className={styles.stepContainer}>
          {/* Header */}
          <header className={styles.checkoutHeader}>
            <div className={styles.headerTopRow}>
              <button
                type="button"
                className={styles.headerBackBtn}
                onClick={() => setStep('confirm')}
                aria-label="Back to confirm details"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div className={styles.paymentHeaderTitleCol}>
                <span className={styles.stepSubtitle}>Step 3 of 3</span>
                <h2 className={styles.paymentHeaderTitle}>Payments</h2>
              </div>

              <div className={styles.securePill}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>100% Secure</span>
              </div>
            </div>

            {/* Collapsible Total Amount Summary Bar */}
            <div
              className={styles.totalAmountCollapsibleBar}
              onClick={() => setIsAmountExpanded(!isAmountExpanded)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.totalAmountLeft}>
                <span>Total Amount</span>
                <span className={`${styles.amountChevron} ${isAmountExpanded ? styles.amountChevronRotated : ''}`}>
                  ▾
                </span>
              </div>
              <span className={styles.totalAmountHeaderVal}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            {isAmountExpanded && (
              <div className={styles.amountBreakdownBox}>
                <div className={styles.amountBreakdownRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className={styles.amountBreakdownRow}>
                    <span>Privilege Discount</span>
                    <span style={{ color: '#7B1C2A' }}>−₹{promoDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className={styles.amountBreakdownRow}>
                  <span>White-Glove Delivery</span>
                  <span style={{ color: '#2E7D32' }}>Free</span>
                </div>
              </div>
            )}
          </header>

          {/* Payment Methods Accordions List */}
          <div className={styles.scrollBody}>
            <div className={styles.paymentMethodsList}>
              {/* 1. Recommended UPI */}
              <div className={styles.paymentAccordion}>
                <button
                  type="button"
                  className={`${styles.paymentRowBtn} ${paymentMethod === 'upi' ? styles.paymentRowActive : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className={styles.paymentRowLeft}>
                    <span className={styles.paymentIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </span>
                    <div className={styles.paymentRowLabelCol}>
                      <span className={styles.paymentRowTitle}>Recommended for You</span>
                      <span className={styles.paymentRowDesc}>Instant UPI via GPay, PhonePe, Paytm</span>
                    </div>
                  </div>
                  <span className={`${styles.paymentChevron} ${paymentMethod === 'upi' ? styles.paymentChevronOpen : ''}`}>
                    ›
                  </span>
                </button>

                {paymentMethod === 'upi' && (
                  <div className={styles.paymentPanel}>
                    <div className={styles.upiOptionsGrid}>
                      {[
                        { id: 'gpay', label: 'Google Pay' },
                        { id: 'phonepe', label: 'PhonePe' },
                        { id: 'paytm', label: 'Paytm UPI' },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          className={`${styles.upiChip} ${selectedUpiApp === app.id ? styles.upiChipActive : ''}`}
                          onClick={() => setSelectedUpiApp(app.id)}
                        >
                          <span className={styles.upiRadioCircle}>
                            {selectedUpiApp === app.id && <span className={styles.upiRadioDot} />}
                          </span>
                          <span className={styles.upiChipText}>{app.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className={styles.upiInputRow}>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={styles.upiInputField}
                      />
                      <button type="button" className={styles.upiVerifyBtn} aria-label="Verify UPI ID">
                        <img
                          src={verifyBtnImg}
                          alt="Verify"
                          className={styles.upiVerifyBtnImg}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Luxury Pay in 3 / EMI */}
              <div className={styles.paymentAccordion}>
                <button
                  type="button"
                  className={`${styles.paymentRowBtn} ${paymentMethod === 'emi' ? styles.paymentRowActive : ''}`}
                  onClick={() => setPaymentMethod('emi')}
                >
                  <div className={styles.paymentRowLeft}>
                    <span className={styles.paymentIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div className={styles.paymentRowLabelCol}>
                      <span className={styles.paymentRowTitle}>Pay in 3 (Zero-Interest EMI)</span>
                      <span className={styles.paymentRowDesc}>3 equal monthly instalments of ₹{Math.round(total / 3).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <span className={`${styles.paymentChevron} ${paymentMethod === 'emi' ? styles.paymentChevronOpen : ''}`}>
                    ›
                  </span>
                </button>

                {paymentMethod === 'emi' && (
                  <div className={styles.paymentPanel}>
                    <div className={styles.emiScheduleBox}>
                      <div className={styles.emiScheduleItem}>
                        <span className={styles.emiMonth}>Today</span>
                        <span className={styles.emiAmount}>₹{Math.round(total / 3).toLocaleString('en-IN')}</span>
                      </div>
                      <div className={styles.emiScheduleDivider}>→</div>
                      <div className={styles.emiScheduleItem}>
                        <span className={styles.emiMonth}>Next Month</span>
                        <span className={styles.emiAmount}>₹{Math.round(total / 3).toLocaleString('en-IN')}</span>
                      </div>
                      <div className={styles.emiScheduleDivider}>→</div>
                      <div className={styles.emiScheduleItem}>
                        <span className={styles.emiMonth}>Month 3</span>
                        <span className={styles.emiAmount}>₹{Math.round(total / 3).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <span className={styles.emiBenefitNote}>✦ 0% Interest • No hidden processing fee</span>
                  </div>
                )}
              </div>

              {/* 3. Credit / Debit Cards */}
              <div className={styles.paymentAccordion}>
                <button
                  type="button"
                  className={`${styles.paymentRowBtn} ${paymentMethod === 'card' ? styles.paymentRowActive : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className={styles.paymentRowLeft}>
                    <span className={styles.paymentIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </span>
                    <div className={styles.paymentRowLabelCol}>
                      <span className={styles.paymentRowTitle}>Credit / Debit / ATM Card</span>
                      <span className={styles.paymentRowDesc}>Visa, Mastercard, RuPay, Amex</span>
                    </div>
                  </div>
                  <span className={`${styles.paymentChevron} ${paymentMethod === 'card' ? styles.paymentChevronOpen : ''}`}>
                    ›
                  </span>
                </button>

                {paymentMethod === 'card' && (
                  <div className={styles.paymentPanel}>
                    <div className={styles.cardInputsForm}>
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        maxLength={19}
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className={styles.cardInputField}
                      />
                      <div className={styles.cardSplitRow}>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          maxLength={5}
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className={styles.cardInputField}
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className={styles.cardInputField}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className={styles.cardInputField}
                      />
                      <label className={styles.saveCardCheckbox}>
                        <input
                          type="checkbox"
                          checked={cardData.saveCard}
                          onChange={(e) => setCardData({ ...cardData, saveCard: e.target.checked })}
                        />
                        <span>Save this card securely as per RBI guidelines</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Royal Net Banking */}
              <div className={styles.paymentAccordion}>
                <button
                  type="button"
                  className={`${styles.paymentRowBtn} ${paymentMethod === 'netbanking' ? styles.paymentRowActive : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className={styles.paymentRowLeft}>
                    <span className={styles.paymentIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 22 7 12 2" />
                        <line x1="4" y1="10" x2="4" y2="18" />
                        <line x1="9" y1="10" x2="9" y2="18" />
                        <line x1="15" y1="10" x2="15" y2="18" />
                        <line x1="20" y1="10" x2="20" y2="18" />
                        <line x1="2" y1="22" x2="22" y2="22" />
                      </svg>
                    </span>
                    <div className={styles.paymentRowLabelCol}>
                      <span className={styles.paymentRowTitle}>Royal Net Banking</span>
                      <span className={styles.paymentRowDesc}>All Indian banks supported</span>
                    </div>
                  </div>
                  <span className={`${styles.paymentChevron} ${paymentMethod === 'netbanking' ? styles.paymentChevronOpen : ''}`}>
                    ›
                  </span>
                </button>

                {paymentMethod === 'netbanking' && (
                  <div className={styles.paymentPanel}>
                    <div className={styles.banksGrid}>
                      {[
                        { id: 'hdfc', name: 'HDFC Bank' },
                        { id: 'icici', name: 'ICICI Bank' },
                        { id: 'sbi', name: 'SBI' },
                        { id: 'axis', name: 'Axis Bank' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          className={`${styles.bankChip} ${selectedBank === bank.id ? styles.bankChipActive : ''}`}
                          onClick={() => setSelectedBank(bank.id)}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. White-Glove Cash on Delivery */}
              <div className={styles.paymentAccordion}>
                <button
                  type="button"
                  className={`${styles.paymentRowBtn} ${paymentMethod === 'cod' ? styles.paymentRowActive : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className={styles.paymentRowLeft}>
                    <span className={styles.paymentIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M6 12h.01M18 12h.01" />
                      </svg>
                    </span>
                    <div className={styles.paymentRowLabelCol}>
                      <span className={styles.paymentRowTitle}>Cash / UPI on Delivery</span>
                      <span className={styles.paymentRowDesc}>Pay with cash or scan QR upon white-glove delivery</span>
                    </div>
                  </div>
                  <span className={`${styles.paymentChevron} ${paymentMethod === 'cod' ? styles.paymentChevronOpen : ''}`}>
                    ›
                  </span>
                </button>

                {paymentMethod === 'cod' && (
                  <div className={styles.paymentPanel}>
                    <p className={styles.codNoteText}>
                      Our private white-glove courier will present your boxed heirloom saree. You may inspect the seal and pay via cash or UPI directly to the courier executive.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Footer */}
            <div className={styles.paymentTrustFooter}>
              <BloomingLotusIcon width={22} height={16} stroke="#A07F3A" />
              <p className={styles.paymentTrustHeadline}>
                35,000+ happy connoisseurs of handloom silk and counting
              </p>
              <p className={styles.paymentTrustSubtext}>
                Certified Silk Mark Guarantee • 256-Bit Bank Grade Encryption
              </p>
            </div>
          </div>

          {/* Sticky Pay Bottom Bar */}
          <footer className={styles.stickyFooterBar}>
            <div className={styles.footerActionRow}>
              <div className={styles.footerPriceBlock}>
                <span className={styles.footerPriceMiniLabel}>TO BE PAID</span>
                <span className={styles.footerTotalAmount}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="button"
                className={styles.payNowBtn}
                onClick={handleCompleteOrder}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <span className={styles.processingSpinner}>Authorizing Commission...</span>
                ) : (
                  <>
                    <span>PAY ₹{total.toLocaleString('en-IN')} SECURELY</span>
                    <span className={styles.lockIcon}>🔒</span>
                  </>
                )}
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* ============================================================
          STEP 3: ORDER SUCCESS CELEBRATION MODAL
          ============================================================ */}
      {step === 'success' && placedOrder && (
        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successLotusWrap}>
              <BloomingLotusIcon width={48} height={34} stroke="#A07F3A" />
            </div>

            <span className={styles.successTagline}>BESPOKE COMMISSION CONFIRMED</span>
            <h2 className={styles.successHeading}>Royal Order Confirmed</h2>

            <p className={styles.successOrderRef}>
              Order Reference: <strong>{placedOrder.id}</strong>
            </p>

            <div className={styles.successDetailsBox}>
              <div className={styles.successDetailRow}>
                <span>Patron:</span>
                <strong>{placedOrder.address.name}</strong>
              </div>
              <div className={styles.successDetailRow}>
                <span>Dispatch Location:</span>
                <span>{placedOrder.address.line1}, {placedOrder.address.line2}</span>
              </div>
              <div className={styles.successDetailRow}>
                <span>Total Consideration:</span>
                <strong style={{ color: '#7B1C2A' }}>₹{placedOrder.amount.toLocaleString('en-IN')}</strong>
              </div>
              <div className={styles.successDetailRow}>
                <span>Estimated Arrival:</span>
                <span style={{ color: '#2E7D32', fontWeight: 600 }}>Thursday, 3 September</span>
              </div>
            </div>

            <p className={styles.successNotice}>
              A royal certificate of authenticity and dispatch tracking link have been dispatched to your registered contact. Our master drapers are preparing your white-glove packaging.
            </p>

            <div className={styles.successActionsCol}>
              <button
                type="button"
                className={styles.viewOrderBtn}
                onClick={() => onOrderSuccess?.()}
              >
                VIEW ORDER IN PROFILE
              </button>
              <button
                type="button"
                className={styles.continueShoppingBtn}
                onClick={() => onExplore?.()}
              >
                CONTINUE BROWSING ATELIER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          INTERACTIVE DELIVERY ADDRESS DRAWER (From "Change" button)
          ============================================================ */}
      {isAddressSheetOpen && (
        <div
          className={styles.sheetBackdrop}
          onClick={() => {
            setIsAddressSheetOpen(false);
            setIsAddingAddress(false);
          }}
        >
          <div className={styles.sheetContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dragHandle} />

            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Select delivery address</h3>
              <button
                type="button"
                className={styles.sheetCloseBtn}
                onClick={() => {
                  setIsAddressSheetOpen(false);
                  setIsAddingAddress(false);
                }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {!isAddingAddress ? (
              <button
                type="button"
                className={styles.addNewAddressBtn}
                onClick={() => setIsAddingAddress(true)}
              >
                <div className={styles.addNewLeft}>
                  <span className={styles.addNewPlus}>+</span>
                  <span className={styles.addNewText}>Add New</span>
                </div>
                <span className={styles.addNewArrow}>›</span>
              </button>
            ) : (
              <form onSubmit={handleSaveNewAddress} className={styles.addAddressForm}>
                <div className={styles.formTopBar}>
                  <span className={styles.formHeading}>Add New Delivery Address</span>
                  <button
                    type="button"
                    className={styles.formCancelBtn}
                    onClick={() => setIsAddingAddress(false)}
                  >
                    Cancel
                  </button>
                </div>

                <div className={styles.formInputsList}>
                  <input
                    type="text"
                    placeholder="Full Recipient Name *"
                    required
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className={styles.formTextInput}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className={styles.formTextInput}
                  />
                  <input
                    type="text"
                    placeholder="House / Flat / Street Address *"
                    required
                    value={newAddress.line1}
                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                    className={styles.formTextInput}
                  />
                  <input
                    type="text"
                    placeholder="City, State & Pincode *"
                    required
                    value={newAddress.line2}
                    onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                    className={styles.formTextInput}
                  />

                  <div className={styles.tagSelectorRow}>
                    {[
                      {
                        tag: 'Home',
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ),
                      },
                      {
                        tag: 'Office',
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                            <path d="M9 22v-4h6v4" />
                            <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                          </svg>
                        ),
                      },
                      {
                        tag: 'Other',
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>
                        ),
                      },
                    ].map(({ tag, icon }) => (
                      <button
                        key={tag}
                        type="button"
                        className={`${styles.tagPill} ${newAddress.type === tag ? styles.tagPillActive : ''}`}
                        onClick={() => setNewAddress({ ...newAddress, type: tag })}
                      >
                        <span className={styles.tagIcon}>{icon}</span>
                        <span>{tag}</span>
                      </button>
                    ))}
                  </div>

                  <button type="submit" className={styles.saveAddressBtn}>
                    SAVE & SELECT ADDRESS
                  </button>
                </div>
              </form>
            )}

            <div className={styles.savedAddressesHeader}>
              <span>Saved addresses</span>
            </div>

            <div className={styles.addressCardsList}>
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;

                return (
                  <div
                    key={addr.id}
                    className={`${styles.addressCard} ${isSelected ? styles.addressCardSelected : ''}`}
                    onClick={() => {
                      setSelectedAddressId(addr.id);
                      setIsAddressSheetOpen(false);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.addressIconSquare}>
                      {addr.type === 'Office' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                          <path d="M9 22v-4h6v4" />
                          <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      )}
                    </div>

                    <div className={styles.addressMetaCol}>
                      <div className={styles.addressNameRow}>
                        <span className={styles.addressRecipient}>{addr.name}</span>
                        {isSelected && (
                          <span className={styles.selectedBadge}>Selected</span>
                        )}
                      </div>
                      <p className={styles.addressLine}>{addr.line1}</p>
                      <p className={styles.addressLine}>{addr.line2}</p>
                      <p className={styles.addressPhone}>{addr.phone}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
