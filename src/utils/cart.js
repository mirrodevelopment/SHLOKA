// ============================================================
// SHLOKA — Luxury Cart State & Persistence Engine
// ============================================================

import saree1Img from '../assets/Sec-5-1.png';
import saree2Img from '../assets/Sec-5-2.png';
import saree3Img from '../assets/Sec-5-3.png';

const CART_STORAGE_KEY = 'shloka_cart_items';
const PROMO_STORAGE_KEY = 'shloka_active_promo';

// Default curated atelier pieces if bag is uninitialized
const INITIAL_ATELIER_ITEMS = [
  {
    id: 'saree-padma',
    name: 'PADMA',
    subtitle: 'Champagne Gold Tissue Silk Saree with Antique Floral Zari',
    craft: 'Pure Mulberry Silk • 3-Ply Gold Zari',
    sku: 'SHL-PAD-01',
    price: 78000,
    quantity: 1,
    image: saree1Img,
    color: 'Champagne Gold',
    weave: 'Kanchipuram Heritage Handloom',
  },
  {
    id: 'saree-ritu',
    name: 'RITU',
    subtitle: 'Royal Crimson Red Kanchipuram Silk Saree with Gold Temple Zari',
    craft: 'Handwoven Pure Silk • 24K Electroplated Zari',
    sku: 'SHL-RTU-02',
    price: 94500,
    quantity: 1,
    image: saree2Img,
    color: 'Royal Crimson',
    weave: 'Royal Kanchipuram Silk',
  },
];

export const VALID_PROMO_CODES = {
  SHLOKAVIP: { discountPercent: 10, label: 'VIP Patron Privilege 10% Off' },
  ROYAL15: { discountPercent: 15, label: 'Royal Festive Privilege 15% Off' },
  HERITAGE: { discountPercent: 10, label: 'Heritage Welcome 10% Off' },
};

/**
 * Notify subscribers across components about cart updates
 */
function dispatchCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('shloka_cart_updated'));
  }
}

/**
 * Get all current cart items
 */
export function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      // Seed initial curated luxury items
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(INITIAL_ATELIER_ITEMS));
      return INITIAL_ATELIER_ITEMS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading Shloka cart:', err);
    return INITIAL_ATELIER_ITEMS;
  }
}

/**
 * Save cart items
 */
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    dispatchCartUpdate();
  } catch (err) {
    console.error('Error saving Shloka cart:', err);
  }
}

/**
 * Add an item to the cart
 */
export function addToCart(item) {
  const items = getCartItems();
  const existingIndex = items.findIndex((i) => i.id === item.id);

  if (existingIndex > -1) {
    items[existingIndex].quantity += (item.quantity || 1);
  } else {
    items.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  saveCartItems(items);
  return items;
}

/**
 * Remove an item from the cart
 */
export function removeFromCart(itemId) {
  const items = getCartItems();
  const filtered = items.filter((i) => i.id !== itemId);
  saveCartItems(filtered);
  return filtered;
}

/**
 * Update quantity for an item
 */
export function updateCartQuantity(itemId, quantity) {
  const items = getCartItems();
  const target = items.find((i) => i.id === itemId);

  if (target) {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    target.quantity = quantity;
    saveCartItems(items);
  }

  return items;
}

/**
 * Clear the entire cart
 */
export function clearCart() {
  saveCartItems([]);
  localStorage.removeItem(PROMO_STORAGE_KEY);
  return [];
}

/**
 * Get total item count in cart
 */
export function getCartCount() {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

/**
 * Get subtotal in INR
 */
export function getCartSubtotal() {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
}

/**
 * Promo code management
 */
export function getActivePromo() {
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function applyPromoCode(code) {
  const normalized = (code || '').trim().toUpperCase();
  const promo = VALID_PROMO_CODES[normalized];

  if (promo) {
    const promoData = { code: normalized, ...promo };
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promoData));
    dispatchCartUpdate();
    return { success: true, promo: promoData };
  }

  return { success: false, message: 'Invalid Atelier Privilege code.' };
}

export function removePromoCode() {
  localStorage.removeItem(PROMO_STORAGE_KEY);
  dispatchCartUpdate();
}
