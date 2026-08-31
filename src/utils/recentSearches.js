// ============================================================
// SHLOKA — Recent Searches Persistence Utility
// ============================================================

const RECENT_SEARCHES_KEY = 'shloka_recent_searches';
const INITIAL_SEARCHES = ['Kanchipuram Silk', 'Bridal Crimson', 'Champagne Gold Zari'];

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(INITIAL_SEARCHES));
      return INITIAL_SEARCHES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEARCHES;
  }
}

export function addRecentSearch(query) {
  const q = (query || '').trim();
  if (!q) return getRecentSearches();

  try {
    const current = getRecentSearches();
    const filtered = current.filter((item) => item.toLowerCase() !== q.toLowerCase());
    const updated = [q, ...filtered].slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [q];
  }
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // ignore
  }
  return [];
}
