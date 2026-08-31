// ============================================================
// SHLOKA — "THE HOUSE" Boutique Section (Faithful to Architectural Design)
// ============================================================

import { forwardRef, useEffect, useRef, useState } from 'react';
import store1Img from '../../assets/store1.png';
import store2Img from '../../assets/store2.png';
import store3Img from '../../assets/store3.png';
import store4Img from '../../assets/store4.png';
import store5Img from '../../assets/store5.png';
import houseRightLeaf from '../../assets/house-right-leaf.png';
import visitShlokaTextImg from '../../assets/VisitShloka-text-image.png';
import sec3TextImg from '../../assets/sec-3-text-img.png';
import viewDetailsBtnImg from '../../assets/view-details-btn.png';
import viewDetailsBtnHoverImg from '../../assets/view-details-btn2.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import styles from './BoutiqueSection.module.css';

const HOUSES = [
  {
    id: 'coimbatore',
    city: 'COIMBATORE',
    houseName: 'THE SHLOKA HOUSE',
    hours: '11:00 AM – 8:00 PM',
    addressLines: [
      'No. 23, Race Course Road,',
      'Coimbatore – 641018',
      'Tamil Nadu, India',
    ],
    phone: '+91 422 222 1888',
    email: 'coimbatore@shloka.com',
    image: store1Img,
    alt: 'Shloka Coimbatore House — Traditional Carved Haveli Archway',
  },
  {
    id: 'chennai',
    city: 'CHENNAI',
    houseName: 'THE SHLOKA HOUSE',
    hours: '10:30 AM – 8:30 PM',
    addressLines: [
      '28 Khader Nawaz Khan Road,',
      'Nungambakkam, Chennai – 600006',
      'Tamil Nadu, India',
    ],
    phone: '+91 44 2833 4455',
    email: 'chennai@shloka.com',
    image: store2Img,
    alt: 'Shloka Chennai House — Dravidian Stone Archway Entrance',
  },
  {
    id: 'bengaluru',
    city: 'BENGALURU',
    houseName: 'THE SHLOKA HOUSE',
    hours: '11:00 AM – 9:00 PM',
    addressLines: [
      '84 Lavelle Road, Shanthala Nagar,',
      'Bengaluru – 560001',
      'Karnataka, India',
    ],
    phone: '+91 80 4112 3456',
    email: 'bengaluru@shloka.com',
    image: store3Img,
    alt: 'Shloka Bengaluru House — Classical Temple Courtyard Archway',
  },
  {
    id: 'hyderabad',
    city: 'HYDERABAD',
    houseName: 'THE SHLOKA HOUSE',
    hours: '11:00 AM – 8:30 PM',
    addressLines: [
      'Road No. 10, Banjara Hills,',
      'Hyderabad – 500034',
      'Telangana, India',
    ],
    phone: '+91 40 2335 7890',
    email: 'hyderabad@shloka.com',
    image: store4Img,
    alt: 'Shloka Hyderabad House — Royal Deccan Palace Archway',
  },
  {
    id: 'mumbai',
    city: 'MUMBAI',
    houseName: 'THE SHLOKA HOUSE',
    hours: '11:00 AM – 9:00 PM',
    addressLines: [
      'Kala Ghoda, Fort,',
      'Mumbai – 400001',
      'Maharashtra, India',
    ],
    phone: '+91 22 2288 9900',
    email: 'mumbai@shloka.com',
    image: store5Img,
    alt: 'Shloka Mumbai House — Heritage Art District Grand Archway',
  },
];

const BoutiqueSection = forwardRef(function BoutiqueSection(props, ref) {
  const sectionRef = useRef(null);
  const [activeCityId, setActiveCityId] = useState('coimbatore');
  const [selectedModalHouse, setSelectedModalHouse] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const activeHouse = HOUSES.find((h) => h.id === activeCityId) || HOUSES[0];


  // Keyboard accessibility for modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && selectedModalHouse) {
        setSelectedModalHouse(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    if (selectedModalHouse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModalHouse]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedModalHouse(null);
      setAppointmentName('');
      setAppointmentDate('');
      setAppointmentTime('');
    }, 2400);
  };

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="boutiques"
      aria-label="Visit Shloka — The House"
    >
      {/* ── Botanical Tree Foliage on Right Margin ── */}
      <img
        src={houseRightLeaf}
        alt=""
        className={styles.houseRightLeafImg}
        aria-hidden="true"
        loading="lazy"
      />

      {/* ── Main Section Container ── */}
      <div className={styles.contentContainer}>
        {/* ── Section Header ── */}
        <header className={styles.header}>
          {/* Visit Shloka Calligraphy Artwork Banner Image */}
          <div className={styles.visitShlokaArtwork} data-house-text>
            <img src={visitShlokaTextImg} alt="Visit Shloka" className={styles.visitShlokaArtworkImg} />
          </div>

          <div className={styles.headerLotus} aria-hidden="true" data-house-text>
            <BloomingLotusIcon width={24} height={18} stroke="#A07F3A" />
          </div>

          <span className={styles.eyebrow} data-house-text>VISIT SHLOKA</span>

          <h2 className={styles.title} data-house-text>
            T H E&nbsp;&nbsp;&nbsp;H O U S E
          </h2>

          <div className={styles.diamondDivider} aria-hidden="true" data-house-text>
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>
        </header>

        {/* ── Main Showcase Area (Left Image + Center Needle Divider + Right Details) ── */}
        <div className={styles.showcaseGrid}>
          {/* Left: Architectural Archway Artwork */}
          <div className={styles.archVisualContainer}>
            {/* Central Architectural Store Entrance */}
            <div className={styles.storeArchFrame}>
              <img
                src={sec3TextImg}
                alt="Shloka Haveli Architectural Boutique Entrance"
                className={styles.storeArchImage}
                loading="eager"
              />
            </div>
          </div>

          {/* Center: Delicate Vertical Needle Divider */}
          <div className={styles.verticalNeedleDivider} aria-hidden="true">
            <span className={styles.needleFinialTop} />
            <span className={styles.needleLine} />
            <span className={styles.needleFinialMid} />
            <span className={styles.needleLine} />
            <span className={styles.needleFinialBottom} />
          </div>

          {/* Right: Boutique Information Card */}
          <article className={styles.houseDetailsCard} key={`details-${activeHouse.id}`}>
            <div className={styles.cardTopLotus} aria-hidden="true">
              <BloomingLotusIcon width={22} height={16} stroke="#A07F3A" />
            </div>

            <h3 className={styles.houseCityHeading}>{activeHouse.city}</h3>
            <p className={styles.houseSubLabel}>{activeHouse.houseName}</p>

            <div className={styles.cardDiamondDivider} aria-hidden="true">
              <span className={styles.cardDivLine} />
              <span className={styles.cardDivDot} />
              <span className={styles.cardDivLine} />
            </div>

            <p className={styles.houseHours}>{activeHouse.hours}</p>

            <address className={styles.houseAddress}>
              {activeHouse.addressLines.map((line, idx) => (
                <span key={idx} className={styles.addressLine}>
                  {line}
                </span>
              ))}
            </address>

            <button
              type="button"
              className={styles.viewDetailsImgBtn}
              onClick={() => setSelectedModalHouse(activeHouse)}
              aria-label={`View Details for Shloka ${activeHouse.city} House`}
            >
              <img
                src={viewDetailsBtnImg}
                alt="View Details"
                className={styles.viewDetailsBtnDefault}
              />
              <img
                src={viewDetailsBtnHoverImg}
                alt="View Details"
                className={styles.viewDetailsBtnHover}
                aria-hidden="true"
              />
            </button>
          </article>
        </div>

        {/* ── Bottom Garland ── */}
        <footer className={styles.bottomFooter}>
          {/* Sweeping Bottom Golden Rope SVG with Center Lotus and Right Tassel */}
          <div className={styles.bottomRopeContainer} aria-hidden="true">
            <svg className={styles.bottomRopeSvg} viewBox="0 0 1200 60" fill="none" preserveAspectRatio="none">
              <path
                d="M 10 30 Q 300 55 600 50 Q 900 45 1160 20"
                stroke="#D4B67A"
                strokeWidth="1.4"
                strokeDasharray="5 5"
                opacity="0.85"
              />
            </svg>

            {/* Centered Lotus on bottom rope */}
            <div className={styles.bottomRopeLotus}>
              <BloomingLotusIcon width={24} height={18} stroke="#8A1528" />
            </div>

            {/* Hanging Tassel at Right End */}
            <div className={styles.bottomRightTassel}>
              <div className={styles.tasselCord} />
              <div className={styles.tasselKnot} />
              <div className={styles.tasselFringe} />
            </div>
          </div>
        </footer>
      </div>

      {/* ── Luxury Boutique Appointment & Details Modal ── */}
      {selectedModalHouse && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedModalHouse(null);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Shloka ${selectedModalHouse.city} Boutique Private Viewing`}
        >
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedModalHouse(null)}
              aria-label="Close Boutique Details"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className={styles.modalSuccessState}>
                <div className={styles.modalSuccessLotus}>
                  <BloomingLotusIcon width={36} height={26} stroke="#8A1528" />
                </div>
                <h4 className={styles.modalSuccessTitle}>Appointment Requested</h4>
                <p className={styles.modalSuccessText}>
                  Thank you, <strong>{appointmentName || 'Valued Patron'}</strong>. Our master draper
                  at the <strong>{selectedModalHouse.city} House</strong> will contact you to confirm
                  your private couture viewing on <strong>{appointmentDate || 'your selected date'}</strong>.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalLotus}>
                    <BloomingLotusIcon width={24} height={18} stroke="#A07F3A" />
                  </div>
                  <span className={styles.modalEyebrow}>VISIT SHLOKA</span>
                  <h3 className={styles.modalTitle}>{selectedModalHouse.city} HOUSE</h3>
                  <p className={styles.modalSubtitle}>{selectedModalHouse.houseName}</p>
                </div>

                <div className={styles.modalBody}>
                  {/* Address & Timings */}
                  <div className={styles.modalInfoSection}>
                    <div className={styles.modalInfoBlock}>
                      <span className={styles.modalInfoLabel}>ADDRESS</span>
                      <p className={styles.modalInfoVal}>
                        {selectedModalHouse.addressLines.join(' ')}
                      </p>
                    </div>

                    <div className={styles.modalInfoBlock}>
                      <span className={styles.modalInfoLabel}>TIMINGS</span>
                      <p className={styles.modalInfoVal}>{selectedModalHouse.hours}</p>
                    </div>

                    <div className={styles.modalInfoBlock}>
                      <span className={styles.modalInfoLabel}>DIRECT CONCIERGE</span>
                      <p className={styles.modalInfoVal}>
                        <a href={`tel:${selectedModalHouse.phone}`} className={styles.modalPhoneLink}>
                          {selectedModalHouse.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Private Viewing Form */}
                  <form onSubmit={handleBookingSubmit} className={styles.appointmentForm}>
                    <h5 className={styles.formHeading}>BOOK PRIVATE COUTURE VIEWING</h5>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>PATRON FULL NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={appointmentName}
                        onChange={(e) => setAppointmentName(e.target.value)}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PREFERRED DATE</label>
                        <input
                          type="date"
                          required
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className={styles.formInput}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>TIME SLOT</label>
                        <select
                          required
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          className={styles.formInput}
                        >
                          <option value="">Select slot</option>
                          <option value="11:30 AM">11:30 AM — Morning</option>
                          <option value="03:00 PM">03:00 PM — Afternoon</option>
                          <option value="05:30 PM">05:30 PM — Evening</option>
                          <option value="07:00 PM">07:00 PM — Twilight</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className={styles.formSubmitBtn}>
                      CONFIRM ATELIER VIEWING
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
});

export default BoutiqueSection;
