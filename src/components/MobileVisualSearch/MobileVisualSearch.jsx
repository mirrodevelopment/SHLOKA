// ============================================================
// SHLOKA — Mobile Visual Saree Search
// Premium interactive bottom sheet with Canvas Cropper and local matching engine
// ============================================================

import { useState, useRef, useEffect, Component } from 'react';
import { searchVisualSarees } from '../../services/visualSearchApi';
import { isInWishlist, toggleWishlist } from '../../utils/wishlist';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import plusIconImg from '../../assets/plus-icon.png';
import styles from './MobileVisualSearch.module.css';

// Safe Error Boundary to prevent full React tree unmounting on render crashes
class VisualSearchErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[VisualSearch Render Error]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 24,
            minHeight: '100vh',
            background: '#FFFDF9',
            color: '#222',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          <BloomingLotusIcon width={40} height={28} stroke="#B8893E" />
          <h2 style={{ fontFamily: 'serif', margin: '20px 0 10px 0', fontSize: '20px', color: '#8B2635' }}>
            Visual Search Failed
          </h2>
          <p style={{ fontSize: '13px', color: '#7A6855', maxWidth: '300px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
            {String(this.state.error?.message || 'Unknown render error')}
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset?.();
            }}
            style={{
              padding: '12px 24px',
              background: '#8B2635',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Reset Search
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const FILTER_CHIPS = ['Closest Match', 'Similar Colour', 'Silk', 'Gold Zari', 'Bridal'];

const STATUS_MESSAGES = [
  'Understanding your look...',
  'Comparing with Shloka sarees...',
  'Finding the closest matches...',
];

export default function MobileVisualSearch({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenBag,
}) {
  // State variables
  const [visualSearchActive, setVisualSearchActive] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState('upload'); // 'upload' | 'preview' | 'scanning' | 'results' | 'error'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Filter and Wishlist
  const [activeFilter, setActiveFilter] = useState('Closest Match');
  const [statusIdx, setStatusIdx] = useState(0);
  const [wishlistState, setWishlistState] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  // Cropper states
  const [cropMode, setCropMode] = useState('original');
  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const lastPanPosition = useRef({ x: 0, y: 0 });

  // Sync component active state
  useEffect(() => {
    if (isOpen) {
      console.log('[VisualSearch] MOUNTED / OPENED');
      setVisualSearchActive(true);
      setSheetOpen(true);
      setStep('upload');
      setSelectedFile(null);
      setPreviewUrl(null);
      setSearchResults([]);
      setAnalysis(null);
      setError(null);
      setCropMode('original');
      setZoom(1);
      setPanPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      console.log('[VisualSearch] UNMOUNTED / CLOSED');
      setVisualSearchActive(false);
      setSheetOpen(false);
      document.body.style.overflow = '';
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Trace step and result modifications
  useEffect(() => {
    console.log('[VisualSearch STATE]', {
      step,
      resultsCount: Array.isArray(searchResults) ? searchResults.length : 'NOT ARRAY',
      results: searchResults,
      analysis,
      selectedFile: !!selectedFile,
      previewUrl: !!previewUrl
    });
  }, [step, searchResults, analysis, selectedFile, previewUrl]);

  // Rotate messages during scanning
  useEffect(() => {
    let interval;
    if (step === 'scanning') {
      setStatusIdx(0);
      interval = setInterval(() => {
        setStatusIdx((prev) => (prev + 1) % STATUS_MESSAGES.length);
      }, 750);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Reset back to upload
  const resetSearch = () => {
    console.log('[VisualSearch] resetting search back to upload step');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setSearchResults([]);
    setAnalysis(null);
    setError(null);
    setCropMode('original');
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
    setSheetOpen(true);
    setStep('upload');
  };

  // Shared file selector
  const handleSelectedFile = (file) => {
    if (!file) return;

    console.log('[VisualSearch] File selected:', file);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
      setError('Please upload a JPG, PNG or WEBP image.');
      setStep('error');
      setSheetOpen(true);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10 MB');
      setStep('error');
      setSheetOpen(true);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    setError(null);
    setSheetOpen(false);
    setStep('preview');
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleSelectedFile(file);
    }
  };

  // Touch handlers
  const handleTouchStartCrop = (e) => {
    if (cropMode !== 'crop') return;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    lastPanPosition.current = { ...panPosition };
  };

  const handleTouchMoveCrop = (e) => {
    if (cropMode !== 'crop') return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    const maxOffset = (zoom - 1) * 90;
    setPanPosition({
      x: Math.min(Math.max(lastPanPosition.current.x + dx, -maxOffset), maxOffset),
      y: Math.min(Math.max(lastPanPosition.current.y + dy, -maxOffset), maxOffset),
    });
  };

  // Canvas Crop File compiler
  const getCroppedFile = () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = img.naturalWidth;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const w = size / zoom;
        const h = size / zoom;

        const pctX = -panPosition.x / (100 * (zoom - 1) || 1);
        const pctY = -panPosition.y / (100 * (zoom - 1) || 1);

        const maxShiftX = (size - w) / 2;
        const maxShiftY = (size - h) / 2;

        const sx = (size - w) / 2 + (pctX * maxShiftX);
        const sy = (size - h) / 2 + (pctY * maxShiftY);

        ctx.drawImage(img, sx, sy, w, h, 0, 0, size, size);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas toBlob failed'));
            return;
          }
          const croppedFile = new File(
            [blob],
            selectedFile?.name || 'shloka-search.jpg',
            {
              type: blob.type || selectedFile?.type || 'image/jpeg'
            }
          );
          resolve(croppedFile);
        }, selectedFile?.type || 'image/jpeg', 0.9);
      };
      img.onerror = () => reject(new Error('Failed to load preview image'));
      img.src = previewUrl;
    });
  };

  // Perform search
  const handleFindMatch = async () => {
    if (!selectedFile) return;

    console.log('[VisualSearch] Starting search');
    setStep('scanning');
    setError(null);

    try {
      let fileToSearch = selectedFile;
      if (cropMode === 'crop') {
        console.log('[VisualSearch] extracting cropped image region...');
        fileToSearch = await getCroppedFile();
      }

      console.log('[VisualSearch] ABOUT TO SHOW RESULTS / CALL API');

      const [response] = await Promise.all([
        searchVisualSarees(fileToSearch),
        new Promise((r) => setTimeout(r, 2200)),
      ]);

      console.log('[VisualSearch] response received', response);
      console.log('[VisualSearch] response.results', response?.results);
      console.log('[VisualSearch] is array:', Array.isArray(response?.results));
      console.log('[VisualSearch] result count:', Array.isArray(response?.results) ? response.results.length : 0);

      const incomingResults = Array.isArray(response?.results) ? response.results : [];
      setSearchResults(incomingResults);
      setAnalysis(response?.query || {});

      console.log('[VisualSearch] switching to results');
      setStep('results');
    } catch (err) {
      console.error('[VisualSearch] FINAL ERROR:', err);
      setError('We couldn’t analyse this image. Please try another photo.');
      setStep('error');
    }
  };

  // Backdrop click helper
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Wishlist toggle
  const handleWishlistToggle = (e, saree) => {
    e.stopPropagation();
    toggleWishlist(saree);
    setWishlistState((prev) => ({
      ...prev,
      [saree.id]: isInWishlist(saree.id),
    }));
  };

  // Helper: Resilient product normalizer
  const normalizeProduct = (raw, index) => {
    const product = raw || {};
    let image = '';

    if (typeof product.image === 'string') {
      image = product.image;
    } else if (product.image && typeof product.image === 'object' && typeof product.image.src === 'string') {
      image = product.image.src;
    } else if (typeof product.imageUrl === 'string') {
      image = product.imageUrl;
    } else if (typeof product.thumbnail === 'string') {
      image = product.thumbnail;
    } else if (Array.isArray(product.images) && typeof product.images[0] === 'string') {
      image = product.images[0];
    }

    let price = null;
    if (product.price !== null && product.price !== undefined && product.price !== '') {
      const numericPrice = Number(String(product.price).replace(/[₹,\s]/g, ''));
      price = Number.isFinite(numericPrice) ? numericPrice : null;
    }

    return {
      id: product.id || product.slug || `visual-result-${index}`,
      name: String(product.name || product.title || 'Shloka Saree'),
      image,
      price,
      collection: String(product.collection || ''),
      fabric: String(product.fabric || ''),
      color: String(product.color || ''),
      pattern: String(product.pattern || ''),
      zari: String(product.zari || ''),
      subtitle: String(product.subtitle || ''),
      similarity: Number.isFinite(Number(product.similarity)) ? Number(product.similarity) : 0,
      matchPercentage: product.matchPercentage || Math.round((product.similarity || 0.85) * 100)
    };
  };

  // Helper: Safe product grid card renderer
  const renderSafeProduct = (rawProduct, index) => {
    const saree = normalizeProduct(rawProduct, index);
    const percentage = saree.matchPercentage || Math.round(saree.similarity * 100) || 85;
    const isSaved = wishlistState[saree.id] ?? isInWishlist(saree.id);
    const isFirst = index === 0;

    return (
      <article
        className={`${styles.productCard} ${isFirst ? styles.productCardBestMatch : ''}`}
        key={saree.id}
        onClick={() => {
          onClose();
          onSelectProduct?.(saree);
        }}
      >
        <div className={`${styles.cardImgWrap} ${isFirst ? styles.cardImgWrapBestMatch : ''}`}>
          {saree.image ? (
            <img
              src={saree.image}
              alt={saree.name}
              className={styles.cardImg}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              Shloka
            </div>
          )}

          {percentage > 0 && (
            <span className={`${styles.matchPill} ${isFirst ? styles.matchPillBestMatch : ''}`}>
              {isFirst ? 'Closest Match' : `${percentage}% Match`} • {
                percentage >= 92 ? "Best Match" : percentage >= 85 ? "Very Similar" : "Similar"
              }
            </span>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            className={`${styles.wishlistBtn} ${isSaved ? styles.wishlistBtnSaved : ''}`}
            onClick={(e) => handleWishlistToggle(e, saree)}
            aria-label="Wishlist"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? "#8A1528" : "none"} stroke={isSaved ? "#8A1528" : "#29231F"} strokeWidth="1.8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Stitched Plus Patch Icon */}
          <button
            type="button"
            className={styles.quickAddBtn}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
              onSelectProduct?.(saree);
            }}
            aria-label="Add to bag"
          >
            <img src={plusIconImg} alt="Add" className={styles.plusPatchImg} />
          </button>
        </div>

        <div className={styles.cardInfo}>
          <span className={styles.collectionLabel}>{(saree.collection || 'ATELIER').toUpperCase()}</span>
          <h5 className={styles.productName}>{saree.name}</h5>
          <p className={styles.productDesc}>{saree.subtitle || ''}</p>
          <span className={styles.productPrice}>
            {saree.price !== null
              ? `₹ ${saree.price.toLocaleString('en-IN')}`
              : 'View product'}
          </span>
        </div>
      </article>
    );
  };

  // ── STEP 1: UPLOAD SCREEN ──
  const renderUpload = () => {
    return (
      <div
        className={`${styles.bottomSheet} ${isDragging ? styles.bottomSheetDragging : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dragHandle} aria-hidden="true" />
        <div className={styles.sheetHeader}>
          <div className={styles.sheetLotus}>
            <BloomingLotusIcon width={20} height={14} stroke="#A07F3A" />
          </div>
          <h3 className={styles.sheetTitle}>Search by Image</h3>
          <p className={styles.sheetSubtitle}>
            Upload a look you love. We’ll find similar sarees from Shloka.
          </p>
        </div>

        <div className={styles.optionsList}>
          <button
            type="button"
            className={styles.optionCard}
            onClick={() => cameraInputRef.current?.click()}
            aria-label="Take Photo"
          >
            <div className={styles.optionIconBox}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div className={styles.optionContent}>
              <span className={styles.optionTitle}>Take Photo</span>
              <span className={styles.optionDesc}>Capture a saree, fabric or look</span>
            </div>
            <span className={styles.optionArrow}>›</span>
          </button>

          <button
            type="button"
            className={styles.optionCard}
            onClick={() => galleryInputRef.current?.click()}
            aria-label="Choose from Gallery"
          >
            <div className={styles.optionIconBox}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8893E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className={styles.optionContent}>
              <span className={styles.optionTitle}>Choose from Gallery</span>
              <span className={styles.optionDesc}>Choose an image from your device</span>
            </div>
            <span className={styles.optionArrow}>›</span>
          </button>
        </div>

        <p className={styles.sheetFootnote}>
          JPG, PNG or WEBP • Max 10 MB
        </p>
      </div>
    );
  };

  // ── STEP 2: PREVIEW SCREEN ──
  const renderPreview = () => {
    return (
      <div className={styles.fullscreenView}>
        <div className={styles.viewTopBar}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={resetSearch}
            aria-label="Back"
          >
            ←
          </button>
          <span className={styles.viewTitle}>Find Similar Sarees</span>
          <button
            type="button"
            className={styles.closeViewBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.previewBody}>
          <div className={styles.cropModeToggle}>
            <button
              type="button"
              className={`${styles.cropToggleBtn} ${cropMode === 'original' ? styles.cropToggleBtnActive : ''}`}
              onClick={() => {
                setCropMode('original');
                setZoom(1);
                setPanPosition({ x: 0, y: 0 });
              }}
            >
              Use Original
            </button>
            <button
              type="button"
              className={`${styles.cropToggleBtn} ${cropMode === 'crop' ? styles.cropToggleBtnActive : ''}`}
              onClick={() => setCropMode('crop')}
            >
              Crop Image
            </button>
          </div>

          <div className={`${styles.previewCard} ${cropMode === 'crop' ? styles.previewCardCropActive : ''}`}>
            <div className={styles.previewImgViewport}>
              <img
                src={previewUrl}
                alt="Selected saree preview"
                className={styles.previewImg}
                style={{
                  transform: `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                  transition: 'none',
                  touchAction: cropMode === 'crop' ? 'none' : 'auto'
                }}
                onTouchStart={handleTouchStartCrop}
                onTouchMove={handleTouchMoveCrop}
              />
            </div>
            {cropMode === 'crop' && (
              <div className={styles.cropOverlay} aria-hidden="true">
                <div className={styles.cropTargetBox} />
              </div>
            )}
          </div>

          {cropMode === 'crop' && (
            <div className={styles.zoomControlPanel}>
              <span className={styles.zoomLabel}>Zoom:</span>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={zoom}
                onChange={(e) => {
                  const nextZoom = parseFloat(e.target.value);
                  setZoom(nextZoom);
                  const maxOffset = (nextZoom - 1) * 90;
                  setPanPosition((prev) => ({
                    x: Math.min(Math.max(prev.x, -maxOffset), maxOffset),
                    y: Math.min(Math.max(prev.y, -maxOffset), maxOffset),
                  }));
                }}
                className={styles.zoomSlider}
                aria-label="Adjust crop zoom"
              />
              <span className={styles.zoomValue}>{zoom}x</span>
            </div>
          )}

          <p className={styles.previewDescription}>
            We’ll analyze this look and find similar pieces matching color, weave, pattern, and design aesthetics from Shloka.
          </p>

          <div className={styles.previewActions}>
            <button
              type="button"
              className={styles.changePhotoBtn}
              onClick={resetSearch}
            >
              Choose Another Image
            </button>

            <button
              type="button"
              className={styles.findSimilarBtn}
              onClick={handleFindMatch}
            >
              Find My Match
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── STEP 3: SCANNING SCREEN ──
  const renderScanning = () => {
    return (
      <div className={styles.fullscreenView}>
        <div className={styles.analyzingBody}>
          <div className={styles.scanningCard}>
            <img
              src={previewUrl}
              alt="Analyzing saree"
              className={styles.scanningImg}
              style={{
                transform: cropMode === 'crop' ? `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)` : 'none'
              }}
            />
            <div className={styles.scannerLine} aria-hidden="true" />
          </div>

          <div className={styles.statusBox}>
            <h4 className={styles.analyzingTitle}>Finding your Shloka match…</h4>
            <p className={styles.analyzingSubtitle}>Analysing colour • weave • pattern • border</p>
            
            <div className={styles.lotusProgressGroup}>
              <div className={styles.lotusSpinner}>
                <BloomingLotusIcon width={24} height={16} stroke="#B8893E" />
              </div>
              <p className={styles.statusMessage}>{STATUS_MESSAGES[statusIdx] || 'Processing...'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── STEP 4: RESULTS SCREEN ──
  const renderResults = () => {
    const results = Array.isArray(searchResults) ? searchResults : [];
    
    // Filtering calculations
    let displayedSarees = results;
    let isFilteredEmpty = false;

    if (activeFilter === 'Similar Colour' && analysis) {
      const family = (analysis.dominantColor || analysis.dominant_colors?.[0] || '').toLowerCase();
      if (family) {
        displayedSarees = results.filter((s) =>
          (s.colorFamily && s.colorFamily.toLowerCase().includes(family.split(' ')[0])) || 
          (s.subtitle && s.subtitle.toLowerCase().includes(family.split(' ')[0]))
        );
      }
    } else if (activeFilter === 'Silk') {
      displayedSarees = results.filter((s) => 
        (s.fabric && s.fabric.toLowerCase().includes('silk')) || 
        (s.fabricType && s.fabricType.toLowerCase().includes('silk'))
      );
    } else if (activeFilter === 'Gold Zari') {
      displayedSarees = results.filter((s) => 
        (s.zari && s.zari.toLowerCase().includes('gold')) || 
        (s.zari && s.zari.toLowerCase().includes('24k')) || 
        (s.subtitle && s.subtitle.toLowerCase().includes('zari'))
      );
    } else if (activeFilter === 'Bridal') {
      displayedSarees = results.filter((s) => 
        (s.category && s.category.toLowerCase() === 'bridal') || 
        (s.tags && s.tags.includes('Bridal'))
      );
    }

    if (displayedSarees.length === 0 && results.length > 0) {
      displayedSarees = results;
      isFilteredEmpty = true;
    }

    const hasNoMatches = results.length === 0 || isFilteredEmpty;
    const detectedColorName = analysis?.dominantColor || analysis?.dominant_colors?.[0] || 'Similar Color';
    const detectedTexture = analysis?.textureComplexity || analysis?.fabric_appearance || 'Fine Handloom';

    return (
      <div
        className={styles.resultsScreen}
        data-visual-search-results="true"
      >
        {/* Top Bar */}
        <div className={styles.viewTopBar}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => {
              setSheetOpen(false);
              setStep('preview');
            }}
            aria-label="Back to preview"
          >
            ←
          </button>
          <span className={styles.viewTitle}>MATCHING RESULTS</span>
          <button
            type="button"
            className={styles.closeViewBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.resultsScroll}>
          {/* Inspiration Summary Card */}
          <div className={styles.inspirationSummaryCard}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Your uploaded look"
                className={styles.inspirationThumb}
              />
            )}
            <div className={styles.inspirationInfo}>
              <span className={styles.inspirationLabel}>INSPIRED BY YOUR LOOK</span>
              <p className={styles.inspirationDesc}>
                We found sarees with similar colours, patterns and details.
              </p>
              <button
                type="button"
                className={styles.inspirationChangeBtn}
                onClick={resetSearch}
                aria-label="Choose another image"
              >
                Change Image →
              </button>
            </div>
          </div>

          {/* Editorial Insight Section (Why these match) */}
          {results.length > 0 && !isFilteredEmpty && (
            <div className={styles.editorialInsight}>
              <h5 className={styles.insightHeading}>WHY THESE MATCH YOUR STYLE</h5>
              <ul className={styles.insightList}>
                <li className={styles.insightItem}>
                  <span className={styles.insightDot}>✦</span> Similar {detectedColorName.toLowerCase()} palette
                </li>
                <li className={styles.insightItem}>
                  <span className={styles.insightDot}>✦</span> {detectedTexture === 'Intricate Brocade' ? 'Intricate brocade detailing' : 'Fine handloom texture appearance'}
                </li>
                <li className={styles.insightItem}>
                  <span className={styles.insightDot}>✦</span> Rich silk finish with elegant border structure
                </li>
              </ul>
            </div>
          )}

          {/* Result Heading & Subheading */}
          <div className={styles.resultsHeadingRow}>
            <h4 className={styles.resultsTitle}>SAREES INSPIRED BY YOUR LOOK</h4>
            <span className={styles.matchCount}>{displayedSarees.length} MATCHES</span>
          </div>
          <p className={styles.resultsSubText}>
            Curated from Shloka based on colour, weave and detailing.
          </p>

          {/* Horizontal Filter Chips */}
          <div className={styles.filterChipsScroller}>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={`${styles.filterChip} ${activeFilter === chip ? styles.filterChipActive : ''}`}
                onClick={() => {
                  setActiveFilter(chip);
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* No Match State Notice */}
          {hasNoMatches && (
            <div className={styles.noMatchNotice}>
              <h5 className={styles.noMatchTitle}>We couldn’t find an exact match.</h5>
              <p className={styles.noMatchSubtitle}>
                But these Shloka sarees share a similar mood and colour palette.
              </p>
            </div>
          )}

          {/* 2-Column Grid */}
          <div className={styles.productsGrid}>
            {displayedSarees.map((saree, index) => renderSafeProduct(saree, index))}
          </div>
        </div>
      </div>
    );
  };

  // ── STEP 5: ERROR SCREEN ──
  const renderError = () => {
    return (
      <div
        className={styles.bottomSheet}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dragHandle} aria-hidden="true" />
        <div className={styles.sheetHeader}>
          <h3 className={styles.sheetTitle}>WE COULDN’T ANALYSE THIS IMAGE</h3>
          <p className={styles.sheetSubtitle}>
            {error || 'Please try another photo.'}
          </p>
        </div>

        <div className={styles.errorActions}>
          <button
            type="button"
            className={styles.findSimilarBtn}
            onClick={resetSearch}
          >
            Choose Another Image
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={onClose}
          >
            BROWSE SAREES
          </button>
        </div>
      </div>
    );
  };

  // Component render checks
  if (!visualSearchActive) return null;

  // Single step renderer switch
  const renderCurrentStep = () => {
    switch (step) {
      case 'upload':
        return (
          <div className={styles.overlayBackdrop} onClick={handleBackdropClick}>
            {renderUpload()}
          </div>
        );
      case 'preview':
        return renderPreview();
      case 'scanning':
        return renderScanning();
      case 'results':
        return renderResults();
      case 'error':
        return (
          <div className={styles.overlayBackdrop} onClick={handleBackdropClick}>
            {renderError()}
          </div>
        );
      default:
        console.warn('[VisualSearch] Unknown step:', step);
        return (
          <div className={styles.overlayBackdrop} onClick={handleBackdropClick}>
            {renderUpload()}
          </div>
        );
    }
  };

  // Final Output
  return (
    <VisualSearchErrorBoundary onReset={resetSearch}>
      {renderCurrentStep()}
      {/* Hidden inputs for Camera/Gallery */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hiddenInput}
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleSelectedFile(file);
          e.target.value = '';
        }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className={styles.hiddenInput}
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleSelectedFile(file);
          e.target.value = '';
        }}
      />
    </VisualSearchErrorBoundary>
  );
}
