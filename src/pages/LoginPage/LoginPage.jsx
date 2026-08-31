// ============================================================
// SHLOKA — Luxury Royal Indian Heritage Authentication Modal
// Rebuilt to match the architectural haveli design in Image 2
// ============================================================

import { useState, useEffect } from 'react';
import loginImg from '../../assets/login-image.png';
import houseRightLeaf from '../../assets/house-right-leaf.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import {
  registerPatron,
  loginPatron,
  loginWithGoogle,
  logoutPatron,
  getActivePatron,
} from '../../utils/auth';
import styles from './LoginPage.module.css';

export default function LoginPage({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [currentPatron, setCurrentPatron] = useState(null);

  // Sign In Form Data
  const [signInData, setSignInData] = useState({ identifier: '', password: '' });

  // Register Form Data
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vipClub: true,
  });

  // Forgot Password Data
  const [forgotEmail, setForgotEmail] = useState('');

  // Check active session on modal open
  useEffect(() => {
    if (isOpen) {
      const active = getActivePatron();
      setCurrentPatron(active);
      setFormError('');
      setFormSuccess('');
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Freeze body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Handle Sign In ──
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = loginPatron({
        identifier: signInData.identifier,
        password: signInData.password,
      });

      if (res.success) {
        setFormSuccess('Signed in successfully.');
        setCurrentPatron(res.user);
        onLoginSuccess?.(res.user);
        setTimeout(() => {
          setFormSuccess('');
          onClose();
        }, 1100);
      } else {
        setFormError(res.error || 'Invalid email, phone, or password.');
      }
    }, 450);
  };

  // ── Handle Register / Create Account ──
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (registerData.password.length < 6) {
      setFormError('Password must contain at least 6 characters.');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = registerPatron({
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        vipClub: registerData.vipClub,
      });

      if (res.success) {
        const loginRes = loginPatron({
          identifier: registerData.email || registerData.phone,
          password: registerData.password,
        });

        setFormSuccess(`Welcome to Shloka, ${registerData.fullName}!`);
        setCurrentPatron(loginRes.user || res.user);
        onLoginSuccess?.(loginRes.user || res.user);

        setTimeout(() => {
          setFormSuccess('');
          onClose();
        }, 1200);
      } else {
        setFormError(res.error);
      }
    }, 550);
  };

  // ── Handle Google Social Sign In Simulation ──
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setFormError('');
    setTimeout(() => {
      setIsLoading(false);
      const res = loginWithGoogle({ fullName: 'Ananya Sharma', email: 'ananya.sharma@gmail.com' });
      if (res.success) {
        setCurrentPatron(res.user);
        onLoginSuccess?.(res.user);
        setFormSuccess('Signed in with Google successfully.');
        setTimeout(() => {
          setFormSuccess('');
          onClose();
        }, 1000);
      } else {
        setFormError(res.error);
      }
    }, 500);
  };

  // ── Handle Forgot Password ──
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!forgotEmail) {
      setFormError('Please enter your registered email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSuccess(`A secure reset link has been dispatched to ${forgotEmail}`);
      setTimeout(() => {
        setFormSuccess('');
        setAuthMode('signin');
      }, 2000);
    }, 600);
  };

  // ── Handle Sign Out ──
  const handleSignOut = () => {
    logoutPatron();
    setCurrentPatron(null);
    onLoginSuccess?.(null);
    setSignInData({ identifier: '', password: '' });
    setFormSuccess('You have been signed out.');
    setTimeout(() => {
      setFormSuccess('');
    }, 1200);
  };

  return (
    <div className={styles.authModalBackdrop} role="dialog" aria-modal="true" aria-label="Shloka Patron Authentication">
      <div className={styles.authModalOverlay} onClick={onClose} />

      {/* ── Main Architectural Haveli Split Card (Image 2) ── */}
      <div className={styles.authCard}>
        {/* Close Button (Top Right) */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ═══════════════════════════════════════════════════════════
            LEFT SIDE — FULL-BLEED TEMPLE & SAREE HERITAGE SCENE (55%)
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.visualPanel}>
          {/* Background Artwork */}
          <div className={styles.visualBgWrapper}>
            <img
              src={loginImg}
              alt="Shloka Royal Heritage Temple Saree Scene"
              className={styles.visualBgImage}
            />
          </div>

          {/* Top Left Woven Heritage Typography Stack */}
          <div className={styles.leftEyebrowGroup}>
            <p className={styles.leftEyebrowLine}>WOVEN</p>
            <p className={styles.leftEyebrowLine}>HERITAGE.</p>
            <p className={styles.leftEyebrowLine}>TIMELESS</p>
            <p className={styles.leftEyebrowLine}>ELEGANCE.</p>
            <div className={styles.leftLotusEmblem} aria-hidden="true">
              <BloomingLotusIcon width={24} height={18} stroke="#A07F3A" />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT SIDE — ARCHED HAVELI ROYAL LOGIN FORM PANEL (45%)
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.formPanel}>
          {/* Subtle Botanical Tree Branch Framing Background (Top & Bottom Right) */}
          <img
            src={houseRightLeaf}
            alt=""
            className={styles.bgBotanicalLeaf}
            aria-hidden="true"
          />

          {/* Form Scroll Container */}
          <div className={styles.formInnerContainer}>
            {/* Top Brand Header */}
            <div className={styles.brandHeader}>
              <div className={styles.brandLotus} aria-hidden="true">
                <BloomingLotusIcon width={28} height={20} stroke="#A07F3A" />
              </div>

              <h1 className={styles.brandTitle}>Shloka</h1>

              {/* Delicate Diamond Hairline Divider */}
              <div className={styles.brandDivider} aria-hidden="true">
                <span className={styles.bdLine} />
                <span className={styles.bdDot}>❖</span>
                <span className={styles.bdLine} />
              </div>

              <h2 className={styles.welcomeHeading}>
                {authMode === 'signin' && 'Welcome to Shloka'}
                {authMode === 'register' && 'Create Your Sanctuary Account'}
                {authMode === 'forgot' && 'Reset Your Password'}
              </h2>
              <p className={styles.welcomeSub}>
                {authMode === 'signin' && 'Continue your journey through timeless weaves.'}
                {authMode === 'register' && 'Begin your journey through handcrafted royal silks.'}
                {authMode === 'forgot' && 'Enter your email to receive recovery instructions.'}
              </p>
            </div>

            {/* Feedback Notifications */}
            {formSuccess && (
              <div className={styles.feedbackSuccess} role="status">
                <span>✦ {formSuccess}</span>
              </div>
            )}
            {formError && (
              <div className={styles.feedbackError} role="alert">
                <span>⚠ {formError}</span>
              </div>
            )}

            {/* If Patron is Signed In */}
            {currentPatron ? (
              <div className={styles.signedInView}>
                <div className={styles.patronAvatar}>
                  {currentPatron.fullName
                    ? currentPatron.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()
                    : 'SP'}
                </div>
                <h3 className={styles.patronName}>Namaste, {currentPatron.fullName}</h3>
                <p className={styles.patronEmail}>{currentPatron.email || currentPatron.phone}</p>
                <div className={styles.patronPerkBadge}>
                  <span>👑 Verified Shloka Patron</span>
                </div>
                <div className={styles.signedInActions}>
                  <button type="button" className={styles.royalSubmitBtn} onClick={onClose}>
                    <span className={styles.btnDiamond}>❖</span>
                    <span>EXPLORE COLLECTIONS</span>
                    <span className={styles.btnDiamond}>❖</span>
                  </button>
                  <button type="button" className={styles.signOutLink} onClick={handleSignOut}>
                    Sign Out of Account
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ── MODE 1: SIGN IN (Default - Matches Image 2) ── */}
                {authMode === 'signin' && (
                  <form className={styles.authForm} onSubmit={handleSignInSubmit} noValidate>
                    {/* Field 1: Email or Mobile */}
                    <div className={styles.inputFieldGroup}>
                      <label htmlFor="signin-identifier" className={styles.inputLabel}>
                        EMAIL OR MOBILE NUMBER
                      </label>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input
                          id="signin-identifier"
                          type="text"
                          className={styles.royalInput}
                          placeholder="Enter your email or mobile number"
                          value={signInData.identifier}
                          onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })}
                          required
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    {/* Field 2: Password */}
                    <div className={styles.inputFieldGroup}>
                      <div className={styles.passwordLabelRow}>
                        <label htmlFor="signin-password" className={styles.inputLabel}>
                          PASSWORD
                        </label>
                        <button
                          type="button"
                          className={styles.showPasswordBtn}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                        <input
                          id="signin-password"
                          type={showPassword ? 'text' : 'password'}
                          className={styles.royalInput}
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          required
                          autoComplete="current-password"
                        />
                      </div>
                    </div>

                    {/* Main Sign In Button (Deep Crimson Royal Pill) */}
                    <button
                      type="submit"
                      className={styles.royalSubmitBtn}
                      disabled={isLoading}
                    >
                      <span className={styles.btnDiamond}>❖</span>
                      <span className={styles.btnText}>{isLoading ? 'AUTHENTICATING...' : 'SIGN IN'}</span>
                      <span className={styles.btnDiamond}>❖</span>
                    </button>

                    {/* OR Divider */}
                    <div className={styles.orDivider} aria-hidden="true">
                      <span className={styles.orLine} />
                      <span className={styles.orText}>OR</span>
                      <span className={styles.orLine} />
                    </div>

                    {/* Continue with Google Social Button */}
                    <button
                      type="button"
                      className={styles.googleBtn}
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className={styles.googleIcon} width="16" height="16" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    {/* Secondary Navigation Links */}
                    <div className={styles.bottomNavGroup}>
                      <p className={styles.switchModeLine}>
                        New to Shloka?{' '}
                        <button
                          type="button"
                          className={styles.linkButton}
                          onClick={() => {
                            setFormError('');
                            setFormSuccess('');
                            setAuthMode('register');
                          }}
                        >
                          Create an Account
                        </button>
                      </p>

                      <button
                        type="button"
                        className={styles.forgotPasswordLink}
                        onClick={() => {
                          setFormError('');
                          setFormSuccess('');
                          setAuthMode('forgot');
                        }}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>
                )}

                {/* ── MODE 2: REGISTER / CREATE ACCOUNT ── */}
                {authMode === 'register' && (
                  <form className={styles.authForm} onSubmit={handleRegisterSubmit} noValidate>
                    {/* Full Name */}
                    <div className={styles.inputFieldGroup}>
                      <label htmlFor="reg-name" className={styles.inputLabel}>
                        FULL NAME
                      </label>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input
                          id="reg-name"
                          type="text"
                          className={styles.royalInput}
                          placeholder="Your full name"
                          value={registerData.fullName}
                          onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className={styles.inputFieldGroup}>
                      <label htmlFor="reg-email" className={styles.inputLabel}>
                        EMAIL ADDRESS
                      </label>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </span>
                        <input
                          id="reg-email"
                          type="email"
                          className={styles.royalInput}
                          placeholder="name@domain.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className={styles.inputFieldGroup}>
                      <label htmlFor="reg-phone" className={styles.inputLabel}>
                        MOBILE NUMBER
                      </label>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                            <path d="M12 18h.01" />
                          </svg>
                        </span>
                        <input
                          id="reg-phone"
                          type="tel"
                          className={styles.royalInput}
                          placeholder="+91 98765 43210"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className={styles.inputFieldGroup}>
                      <div className={styles.passwordLabelRow}>
                        <label htmlFor="reg-password" className={styles.inputLabel}>
                          CREATE PASSWORD
                        </label>
                        <button
                          type="button"
                          className={styles.showPasswordBtn}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                        <input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          className={styles.royalInput}
                          placeholder="At least 6 characters"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.inputFieldGroup}>
                      <div className={styles.passwordLabelRow}>
                        <label htmlFor="reg-conf-password" className={styles.inputLabel}>
                          CONFIRM PASSWORD
                        </label>
                        <button
                          type="button"
                          className={styles.showPasswordBtn}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                        <input
                          id="reg-conf-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={styles.royalInput}
                          placeholder="Re-enter password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Register Submit Button */}
                    <button
                      type="submit"
                      className={styles.royalSubmitBtn}
                      disabled={isLoading}
                    >
                      <span className={styles.btnDiamond}>❖</span>
                      <span className={styles.btnText}>{isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</span>
                      <span className={styles.btnDiamond}>❖</span>
                    </button>

                    <p className={styles.switchModeLine}>
                      Already registered?{' '}
                      <button
                        type="button"
                        className={styles.linkButton}
                        onClick={() => {
                          setFormError('');
                          setFormSuccess('');
                          setAuthMode('signin');
                        }}
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                )}

                {/* ── MODE 3: FORGOT PASSWORD ── */}
                {authMode === 'forgot' && (
                  <form className={styles.authForm} onSubmit={handleForgotSubmit} noValidate>
                    <div className={styles.inputFieldGroup}>
                      <label htmlFor="forgot-email" className={styles.inputLabel}>
                        REGISTERED EMAIL
                      </label>
                      <div className={styles.inputControlWrap}>
                        <span className={styles.inputLeadingIcon} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6855" strokeWidth="1.5">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </span>
                        <input
                          id="forgot-email"
                          type="email"
                          className={styles.royalInput}
                          placeholder="Enter your registered email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.royalSubmitBtn}
                      disabled={isLoading}
                    >
                      <span className={styles.btnDiamond}>❖</span>
                      <span className={styles.btnText}>{isLoading ? 'DISPATCHING...' : 'SEND RESET LINK'}</span>
                      <span className={styles.btnDiamond}>❖</span>
                    </button>

                    <button
                      type="button"
                      className={styles.forgotPasswordLink}
                      onClick={() => {
                        setFormError('');
                        setFormSuccess('');
                        setAuthMode('signin');
                      }}
                    >
                      ← Back to Sign In
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Bottom Heritage Motto & Lotus Flourish */}
            <footer className={styles.brandFooterMotto}>
              <div className={styles.footerLotusWrap} aria-hidden="true">
                <BloomingLotusIcon width={18} height={13} stroke="#A07F3A" />
              </div>
              <div className={styles.mottoRow}>
                <span className={styles.mottoDiamond}>― ❖ ―</span>
                <span className={styles.mottoText}>A century of tradition, woven forward.</span>
                <span className={styles.mottoDiamond}>― ❖ ―</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
