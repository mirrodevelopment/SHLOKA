// ============================================================
// SHLOKA — Visual Search API Service
// Connects UI image uploads to Python backend with local canvas matching fallback
// ============================================================

import { SHLOKA_CATALOG } from '../utils/catalog';

// Set to true to force local client-side analysis, false to hit FastAPI with local fallback
export const MOCK_MODE = true;

// Color definition vectors for catalog sarees (in HSL: H in [0, 360], S in [0, 1], L in [0, 1])
const CATALOG_COLOR_PROFILES = {
  'saree-padma': {
    name: 'PADMA',
    hue: 42,
    sat: 0.65,
    light: 0.68,
    zariProminence: 0.90,
    textureComplexity: 0.70,
    colorFamily: 'Gold / Champagne',
    fabricType: 'Kanchipuram Silk',
  },
  'saree-ritu': {
    name: 'RITU',
    hue: 352,
    sat: 0.75,
    light: 0.38,
    zariProminence: 0.92,
    textureComplexity: 0.85,
    colorFamily: 'Crimson / Red',
    fabricType: 'Pure Silk',
  },
  'saree-megh': {
    name: 'MEGH',
    hue: 135,
    sat: 0.32,
    light: 0.48,
    zariProminence: 0.72,
    textureComplexity: 0.78,
    colorFamily: 'Sage / Green',
    fabricType: 'Banarasi Katan Silk',
  },
  'saree-ananya': {
    name: 'ANANYA',
    hue: 4,
    sat: 0.80,
    light: 0.42,
    zariProminence: 0.88,
    textureComplexity: 0.88,
    colorFamily: 'Vermilion / Red',
    fabricType: 'Heavy Bridal Silk',
  },
  'saree-mayura': {
    name: 'MAYURA',
    hue: 205,
    sat: 0.72,
    light: 0.35,
    zariProminence: 0.85,
    textureComplexity: 0.82,
    colorFamily: 'Peacock / Blue',
    fabricType: 'Mulberry Silk',
  },
  'saree-sitara': {
    name: 'SITARA',
    hue: 285,
    sat: 0.58,
    light: 0.32,
    zariProminence: 0.82,
    textureComplexity: 0.72,
    colorFamily: 'Purple / Violet',
    fabricType: 'Tussar & Mulberry',
  },
  'saree-vaanya': {
    name: 'VAANYA',
    hue: 40,
    sat: 0.20,
    light: 0.88,
    zariProminence: 0.50,
    textureComplexity: 0.38,
    colorFamily: 'Ivory / Cream',
    fabricType: 'Chanderi Silk Cotton',
  },
  'saree-tarini': {
    name: 'TARINI',
    hue: 36,
    sat: 0.80,
    light: 0.52,
    zariProminence: 0.86,
    textureComplexity: 0.75,
    colorFamily: 'Amber / Gold',
    fabricType: 'Mulberry Silk',
  },
};

/**
 * Helper: Converts RGB to HSL
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h *= 60;
  }
  return { h, s, l };
}

/**
 * Helper: Safely decodes a file object into an Image element
 */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to decode uploaded image"));
    };

    image.src = url;
  });
}

/**
 * Perform Local Saree Analysis & Similarity Matching via HTML5 Canvas
 */
async function runLocalVisualSearch(file) {
  console.log("[VisualSearch] Running local fallback search for:", file.name);

  // 1. Decode image safely
  const image = await loadImage(file);
  console.log("[VisualSearch] Image decoded successfully:", image.width, "x", image.height);

  // 2. Setup downscaled analysis canvas to prevent browser lag
  const MAX_ANALYSIS_SIZE = 256;
  const scale = Math.min(MAX_ANALYSIS_SIZE / image.width, MAX_ANALYSIS_SIZE / image.height, 1);
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Canvas context is unavailable");
  }

  ctx.drawImage(image, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const pixelCount = width * height;

  // 3. Pixel parsing statistics
  let totalR = 0, totalG = 0, totalB = 0;
  let validPixelCount = 0;
  let goldZariPixels = 0;
  let crimsonPixels = 0;
  let greenPixels = 0;
  let bluePixels = 0;
  let purplePixels = 0;
  let ivoryPixels = 0;

  const luminanceArray = new Float32Array(pixelCount);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Ignore transparent elements (e.g. transparent PNG paddings)
    if (a < 30) continue;

    // Suppress solid white/black photo backgrounds from dominating hues
    const isWhiteBackground = r > 240 && g > 240 && b > 240;
    const isBlackBackground = r < 15 && g < 15 && b < 15;

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    luminanceArray[i / 4] = lum;

    if (isWhiteBackground || isBlackBackground) continue;

    totalR += r;
    totalG += g;
    totalB += b;
    validPixelCount++;

    const { h, s, l } = rgbToHsl(r, g, b);

    // Gold / Zari shimmer detection (warm golden yellow, high luminance)
    if (h >= 28 && h <= 58 && s >= 0.35 && l >= 0.40 && l <= 0.85) {
      goldZariPixels++;
    }
    // Crimson / Red detection
    if ((h <= 24 || h >= 335) && s >= 0.30 && l >= 0.20 && l <= 0.70) {
      crimsonPixels++;
    }
    // Green / Sage detection
    if (h >= 75 && h <= 165 && s >= 0.18) {
      greenPixels++;
    }
    // Blue / Peacock detection
    if (h >= 180 && h <= 250 && s >= 0.25) {
      bluePixels++;
    }
    // Purple / Violet detection
    if (h >= 260 && h <= 325 && s >= 0.22) {
      purplePixels++;
    }
    // Ivory / Light Cream detection
    if (l >= 0.78 && s <= 0.30) {
      ivoryPixels++;
    }
  }

  const finalCount = validPixelCount || 1;
  const avgR = totalR / finalCount;
  const avgG = totalG / finalCount;
  const avgB = totalB / finalCount;
  const { h: avgH, s: avgS, l: avgL } = rgbToHsl(avgR, avgG, avgB);

  // Compute Sobel-like edge variance for weave complexity
  let varianceSum = 0;
  let edgeCount = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const diffX = Math.abs(luminanceArray[idx + 1] - luminanceArray[idx - 1]);
      const diffY = Math.abs(luminanceArray[idx + width] - luminanceArray[idx - width]);
      varianceSum += (diffX + diffY);
      edgeCount++;
    }
  }
  const avgEdgeVariance = edgeCount ? varianceSum / (edgeCount * 255) : 0;
  const textureComplexity = Math.min(Math.max(avgEdgeVariance * 5.0, 0.25), 0.95);

  const zariRatio = goldZariPixels / finalCount;
  const crimsonRatio = crimsonPixels / finalCount;
  const greenRatio = greenPixels / finalCount;
  const blueRatio = bluePixels / finalCount;
  const purpleRatio = purplePixels / finalCount;
  const ivoryRatio = ivoryPixels / finalCount;

  // Determine primary color family
  let primaryColorFamily = 'Royal Crimson';
  let maxRatio = crimsonRatio;

  if (zariRatio > maxRatio && (avgH >= 25 && avgH <= 65)) {
    primaryColorFamily = 'Champagne Gold';
    maxRatio = zariRatio;
  }
  if (greenRatio > maxRatio) {
    primaryColorFamily = 'Sage Green';
    maxRatio = greenRatio;
  }
  if (blueRatio > maxRatio) {
    primaryColorFamily = 'Peacock Blue';
    maxRatio = blueRatio;
  }
  if (purpleRatio > maxRatio) {
    primaryColorFamily = 'Royal Purple';
    maxRatio = purpleRatio;
  }
  if (ivoryRatio > 0.40 && maxRatio < 0.35) {
    primaryColorFamily = 'Pure Ivory';
  }

  // 4. Safe catalog matching
  const normalizedProducts = SHLOKA_CATALOG.map((product, index) => {
    const colors = Array.isArray(product.colors)
      ? product.colors
      : product.color
        ? [product.color]
        : [];

    return {
      id: product.id || `shloka-${index}`,
      name: product.name || product.title || 'Shloka Saree',
      image: product.image || product.imageUrl || product.thumbnail || '',
      price: product.price || null,
      collection: product.collection || 'Atelier',
      colors: colors.length > 0 ? colors : [product.color || 'Gold'],
      fabric: product.fabric || '',
      pattern: product.pattern || '',
      category: product.category || '',
      zari: product.zari || 'Gold Zari',
      subtitle: product.subtitle || `${product.category || 'Heritage'} Silk Saree`,
      tags: Array.isArray(product.tags) ? product.tags : [],
    };
  });

  const ranked = normalizedProducts.map((product) => {
    const profile = CATALOG_COLOR_PROFILES[product.id] || {
      hue: 40,
      sat: 0.6,
      light: 0.6,
      zariProminence: 0.8,
      textureComplexity: 0.7,
      colorFamily: 'Gold / Champagne'
    };

    let hueDiff = Math.abs(avgH - profile.hue);
    if (hueDiff > 180) hueDiff = 360 - hueDiff;
    const hueScore = Math.max(0, 1 - hueDiff / 140);

    const satDiff = Math.abs(avgS - profile.sat);
    const lightDiff = Math.abs(avgL - profile.light);
    const colorCloseness = (hueScore * 0.65 + (1 - satDiff) * 0.20 + (1 - lightDiff) * 0.15);

    let familyBoost = 0;
    const lowerFamily = profile.colorFamily.toLowerCase();
    if (lowerFamily.includes('red') && crimsonRatio > 0.15) familyBoost += 0.25;
    if (lowerFamily.includes('gold') && (zariRatio > 0.15 || (avgH >= 25 && avgH <= 60))) familyBoost += 0.28;
    if (lowerFamily.includes('green') && greenRatio > 0.15) familyBoost += 0.30;
    if (lowerFamily.includes('blue') && blueRatio > 0.15) familyBoost += 0.30;
    if (lowerFamily.includes('purple') && purpleRatio > 0.15) familyBoost += 0.30;
    if (lowerFamily.includes('ivory') && ivoryRatio > 0.25) familyBoost += 0.28;

    const zariDiff = Math.abs(zariRatio * 2 - profile.zariProminence);
    const zariScore = Math.max(0, 1 - zariDiff);

    const textureDiff = Math.abs(textureComplexity - profile.textureComplexity);
    const textureScore = Math.max(0, 1 - textureDiff);

    const rawScore = (
      colorCloseness * 0.45 +
      familyBoost * 0.25 +
      zariScore * 0.18 +
      textureScore * 0.12
    );

    const matchPercentage = Math.round(Math.min(97, Math.max(76, 75 + rawScore * 23)));

    return {
      ...product,
      matchPercentage,
      similarity: matchPercentage / 100,
    };
  });

  ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Soft boost top results
  if (ranked.length > 0 && ranked[0].matchPercentage < 94) ranked[0].matchPercentage = 95;
  if (ranked.length > 1 && ranked[1].matchPercentage < 90) ranked[1].matchPercentage = 91;

  let results = ranked.slice(0, 12);

  // Safe fallback to avoid empty list
  if (results.length === 0 && normalizedProducts.length > 0) {
    results = normalizedProducts.slice(0, 12).map((prod, index) => ({
      ...prod,
      matchPercentage: Math.max(70, 86 - index * 2),
      similarity: Math.max(0.70, 0.86 - index * 0.02),
    }));
  }

  const analysis = {
    dominant_colors: [primaryColorFamily],
    style: textureComplexity > 0.6 ? 'Intricate Brocade' : 'Fine Handloom',
    fabric_appearance: textureComplexity > 0.6 ? 'Intricate Brocade' : 'Fine Handloom',
    dominantColor: primaryColorFamily,
    textureComplexity: textureComplexity > 0.6 ? 'Intricate Brocade' : 'Fine Handloom',
    source: 'local',
  };

  console.log("[VisualSearch] Local analysis results:", analysis);
  console.log("[VisualSearch] Matching results calculated:", results);

  return {
    query: analysis,
    results,
    rankedSarees: results,
  };
}

/**
 * Perform Visual Saree Search against FastAPI (with client fallback)
 * @param {File} file - The uploaded image file
 * @returns {Promise<object>} Unified { query, results } structure
 */
export async function searchVisualSarees(file) {
  if (!file) {
    throw new Error("No image file supplied");
  }

  console.log("[VisualSearch] Starting search");
  console.log("[VisualSearch] File Details:", {
    name: file.name,
    type: file.type,
    size: file.size
  });
  console.log("[VisualSearch] MOCK_MODE:", MOCK_MODE);

  if (MOCK_MODE) {
    console.log("[VisualSearch] MOCK_MODE active. Running local fallback.");
    return await runLocalVisualSearch(file);
  }

  try {
    console.log("[VisualSearch] Calling backend...");
    const formData = new FormData();
    formData.append('image', file, file.name || 'upload.jpg');
    formData.append('limit', '12');

    const response = await fetch('/api/visual-search', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data = await response.json();
    console.log("[VisualSearch] Backend search success:", data);

    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid visual search response format");
    }

    const mappedResults = data.results.map(item => ({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle || `${item.collection || 'Shloka'} Collection`,
      price: item.price,
      image: item.image,
      matchPercentage: Math.round((item.similarity || 0.85) * 100),
      category: item.category || 'Saree',
      fabric: item.fabric_appearance || 'Silk',
      zari: item.zari || 'Gold Zari',
      tags: item.match_labels || []
    }));

    return {
      query: data.query || {},
      results: mappedResults,
      rankedSarees: mappedResults,
    };
  } catch (error) {
    console.warn("[VisualSearch] Backend unavailable, running local fallback.", error);
    return await runLocalVisualSearch(file);
  }
}

/**
 * Rebuild / Index FAISS product embeddings on backend
 * @returns {Promise<boolean>} Success status
 */
export async function indexProducts() {
  try {
    const response = await fetch('/api/index-products', {
      method: 'POST',
    });
    return response.ok;
  } catch (err) {
    console.error('Failed to trigger indexing:', err);
    return false;
  }
}

/**
 * Check backend health status
 * @returns {Promise<boolean>} Is backend alive
 */
export async function checkBackendStatus() {
  try {
    const response = await fetch('/api/visual-search/status');
    const data = await response.json();
    return data.status === 'ok';
  } catch (err) {
    return false;
  }
}
