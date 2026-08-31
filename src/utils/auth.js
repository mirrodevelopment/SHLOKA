/**
 * SHLOKA Luxury Boutique — Scalable Multi-User Authentication Engine
 * Supports unlimited user accounts, multi-patron registries,
 * pre-seeded royal patrons, phone/email matching, session management,
 * and per-patron state persistence.
 */

const USERS_STORAGE_KEY = 'shloka_registered_users';
const CURRENT_USER_KEY = 'shloka_active_patron';

// Default Pre-Seeded Royal Patron Accounts (Ready for instant multi-user logins)
const DEFAULT_PATRONS = [
  {
    id: 'patron_ananya_01',
    fullName: 'Ananya Sundaram',
    email: 'ananya@shloka.luxury',
    phone: '9840012345',
    password: 'password123',
    vipClub: true,
    tier: 'Royal Bridal Patron',
    city: 'Coimbatore',
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'patron_meera_02',
    fullName: 'Meera Patel',
    email: 'meera.patel@gmail.com',
    phone: '9876543210',
    password: 'password123',
    vipClub: true,
    tier: 'Heritage Collector',
    city: 'Mumbai',
    createdAt: '2026-02-01T14:30:00.000Z',
  },
  {
    id: 'patron_priya_03',
    fullName: 'Priya Nair',
    email: 'priya.nair@outlook.com',
    phone: '9444098765',
    password: 'password123',
    vipClub: true,
    tier: 'Bespoke Couture VIP',
    city: 'Chennai',
    createdAt: '2026-02-20T09:15:00.000Z',
  },
  {
    id: 'patron_sharma_04',
    fullName: 'Radhika Sharma',
    email: 'radhika.sharma@shloka.in',
    phone: '9811122233',
    password: 'password123',
    vipClub: false,
    tier: 'Shloka Patron',
    city: 'Bengaluru',
    createdAt: '2026-03-01T16:45:00.000Z',
  },
];

/**
 * Normalize phone numbers to plain digits without country codes
 */
export function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

/**
 * Retrieve all registered users from localStorage (auto-seeds defaults if empty)
 */
export function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_PATRONS));
      return DEFAULT_PATRONS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_PATRONS));
      return DEFAULT_PATRONS;
    }
    return parsed;
  } catch (e) {
    console.error('Error reading registered users from storage:', e);
    return DEFAULT_PATRONS;
  }
}

/**
 * Retrieve currently logged in patron from localStorage
 */
export function getActivePatron() {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading active patron:', e);
    return null;
  }
}

/**
 * Register a new user account into the multi-user database
 */
export function registerPatron({ fullName, email, phone, password, city = '', vipClub = true }) {
  const users = getRegisteredUsers();

  const cleanName = (fullName || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPhone = normalizePhone(phone);

  if (!cleanName) {
    return { success: false, error: 'Please enter your full name.' };
  }

  if (!cleanEmail && !cleanPhone) {
    return {
      success: false,
      error: 'Please provide a valid email address or 10-digit mobile number.',
    };
  }

  // Check uniqueness across email and mobile
  const existingUser = users.find((u) => {
    const matchEmail = cleanEmail && u.email && u.email.toLowerCase() === cleanEmail;
    const matchPhone = cleanPhone && u.phone && normalizePhone(u.phone) === cleanPhone;
    return matchEmail || matchPhone;
  });

  if (existingUser) {
    const conflictField = cleanEmail && existingUser.email?.toLowerCase() === cleanEmail ? 'email address' : 'mobile number';
    return {
      success: false,
      error: `An account with this ${conflictField} is already registered. Please sign in instead.`,
    };
  }

  const newPatron = {
    id: 'patron_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    fullName: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    password: password || 'shloka123',
    city: city.trim() || 'India',
    vipClub,
    tier: vipClub ? 'Royal Heritage Club Patron' : 'Shloka Patron',
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [newPatron, ...users];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

  return {
    success: true,
    user: newPatron,
    message: `Account created successfully for ${newPatron.fullName}. Welcome to Shloka!`,
  };
}

/**
 * Authenticate and log in any user by Email OR Mobile Number
 */
export function loginPatron({ identifier, password }) {
  const users = getRegisteredUsers();
  const rawInput = (identifier || '').trim();
  const cleanEmail = rawInput.toLowerCase();
  const cleanPhone = normalizePhone(rawInput);

  if (!rawInput) {
    return {
      success: false,
      error: 'Please enter your registered email or mobile number.',
    };
  }

  if (!password) {
    return {
      success: false,
      error: 'Please enter your password.',
    };
  }

  // Multi-User Matching: Check email OR 10-digit phone
  const user = users.find((u) => {
    const emailMatch = u.email && u.email.toLowerCase() === cleanEmail;
    const phoneMatch = u.phone && cleanPhone && normalizePhone(u.phone) === cleanPhone;
    return emailMatch || phoneMatch;
  });

  if (!user) {
    return {
      success: false,
      error: 'No account found with these credentials. Please check or create an account.',
    };
  }

  // Password Verification (or bypass if social demo)
  if (user.password && user.password !== password && password !== 'google_oauth') {
    return {
      success: false,
      error: 'Incorrect password. Please verify and try again.',
    };
  }

  // Set active session
  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
    message: `Welcome back, ${sessionUser.fullName}.`,
  };
}

/**
 * Authenticate via Google OAuth (Multi-user auto registration/login)
 */
export function loginWithGoogle({ fullName = 'Ananya Sharma', email = 'ananya.sharma@gmail.com' } = {}) {
  const users = getRegisteredUsers();
  const cleanEmail = email.toLowerCase().trim();

  let user = users.find((u) => u.email && u.email.toLowerCase() === cleanEmail);

  if (!user) {
    user = {
      id: 'patron_google_' + Date.now(),
      fullName: fullName,
      email: cleanEmail,
      phone: '',
      password: 'google_oauth',
      vipClub: true,
      tier: 'Google Verified Patron',
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [user, ...users];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }

  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
    message: `Signed in as ${sessionUser.fullName}.`,
  };
}

/**
 * Authenticate via Mobile OTP (Multi-user auto registration/login)
 */
export function loginWithOtp({ phone, otpCode }) {
  const users = getRegisteredUsers();
  const cleanPhone = normalizePhone(phone);

  if (!cleanPhone || cleanPhone.length < 10) {
    return { success: false, error: 'Please provide a valid 10-digit mobile number.' };
  }

  if (!otpCode || String(otpCode).length < 6) {
    return { success: false, error: 'Please enter the complete 6-digit OTP code.' };
  }

  let user = users.find((u) => u.phone && normalizePhone(u.phone) === cleanPhone);

  if (!user) {
    user = {
      id: 'patron_otp_' + Date.now(),
      fullName: 'Shloka Patron (' + cleanPhone.slice(-4) + ')',
      phone: cleanPhone,
      email: '',
      vipClub: true,
      tier: 'Mobile Verified Patron',
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [user, ...users];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }

  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
    message: `Welcome to Shloka, ${sessionUser.fullName}.`,
  };
}

/**
 * Switch to any existing patron by ID (instant multi-user switching)
 */
export function switchPatron(patronId) {
  const users = getRegisteredUsers();
  const user = users.find((u) => u.id === patronId);
  if (!user) {
    return { success: false, error: 'User not found.' };
  }

  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

/**
 * Update active patron profile details
 */
export function updatePatronProfile(updates) {
  const active = getActivePatron();
  if (!active) return { success: false, error: 'No active session.' };

  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === active.id);

  const updatedUser = { ...active, ...updates };
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  return { success: true, user: updatedUser };
}

/**
 * End current patron session
 */
export function logoutPatron() {
  localStorage.removeItem(CURRENT_USER_KEY);
  return { success: true };
}

/**
 * Get sample demo accounts for quick testing
 */
export function getDemoPatrons() {
  return DEFAULT_PATRONS;
}
