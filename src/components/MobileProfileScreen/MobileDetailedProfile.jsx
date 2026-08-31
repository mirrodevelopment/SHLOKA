import { useState } from 'react';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import styles from './MobileDetailedProfile.module.css';

export default function MobileDetailedProfile({
  onBack,
  patronName = 'Mythili',
  patronEmail = 'mythili18@gmail.com',
  initialAvatar = null,
  onUpdateProfile,
  onUpdatePatron,
  onOpenAddressBook,
  onOpenRewards,
}) {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('shloka_detailed_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (initialAvatar && !parsed.avatarImg) {
          parsed.avatarImg = initialAvatar;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      fullName: patronName,
      email: patronEmail,
      phone: '+91 98765 43210',
      password: '••••••••',
      dob: '12 May 1998',
      gender: 'Female',
      language: 'English',
      avatarImg: initialAvatar || null,
    };
  });

  const [editingField, setEditingField] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleFieldChange = (field, val) => {
    setProfileData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatar = event.target.result;
        const updated = { ...profileData, avatarImg: newAvatar };
        setProfileData(updated);
        try {
          localStorage.setItem('shloka_detailed_profile', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('shloka_profile_updated', { detail: updated }));
        } catch (err) {
          console.error('Error saving updated avatar:', err);
        }
        if (onUpdateProfile) {
          onUpdateProfile(updated);
        }
        setIsSavedRecently(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        setTimeout(() => setIsSavedRecently(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setEditingField(null);
    try {
      localStorage.setItem('shloka_detailed_profile', JSON.stringify(profileData));
      window.dispatchEvent(new CustomEvent('shloka_profile_updated', { detail: profileData }));
      if (onUpdateProfile) {
        onUpdateProfile(profileData);
      }
      if (onUpdatePatron) {
        onUpdatePatron(profileData);
      }
    } catch (err) {
      console.error(err);
    }

    setIsSavedRecently(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  return (
    <div className={styles.screen} role="region" aria-label="Detailed Patron Profile">
      {/* ── 1. Top Header ── */}
      <header className={styles.topHeader}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Back to overview"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B1C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <h1 className={styles.headerTitle}>MY PROFILE</h1>

        <div className={styles.headerBrand}>
          <BloomingLotusIcon width={16} height={12} stroke="#A07F3A" />
          <span className={styles.headerBrandText}>SHLOKA</span>
        </div>
      </header>

      {/* ── Scrollable Body ── */}
      <div className={styles.scrollBody}>
        {/* ── 2. Patron Hero Profile Card ── */}
        <section className={styles.heroSection}>
          <div className={styles.avatarWrapper}>
            <label htmlFor="detailed-avatar-input" className={styles.avatarCircle} style={{ cursor: 'pointer' }}>
              {profileData.avatarImg ? (
                <img src={profileData.avatarImg} alt="Patron" className={styles.avatarImg} />
              ) : (
                <BloomingLotusIcon width={46} height={32} stroke="#A07F3A" />
              )}
            </label>

            {/* Camera Upload Badge */}
            <label htmlFor="detailed-avatar-input" className={styles.cameraBadge} title="Change photo">
              <input
                id="detailed-avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </label>
          </div>

          <div className={styles.patronMetaCol}>
            <h2 className={styles.patronName}>{profileData.fullName}</h2>
            <p className={styles.patronEmail}>{profileData.email}</p>

            <button
              type="button"
              className={styles.rewardsPill}
              onClick={onOpenRewards}
            >
              <BloomingLotusIcon width={14} height={10} stroke="#A07F3A" />
              <span>SHLOKA REWARDS</span>
            </button>
          </div>

          <div
            className={styles.pointsCol}
            onClick={onOpenRewards}
            role="button"
            tabIndex={0}
          >
            <span className={styles.pointsNumber}>1,250</span>
            <span className={styles.pointsLabel}>POINTS</span>
            <span className={styles.pointsChevron}>›</span>
          </div>
        </section>

        {/* ── 3. Section: Personal Information ── */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionTitle}>PERSONAL INFORMATION</span>
            <div className={styles.sectionLine} />
            <BloomingLotusIcon width={18} height={13} stroke="#A07F3A" />
          </div>

          <div className={styles.fieldsList}>
            {/* Full Name */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Full Name</span>
                {editingField === 'fullName' ? (
                  <input
                    type="text"
                    className={styles.fieldInput}
                    value={profileData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    autoFocus
                    onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <span className={styles.fieldValue}>{profileData.fullName}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'fullName' ? null : 'fullName')}
                aria-label="Edit Full Name"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>

            {/* Email Address */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Email Address</span>
                {editingField === 'email' ? (
                  <input
                    type="email"
                    className={styles.fieldInput}
                    value={profileData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    autoFocus
                    onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <span className={styles.fieldValue}>{profileData.email}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'email' ? null : 'email')}
                aria-label="Edit Email Address"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>

            {/* Phone Number */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Phone Number</span>
                {editingField === 'phone' ? (
                  <input
                    type="tel"
                    className={styles.fieldInput}
                    value={profileData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    autoFocus
                    onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <span className={styles.fieldValue}>{profileData.phone}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'phone' ? null : 'phone')}
                aria-label="Edit Phone Number"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>

            {/* Password */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Password</span>
                {editingField === 'password' ? (
                  <input
                    type="password"
                    className={styles.fieldInput}
                    placeholder="Enter new password"
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                    autoFocus
                    onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <span className={styles.fieldValue}>••••••••</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'password' ? null : 'password')}
                aria-label="Edit Password"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>

            {/* Date of Birth */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Date of Birth</span>
                {editingField === 'dob' ? (
                  <input
                    type="text"
                    className={styles.fieldInput}
                    value={profileData.dob}
                    placeholder="e.g. 12 May 1998"
                    onChange={(e) => handleFieldChange('dob', e.target.value)}
                    autoFocus
                    onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <span className={styles.fieldValue}>{profileData.dob}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'dob' ? null : 'dob')}
                aria-label="Edit Date of Birth"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>

            {/* Gender */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Gender</span>
                {editingField === 'gender' ? (
                  <select
                    className={styles.fieldSelect}
                    value={profileData.gender}
                    onChange={(e) => {
                      handleFieldChange('gender', e.target.value);
                      setEditingField(null);
                    }}
                    autoFocus
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <span className={styles.fieldValue}>{profileData.gender}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'gender' ? null : 'gender')}
                aria-label="Edit Gender"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── 4. Section: Preferences ── */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionTitle}>PREFERENCES</span>
            <div className={styles.sectionLine} />
            <BloomingLotusIcon width={18} height={13} stroke="#A07F3A" />
          </div>

          <div className={styles.fieldsList}>
            {/* Preferred Language */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Preferred Language</span>
                {editingField === 'language' ? (
                  <select
                    className={styles.fieldSelect}
                    value={profileData.language}
                    onChange={(e) => {
                      handleFieldChange('language', e.target.value);
                      setEditingField(null);
                    }}
                    autoFocus
                  >
                    <option value="English">English</option>
                    <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
                    <option value="हिंदी (Hindi)">हिंदी (Hindi)</option>
                    <option value="తెలుగు (Telugu)">తెలుగు (Telugu)</option>
                  </select>
                ) : (
                  <span className={styles.fieldValue}>{profileData.language}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => setEditingField(editingField === 'language' ? null : 'language')}
                aria-label="Edit Preferred Language"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. Section: Address Book ── */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionTitle}>ADDRESS BOOK</span>
            <div className={styles.sectionLine} />
            <BloomingLotusIcon width={18} height={13} stroke="#A07F3A" />
          </div>

          <div
            className={styles.addressManageCard}
            onClick={onOpenAddressBook}
            role="button"
            tabIndex={0}
          >
            <div className={styles.addressIconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A07F3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <div className={styles.addressMetaCol}>
              <h4 className={styles.addressManageTitle}>Manage Addresses</h4>
              <p className={styles.addressManageDesc}>View, add or edit your addresses</p>
            </div>

            <span className={styles.addressManageChevron}>›</span>
          </div>
        </section>

        {/* ── 6. Sticky Save Changes Button ── */}
        <div className={styles.saveBtnContainer}>
          <button
            type="button"
            className={`${styles.saveChangesBtn} ${isSavedRecently ? styles.saveChangesBtnSuccess : ''}`}
            onClick={handleSaveChanges}
          >
            <BloomingLotusIcon width={18} height={13} stroke="#FFFFFF" />
            <span>{isSavedRecently ? 'CHANGES SAVED ✓' : 'SAVE CHANGES'}</span>
          </button>
        </div>
      </div>

      {/* ── Toast Notification ── */}
      {showToast && (
        <div className={styles.toast}>
          <BloomingLotusIcon width={16} height={12} stroke="#A07F3A" />
          <span>Profile changes saved with royal grace</span>
        </div>
      )}
    </div>
  );
}
