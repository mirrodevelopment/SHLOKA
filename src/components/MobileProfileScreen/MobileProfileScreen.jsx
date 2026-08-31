import { useState, useEffect } from 'react';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import shlokaLogoTypo from '../../assets/Shloka-Logo-Typo.png';
import padmaBlouseImg from '../../assets/padma-blouse.jpg';
import logoutBtnImg from '../../assets/Logout-btn.png';
import viewProfileBtnImg from '../../assets/View-profile-btn.png';
import MobileDetailedProfile from './MobileDetailedProfile';
import styles from './MobileProfileScreen.module.css';

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
const PAYMENT_STORAGE_KEY = 'shloka_saved_payments';

const DEFAULT_PAYMENTS = [
  {
    id: 'pay-1',
    type: 'card',
    bank: 'HDFC Regalia Gold Credit Card',
    number: '•••• •••• •••• 4291',
    holder: 'Mythili R.',
    expiry: '08/28',
    isPrimary: true,
  },
  {
    id: 'pay-2',
    type: 'card',
    bank: 'ICICI Sapphiro Luxury Card',
    number: '•••• •••• •••• 7183',
    holder: 'Mythili R.',
    expiry: '11/29',
    isPrimary: false,
  },
  {
    id: 'pay-3',
    type: 'upi',
    bank: 'Google Pay UPI',
    number: 'mythili@okhdfcbank',
    holder: 'Mythili R.',
    expiry: '',
    isPrimary: false,
  },
];

export default function MobileProfileScreen({ onBack, onOpenAuth, onSelectTab, currentPatron }) {
  const [expandedId, setExpandedId] = useState(null);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Detailed My Profile Full Screen Modal State
  const [isDetailedProfileOpen, setIsDetailedProfileOpen] = useState(false);

  // Payment Methods State
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [activePaymentMenuId, setActivePaymentMenuId] = useState(null);
  const [payments, setPayments] = useState(() => {
    try {
      const raw = localStorage.getItem(PAYMENT_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return DEFAULT_PAYMENTS;
  });

  const [newPayment, setNewPayment] = useState({
    type: 'card',
    bank: '',
    number: '',
    holder: 'Mythili R.',
    expiry: '',
  });

  // Settings Drawers States
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [cookiePrefs, setCookiePrefs] = useState({
    essential: true,
    analytics: true,
    personalization: true,
  });

  useEffect(() => {
    try {
      localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(payments));
    } catch (err) {
      console.error(err);
    }
  }, [payments]);

  // Addresses State with LocalStorage persistence
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

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    type: 'Home',
  });

  // Save to localStorage
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

  // Detailed My Profile Data State (syncs avatar, name, and email with MobileDetailedProfile)
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('shloka_detailed_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      fullName: currentPatron?.fullName || 'Mythili',
      email: currentPatron?.email || 'mythili18@gmail.com',
      avatarImg: currentPatron?.avatarImg || null,
    };
  });

  const patronName = profileData.fullName || currentPatron?.fullName || 'Mythili';
  const patronEmail = profileData.email || currentPatron?.email || 'mythili18@gmail.com';
  const patronAvatar = profileData.avatarImg || currentPatron?.avatarImg || null;

  // Real-time synchronization when profile picture or data updates
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e?.detail) {
        setProfileData(e.detail);
      } else {
        try {
          const saved = localStorage.getItem('shloka_detailed_profile');
          if (saved) {
            setProfileData(JSON.parse(saved));
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('shloka_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);
    return () => {
      window.removeEventListener('shloka_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
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

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      const remaining = addresses.filter((a) => a.id !== id);
      if (remaining.length > 0) setSelectedAddressId(remaining[0].id);
    }
    setActiveMenuId(null);
  };

  const handleSaveNewPayment = (e) => {
    e.preventDefault();
    if (!newPayment.number) return;

    const isCard = newPayment.type === 'card';
    const cleanNum = newPayment.number.replace(/\s+/g, '');
    const last4 = isCard ? cleanNum.slice(-4) : '';
    const masked = isCard ? `•••• •••• •••• ${last4 || '1234'}` : newPayment.number;

    const created = {
      id: `pay-${Date.now()}`,
      type: newPayment.type || 'card',
      bank: newPayment.bank || (isCard ? 'Royal Credit Card' : 'UPI Account'),
      number: masked,
      holder: newPayment.holder || patronName,
      expiry: newPayment.expiry || (isCard ? '12/28' : ''),
      isPrimary: payments.length === 0,
    };

    setPayments((prev) => [created, ...prev]);
    setIsAddingPayment(false);
    setNewPayment({
      type: 'card',
      bank: '',
      number: '',
      holder: patronName,
      expiry: '',
    });
  };

  const handleSetPrimaryPayment = (id) => {
    setPayments((prev) =>
      prev.map((p) => ({
        ...p,
        isPrimary: p.id === id,
      }))
    );
    setActivePaymentMenuId(null);
  };

  const handleDeletePayment = (id) => {
    setPayments((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (filtered.length > 0 && !filtered.some((p) => p.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
    setActivePaymentMenuId(null);
  };

  const menuItems = [
    {
      id: 'address',
      label: 'ADDRESS BOOK',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
      action: () => setIsAddressSheetOpen(true),
    },
    {
      id: 'payment',
      label: 'PAYMENT METHODS',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
      action: () => setIsPaymentSheetOpen(true),
    },
    {
      id: 'wishlist',
      label: 'WISHLIST',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      navigate: () => onSelectTab?.('wishlist'),
    },
    {
      id: 'rewards',
      label: 'SHLOKA REWARDS',
      icon: <BloomingLotusIcon width={18} height={13} stroke="#A07F3A" />,
      dropdown: (
        <div className={styles.dropdownContent}>
          <p className={styles.dropItemTitle}>Tier: Classic Member</p>
          <p className={styles.dropItemDesc}>You have 1,250 points available. Redeem ₹1,250 on your next bespoke saree purchase.</p>
        </div>
      ),
    },
    {
      id: 'help',
      label: 'HELP & SUPPORT',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
      dropdown: (
        <div className={styles.dropdownContent}>
          <p className={styles.dropItemTitle}>Heritage Concierge</p>
          <p className={styles.dropItemDesc}>Our silk curators are available daily from 10 AM to 8 PM IST.</p>
          <a href="tel:+919876543210" className={styles.conciergeCallBtn}>
            CALL CURATOR: +91 422 222 3456
          </a>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      dropdown: (
        <div className={styles.settingsCardsContainer}>
          {/* Card 1: Cookies (Matches Reference Image 2) */}
          <div
            className={styles.settingsCard}
            onClick={() => setIsCookieModalOpen(true)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.settingsMedallion}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4B67A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M7.5 14.5v.01" />
                <path d="M12 16.5v.01" />
                <path d="M15.5 12.5v.01" />
              </svg>
            </div>

            <div className={styles.settingsCardTextCol}>
              <h4 className={styles.settingsCardTitle}>Cookies</h4>
              <p className={styles.settingsCardDesc}>Manage your cookie preferences and data settings.</p>
            </div>

            <span className={styles.settingsCardChevron}>›</span>
          </div>

          {/* Card 2: Languages (Matches Reference Image 2) */}
          <div
            className={styles.settingsCard}
            onClick={() => setIsLanguageModalOpen(true)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.settingsMedallion}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4B67A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <div className={styles.settingsCardTextCol}>
              <h4 className={styles.settingsCardTitle}>Languages</h4>
              <p className={styles.settingsCardDesc}>Choose your preferred language for the experience.</p>
            </div>

            <span className={styles.settingsCardChevron}>›</span>
          </div>
        </div>
      ),
    },
  ];

  const handleLogout = () => {
    if (currentPatron) {
      localStorage.removeItem('shloka_active_patron');
      window.location.reload();
    } else {
      onOpenAuth?.();
    }
  };

  return (
    <div className={styles.screen} role="region" aria-label="Patron Profile">
      {/* ── 1. Profile Header: Back Arrow | Shloka Logo | Notification Bell ── */}
      <header className={styles.topHeader}>
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

        <div className={styles.headerLogoWrap}>
          <img src={shlokaLogoTypo} alt="Shloka" className={styles.headerLogoImg} />
        </div>

        <button
          type="button"
          className={styles.bellBtn}
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#26201B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.notificationDot} aria-hidden="true" />
        </button>
      </header>

      {/* ── Scrollable Body Content ── */}
      <div className={styles.content}>
        {/* ── 2. User Profile Card ── */}
        <section className={styles.profileHeroSection}>
          <div className={styles.profileHeroLeft}>
            <div
              className={styles.avatarCircle}
              onClick={() => setIsDetailedProfileOpen(true)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="View Detailed Profile"
            >
              {patronAvatar ? (
                <img
                  src={patronAvatar}
                  alt={patronName}
                  className={styles.avatarImg}
                />
              ) : (
                <BloomingLotusIcon width={40} height={26} stroke="#A07F3A" />
              )}
            </div>

            <div className={styles.profileDetailsCol}>
              <h2 className={styles.patronName}>{patronName}</h2>
              <p className={styles.patronEmail}>{patronEmail}</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewProfileBtn}
            onClick={() => setIsDetailedProfileOpen(true)}
            aria-label="View Full Profile"
          >
            <img
              src={viewProfileBtnImg}
              alt="View Profile"
              className={styles.viewProfileBtnImg}
            />
          </button>
        </section>

        {/* ── 3. Shloka Rewards Card ── */}
        <section className={styles.rewardsCard} role="button" tabIndex={0}>
          <div className={styles.rewardsLeft}>
            <div className={styles.rewardsLotusWrap}>
              <BloomingLotusIcon width={24} height={17} stroke="#A07F3A" />
            </div>
            <div className={styles.rewardsTextCol}>
              <span className={styles.rewardsTitle}>SHLOKA REWARDS</span>
              <span className={styles.rewardsMemberType}>Classic Member</span>
              <span className={styles.rewardsSubtitle}>Earn points with every purchase</span>
            </div>
          </div>

          <div className={styles.rewardsRight}>
            <div className={styles.pointsCol}>
              <span className={styles.pointsNumber}>1,250</span>
              <span className={styles.pointsLabel}>POINTS</span>
            </div>
            <span className={styles.chevronArrow}>›</span>
          </div>
        </section>

        {/* ── 4. "MY ORDERS" Section ── */}
        <section className={styles.ordersSection}>
          <div className={styles.ordersHeaderRow}>
            <span className={styles.ordersSectionTitle}>M Y &nbsp; O R D E R S</span>
            <button type="button" className={styles.viewAllOrdersBtn}>
              VIEW ALL ORDERS &nbsp; →
            </button>
          </div>

          <div className={styles.orderCard} role="button" tabIndex={0}>
            <img src={padmaBlouseImg} alt="Ordered saree" className={styles.orderThumbImg} />

            <div className={styles.orderMetaCol}>
              <h4 className={styles.orderNumber}>Order #SLOKA1256</h4>
              <p className={styles.orderDate}>Placed on 12 May 2024</p>
              <div className={styles.deliveryStatusRow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span className={styles.statusText}>Delivered on 16 May 2024</span>
              </div>
              <div className={styles.viewDetailsRow}>
                <span className={styles.viewDetailsLink}>View Details</span>
                <span className={styles.viewDetailsArrow}>→</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Navigation Menu List ── */}
        <nav className={styles.menuNav} aria-label="Account navigation">
          {menuItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className={styles.menuAccordion}>
                <button
                  type="button"
                  className={`${styles.menuRow} ${isExpanded ? styles.menuRowActive : ''}`}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.navigate) {
                      item.navigate();
                    } else {
                      toggleAccordion(item.id);
                    }
                  }}
                >
                  <span className={styles.menuRowIcon}>{item.icon}</span>
                  <span className={styles.menuRowLabel}>{item.label}</span>
                  {item.dropdown ? (
                    <span className={`${styles.menuRowChevron} ${isExpanded ? styles.chevronRotated : ''}`}>›</span>
                  ) : (
                    <span className={styles.menuRowChevron}>›</span>
                  )}
                </button>

                {/* Inline Accordion Dropdown (for Payment, Rewards, Help, Settings) */}
                {item.dropdown && (
                  <div className={`${styles.accordionPanel} ${isExpanded ? styles.accordionPanelOpen : ''}`}>
                    <div className={styles.accordionInner}>
                      {item.dropdown}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── 6. Log Out Button ── */}
        <div className={styles.logoutRow}>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="Log Out"
          >
            <img
              src={logoutBtnImg}
              alt="Log Out"
              className={styles.logoutBtnImg}
            />
          </button>
        </div>
      </div>

      {/* ── 7. Luxury Delivery Address Book Bottom Sheet (Matches Reference Image 2) ── */}
      {isAddressSheetOpen && (
        <div
          className={styles.sheetBackdrop}
          onClick={() => {
            setIsAddressSheetOpen(false);
            setIsAddingAddress(false);
            setActiveMenuId(null);
          }}
        >
          <div className={styles.sheetContainer} onClick={(e) => e.stopPropagation()}>
            {/* Drag Pill Handle */}
            <div className={styles.dragHandle} />

            {/* Header: Title + Close Button */}
            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Select delivery address</h3>
              <button
                type="button"
                className={styles.sheetCloseBtn}
                onClick={() => {
                  setIsAddressSheetOpen(false);
                  setIsAddingAddress(false);
                  setActiveMenuId(null);
                }}
                aria-label="Close delivery address selector"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* "+ Add New" Button Capsule or Add Form */}
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
                    placeholder="House / Flat / Estate Street Address *"
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

            {/* Section Header: Saved addresses */}
            <div className={styles.savedAddressesHeader}>
              <span>Saved addresses</span>
            </div>

            {/* Address Cards List matching Reference Image 2 */}
            <div className={styles.addressCardsList}>
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;

                return (
                  <div
                    key={addr.id}
                    className={`${styles.addressCard} ${isSelected ? styles.addressCardSelected : ''}`}
                    onClick={() => {
                      setSelectedAddressId(addr.id);
                      setActiveMenuId(null);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Left Icon Square */}
                    <div className={styles.addressIconSquare}>
                      {addr.type === 'Office' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                          <path d="M9 22v-4h6v4" />
                          <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                        </svg>
                      ) : addr.type === 'Other' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      )}
                    </div>

                    {/* Middle Details */}
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

                    {/* Right 3-dots Menu Button */}
                    <div className={styles.addressActions}>
                      <button
                        type="button"
                        className={styles.moreOptionsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === addr.id ? null : addr.id);
                        }}
                        aria-label="Address options"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.8" />
                          <circle cx="12" cy="12" r="1.8" />
                          <circle cx="12" cy="19" r="1.8" />
                        </svg>
                      </button>

                      {activeMenuId === addr.id && (
                        <div className={styles.optionsDropdown} onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAddressId(addr.id);
                              setActiveMenuId(null);
                            }}
                            className={styles.optionItem}
                          >
                            Set as Selected
                          </button>
                          {addresses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className={`${styles.optionItem} ${styles.deleteOption}`}
                            >
                              Delete Address
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 8. Saved Payment Methods Bottom Sheet ── */}
      {isPaymentSheetOpen && (
        <div
          className={styles.sheetBackdrop}
          onClick={() => {
            setIsPaymentSheetOpen(false);
            setIsAddingPayment(false);
            setActivePaymentMenuId(null);
          }}
        >
          <div className={styles.sheetContainer} onClick={(e) => e.stopPropagation()}>
            {/* Drag Pill Handle */}
            <div className={styles.dragHandle} />

            {/* Header: Title + Close Button */}
            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Saved payment methods</h3>
              <button
                type="button"
                className={styles.sheetCloseBtn}
                onClick={() => {
                  setIsPaymentSheetOpen(false);
                  setIsAddingPayment(false);
                  setActivePaymentMenuId(null);
                }}
                aria-label="Close payment methods"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* "+ Add New" Button Capsule or Add Form */}
            {!isAddingPayment ? (
              <button
                type="button"
                className={styles.addNewAddressBtn}
                onClick={() => setIsAddingPayment(true)}
              >
                <div className={styles.addNewLeft}>
                  <span className={styles.addNewPlus}>+</span>
                  <span className={styles.addNewText}>Add New Payment Method</span>
                </div>
                <span className={styles.addNewArrow}>›</span>
              </button>
            ) : (
              <form onSubmit={handleSaveNewPayment} className={styles.addAddressForm}>
                <div className={styles.formTopBar}>
                  <span className={styles.formHeading}>Add New Payment Method</span>
                  <button
                    type="button"
                    className={styles.formCancelBtn}
                    onClick={() => setIsAddingPayment(false)}
                  >
                    Cancel
                  </button>
                </div>

                <div className={styles.formInputsList}>
                  {/* Type Selector: Card / UPI */}
                  <div className={styles.tagSelectorRow}>
                    <button
                      type="button"
                      className={`${styles.tagPill} ${newPayment.type === 'card' ? styles.tagPillActive : ''}`}
                      onClick={() => setNewPayment({ ...newPayment, type: 'card' })}
                    >
                      <span className={styles.tagIcon}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      </span>
                      <span>Credit/Debit Card</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.tagPill} ${newPayment.type === 'upi' ? styles.tagPillActive : ''}`}
                      onClick={() => setNewPayment({ ...newPayment, type: 'upi' })}
                    >
                      <span className={styles.tagIcon}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </span>
                      <span>UPI ID</span>
                    </button>
                  </div>

                  {newPayment.type === 'card' ? (
                    <>
                      <input
                        type="text"
                        placeholder="Card Label (e.g. HDFC Regalia, ICICI Sapphiro) *"
                        required
                        value={newPayment.bank}
                        onChange={(e) => setNewPayment({ ...newPayment, bank: e.target.value })}
                        className={styles.formTextInput}
                      />
                      <input
                        type="text"
                        placeholder="Card Number (16 Digits) *"
                        required
                        maxLength={19}
                        value={newPayment.number}
                        onChange={(e) => setNewPayment({ ...newPayment, number: e.target.value })}
                        className={styles.formTextInput}
                      />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Expiry (MM/YY) *"
                          required
                          maxLength={5}
                          value={newPayment.expiry}
                          onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                          className={styles.formTextInput}
                        />
                        <input
                          type="text"
                          placeholder="Cardholder Name *"
                          required
                          value={newPayment.holder}
                          onChange={(e) => setNewPayment({ ...newPayment, holder: e.target.value })}
                          className={styles.formTextInput}
                        />
                      </div>
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. mythili@okhdfcbank) *"
                      required
                      value={newPayment.number}
                      onChange={(e) => setNewPayment({ ...newPayment, number: e.target.value, bank: 'Google Pay / PhonePe' })}
                      className={styles.formTextInput}
                    />
                  )}

                  <button type="submit" className={styles.saveAddressBtn}>
                    SAVE PAYMENT METHOD
                  </button>
                </div>
              </form>
            )}

            {/* Section Header */}
            <div className={styles.savedAddressesHeader}>
              <span>Saved cards & accounts</span>
            </div>

            {/* Payment Cards List */}
            <div className={styles.addressCardsList}>
              {payments.map((p) => {
                return (
                  <div
                    key={p.id}
                    className={`${styles.addressCard} ${p.isPrimary ? styles.addressCardSelected : ''}`}
                    onClick={() => handleSetPrimaryPayment(p.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Left Icon Square */}
                    <div className={styles.addressIconSquare}>
                      {p.type === 'upi' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      )}
                    </div>

                    {/* Middle Details */}
                    <div className={styles.addressMetaCol}>
                      <div className={styles.addressNameRow}>
                        <span className={styles.addressRecipient}>{p.bank}</span>
                        {p.isPrimary && (
                          <span className={styles.selectedBadge}>Primary</span>
                        )}
                      </div>
                      <p className={styles.addressLine}>{p.number}</p>
                      <p className={styles.addressPhone}>
                        {p.expiry ? `Expires ${p.expiry} • ` : ''}{p.holder}
                      </p>
                    </div>

                    {/* Right 3-dots Menu Button */}
                    <div className={styles.addressActions}>
                      <button
                        type="button"
                        className={styles.moreOptionsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePaymentMenuId(activePaymentMenuId === p.id ? null : p.id);
                        }}
                        aria-label="Payment options"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.8" />
                          <circle cx="12" cy="12" r="1.8" />
                          <circle cx="12" cy="19" r="1.8" />
                        </svg>
                      </button>

                      {activePaymentMenuId === p.id && (
                        <div className={styles.optionsDropdown} onClick={(e) => e.stopPropagation()}>
                          {!p.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryPayment(p.id)}
                              className={styles.optionItem}
                            >
                              Set as Primary
                            </button>
                          )}
                          {payments.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeletePayment(p.id)}
                              className={`${styles.optionItem} ${styles.deleteOption}`}
                            >
                              Remove Card
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 9. Cookies Preferences Bottom Sheet Drawer ── */}
      {isCookieModalOpen && (
        <div
          className={styles.sheetBackdrop}
          onClick={() => setIsCookieModalOpen(false)}
        >
          <div className={styles.sheetContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dragHandle} />
            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Cookie & Data Settings</h3>
              <button
                type="button"
                className={styles.sheetCloseBtn}
                onClick={() => setIsCookieModalOpen(false)}
                aria-label="Close cookie settings"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className={styles.modalIntroText}>
              Shloka Atelier uses cookies and browser data to preserve your luxury bespoke saree curation, bag items, and patron credentials.
            </p>

            <div className={styles.toggleGroup}>
              {/* Essential */}
              <div className={styles.toggleRow}>
                <div className={styles.toggleTextCol}>
                  <span className={styles.toggleHeading}>Essential Atelier Cookies</span>
                  <span className={styles.toggleDesc}>Required for authentication, bag security & royal checkout.</span>
                </div>
                <span className={styles.alwaysActivePill}>Required</span>
              </div>

              {/* Analytics */}
              <div className={styles.toggleRow}>
                <div className={styles.toggleTextCol}>
                  <span className={styles.toggleHeading}>Handloom Analytics</span>
                  <span className={styles.toggleDesc}>Helps our master weavers understand which silhouettes delight patrons.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggleSwitch} ${cookiePrefs.analytics ? styles.toggleSwitchOn : ''}`}
                  onClick={() => setCookiePrefs({ ...cookiePrefs, analytics: !cookiePrefs.analytics })}
                  aria-label="Toggle Analytics"
                >
                  <span className={styles.toggleKnob} />
                </button>
              </div>

              {/* Personalization */}
              <div className={styles.toggleRow}>
                <div className={styles.toggleTextCol}>
                  <span className={styles.toggleHeading}>Personalized Curation</span>
                  <span className={styles.toggleDesc}>Remembers your heritage silk, zari preferences and bespoke recommendations.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggleSwitch} ${cookiePrefs.personalization ? styles.toggleSwitchOn : ''}`}
                  onClick={() => setCookiePrefs({ ...cookiePrefs, personalization: !cookiePrefs.personalization })}
                  aria-label="Toggle Personalization"
                >
                  <span className={styles.toggleKnob} />
                </button>
              </div>
            </div>

            <button
              type="button"
              className={styles.saveAddressBtn}
              onClick={() => setIsCookieModalOpen(false)}
            >
              SAVE PREFERENCES
            </button>
          </div>
        </div>
      )}

      {/* ── 10. Language Selector Bottom Sheet Drawer ── */}
      {isLanguageModalOpen && (
        <div
          className={styles.sheetBackdrop}
          onClick={() => setIsLanguageModalOpen(false)}
        >
          <div className={styles.sheetContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dragHandle} />
            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Choose Language</h3>
              <button
                type="button"
                className={styles.sheetCloseBtn}
                onClick={() => setIsLanguageModalOpen(false)}
                aria-label="Close language selector"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#221C16" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className={styles.modalIntroText}>
              Select your preferred language for exploring Shloka's royal collections, heritage archives, and patron concierge.
            </p>

            <div className={styles.languageOptionsList}>
              {[
                { code: 'en', name: 'English', sub: 'International & Bespoke Concierge' },
                { code: 'ta', name: 'தமிழ் (Tamil)', sub: 'பாரம்பரிய பட்டுச் சேலைகள் • தரம் & கலை' },
                { code: 'hi', name: 'हिंदी (Hindi)', sub: 'शाही हथकरघा साड़ियां • शुद्ध कांजीवरम' },
                { code: 'te', name: 'తెలుగు (Telugu)', sub: 'రాచరిక చేనేత పట్టు చీరలు' },
              ].map((lang) => {
                const isSelected = selectedLanguage === lang.name.split(' ')[0];
                return (
                  <div
                    key={lang.code}
                    className={`${styles.languageCard} ${isSelected ? styles.languageCardSelected : ''}`}
                    onClick={() => setSelectedLanguage(lang.name.split(' ')[0])}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.languageMetaCol}>
                      <span className={styles.languageTitle}>{lang.name}</span>
                      <span className={styles.languageSub}>{lang.sub}</span>
                    </div>

                    <div className={`${styles.radioCircle} ${isSelected ? styles.radioCircleActive : ''}`}>
                      {isSelected && <div className={styles.radioDot} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.saveAddressBtn}
              onClick={() => setIsLanguageModalOpen(false)}
            >
              CONFIRM LANGUAGE
            </button>
          </div>
        </div>
      )}

      {/* ── 11. Detailed My Profile Full Screen (Matches Reference Image 2) ── */}
      {isDetailedProfileOpen && (
        <MobileDetailedProfile
          onBack={() => {
            try {
              const saved = localStorage.getItem('shloka_detailed_profile');
              if (saved) setProfileData(JSON.parse(saved));
            } catch {
              // ignore
            }
            setIsDetailedProfileOpen(false);
          }}
          patronName={patronName}
          patronEmail={patronEmail}
          initialAvatar={patronAvatar}
          onUpdateProfile={(updated) => setProfileData(updated)}
          onOpenAddressBook={() => {
            setIsDetailedProfileOpen(false);
            setIsAddressSheetOpen(true);
          }}
          onOpenRewards={() => {
            setIsDetailedProfileOpen(false);
            setExpandedId('rewards');
          }}
        />
      )}
    </div>
  );
}
