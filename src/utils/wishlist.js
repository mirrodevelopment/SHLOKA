// ============================================================
// SHLOKA — Luxury Wishlist State & Persistence Engine
// ============================================================

import { SHLOKA_CATALOG } from './catalog';

const WISHLIST_STORAGE_KEY = 'shloka_wishlist';

// Default initial wishlisted item
const INITIAL_WISHLIST_IDS = ['saree-megh'];

/**
 * Dispatch custom event when wishlist updates
 */
function dispatchWishlistUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('shloka_wishlist_updated'));
  }
}

/**
 * Get all wishlisted item IDs
 */
export function getWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(INITIAL_WISHLIST_IDS));
      return INITIAL_WISHLIST_IDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Deduplicate and filter to only items existing in the catalog
      const validIds = Array.from(new Set(parsed)).filter((id) =>
        SHLOKA_CATALOG.some((s) => s.id === id)
      );
      if (validIds.length !== parsed.length) {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(validIds));
        dispatchWishlistUpdate();
      }
      return validIds;
    }
    return INITIAL_WISHLIST_IDS;
  } catch (err) {
    console.error('Error reading Shloka wishlist:', err);
    return INITIAL_WISHLIST_IDS;
  }
}

/**
 * Get full wishlisted item objects
 */
export function getWishlistItems() {
  const ids = getWishlistIds();
  return ids
    .map((id) => SHLOKA_CATALOG.find((s) => s.id === id))
    .filter(Boolean);
}

/**
 * Check if item is in wishlist
 */
export function isInWishlist(itemId) {
  const ids = getWishlistIds();
  return ids.includes(itemId);
}

/**
 * Toggle item in wishlist
 */
export function toggleWishlist(itemOrId) {
  const id = typeof itemOrId === 'object' ? itemOrId.id : itemOrId;
  const ids = getWishlistIds();
  const exists = ids.includes(id);

  let updated;
  if (exists) {
    updated = ids.filter((i) => i !== id);
  } else {
    updated = [id, ...ids];
  }

  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    dispatchWishlistUpdate();
  } catch (err) {
    console.error('Error saving Shloka wishlist:', err);
  }

  return updated;
}

/**
 * Remove an item from wishlist
 */
export function removeFromWishlist(itemId) {
  const ids = getWishlistIds();
  const updated = ids.filter((i) => i !== itemId);
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    dispatchWishlistUpdate();
  } catch (err) {
    console.error('Error saving Shloka wishlist:', err);
  }
  return updated;
}

/**
 * Get count of wishlist items
 */
export function getWishlistCount() {
  return getWishlistItems().length;
}
