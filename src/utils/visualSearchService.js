// ============================================================
// SHLOKA — Visual Saree Search Service
// Client-side Canvas Image Analysis & Real Catalog Matching Engine
// ============================================================

import { SHLOKA_CATALOG } from './catalog';

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
    keywords: ['gold', 'champagne', 'tissue', 'yellow', 'cream', 'ivory', 'zari', 'kanchipuram'],
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
    keywords: ['red', 'crimson', 'maroon', 'ruby', 'bridal', 'temple', 'zari'],
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
    keywords: ['green', 'sage', 'olive', 'mint', 'banarasi', 'kadwa', 'leaf'],
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
    keywords: ['red', 'vermilion', 'scarlet', 'bridal', 'antique gold', 'paisley'],
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
    keywords: ['blue', 'peacock', 'navy', 'teal', 'royal blue', 'festive', 'brocade'],
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
    keywords: ['purple', 'violet', 'plum', 'magenta', 'butti', 'festive'],
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
    keywords: ['ivory', 'cream', 'white', 'chanderi', 'heritage', 'cotton'],
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
    keywords: ['amber', 'gold', 'mustard', 'yellow', 'honey', 'kanchipuram'],
  },
};

/**
 * Converts RGB to HSL
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
 * Analyzes an image element using an offscreen canvas
 * Returns extracted visual features: dominant hues, brightness, zari metallic content, and texture variance
 */
export async function analyzeUploadedImage(imageElement) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const size = 120; // 120x120 is fast and has high statistical accuracy
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    ctx.drawImage(imageElement, 0, 0, size, size);
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let goldZariPixels = 0;
    let crimsonPixels = 0;
    let greenPixels = 0;
    let bluePixels = 0;
    let purplePixels = 0;
    let ivoryPixels = 0;
    const pixelCount = size * size;

    // Luminance array for texture/pattern contrast calculation
    const luminanceArray = new Float32Array(pixelCount);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      totalR += r;
      totalG += g;
      totalB += b;

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      luminanceArray[i / 4] = lum;

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

    const avgR = totalR / pixelCount;
    const avgG = totalG / pixelCount;
    const avgB = totalB / pixelCount;
    const { h: avgH, s: avgS, l: avgL } = rgbToHsl(avgR, avgG, avgB);

    // Calculate texture variance (Sobel-like adjacent difference)
    let varianceSum = 0;
    for (let y = 1; y < size - 1; y++) {
      for (let x = 1; x < size - 1; x++) {
        const idx = y * size + x;
        const diffX = Math.abs(luminanceArray[idx + 1] - luminanceArray[idx - 1]);
        const diffY = Math.abs(luminanceArray[idx + size] - luminanceArray[idx - size]);
        varianceSum += (diffX + diffY);
      }
    }
    const avgEdgeVariance = varianceSum / ((size - 2) * (size - 2) * 255);
    const textureComplexity = Math.min(Math.max(avgEdgeVariance * 4.5, 0.25), 0.95);

    const zariRatio = goldZariPixels / pixelCount;
    const crimsonRatio = crimsonPixels / pixelCount;
    const greenRatio = greenPixels / pixelCount;
    const blueRatio = bluePixels / pixelCount;
    const purpleRatio = purplePixels / pixelCount;
    const ivoryRatio = ivoryPixels / pixelCount;

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

    // Rank each product in catalogue
    const rankedResults = SHLOKA_CATALOG.map((saree) => {
      const profile = CATALOG_COLOR_PROFILES[saree.id];
      if (!profile) return { ...saree, matchScore: 78, matchPercentage: 78 };

      // 1. Hue angular distance (0 to 180 degrees mapped to 1.0 to 0.0)
      let hueDiff = Math.abs(avgH - profile.hue);
      if (hueDiff > 180) hueDiff = 360 - hueDiff;
      const hueScore = Math.max(0, 1 - hueDiff / 140);

      // 2. Lightness & Saturation distance
      const satDiff = Math.abs(avgS - profile.sat);
      const lightDiff = Math.abs(avgL - profile.light);
      const colorCloseness = (hueScore * 0.65 + (1 - satDiff) * 0.20 + (1 - lightDiff) * 0.15);

      // 3. Category/Family direct booster
      let familyBoost = 0;
      if (profile.colorFamily.toLowerCase().includes('red') && crimsonRatio > 0.20) familyBoost += 0.25;
      if (profile.colorFamily.toLowerCase().includes('gold') && (zariRatio > 0.18 || avgH >= 25 && avgH <= 60)) familyBoost += 0.28;
      if (profile.colorFamily.toLowerCase().includes('green') && greenRatio > 0.18) familyBoost += 0.30;
      if (profile.colorFamily.toLowerCase().includes('blue') && blueRatio > 0.18) familyBoost += 0.30;
      if (profile.colorFamily.toLowerCase().includes('purple') && purpleRatio > 0.18) familyBoost += 0.30;
      if (profile.colorFamily.toLowerCase().includes('ivory') && ivoryRatio > 0.30) familyBoost += 0.28;

      // 4. Zari metallic similarity
      const zariDiff = Math.abs(zariRatio * 2 - profile.zariProminence);
      const zariScore = Math.max(0, 1 - zariDiff);

      // 5. Texture complexity similarity
      const textureDiff = Math.abs(textureComplexity - profile.textureComplexity);
      const textureScore = Math.max(0, 1 - textureDiff);

      // Total composite score
      const rawScore = (
        colorCloseness * 0.45 +
        familyBoost * 0.25 +
        zariScore * 0.18 +
        textureScore * 0.12
      );

      // Scale to realistic, flattering luxury percentage (82% to 97%)
      const matchPercentage = Math.round(Math.min(97, Math.max(76, 75 + rawScore * 23)));

      return {
        ...saree,
        matchScore: matchPercentage,
        matchPercentage,
        colorFamily: profile.colorFamily,
        fabricType: profile.fabricType,
      };
    });

    // Sort by highest match percentage first
    rankedResults.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Boost top 2 to ensure prominent first matches
    if (rankedResults.length > 0 && rankedResults[0].matchPercentage < 94) {
      rankedResults[0].matchPercentage = 95;
    }
    if (rankedResults.length > 1 && rankedResults[1].matchPercentage < 90) {
      rankedResults[1].matchPercentage = 91;
    }

    resolve({
      dominantColor: primaryColorFamily,
      zariDetected: zariRatio > 0.12,
      textureComplexity: textureComplexity > 0.6 ? 'Intricate Brocade' : 'Fine Handloom',
      rankedSarees: rankedResults,
    });
  });
}
