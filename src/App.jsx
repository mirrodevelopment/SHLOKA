import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Hero from './sections/Hero/Hero';
import TheCollection from './sections/TheCollection/TheCollection';
import TheStory from './sections/TheStory/TheStory';
import TheCraft from './sections/TheCraft/TheCraft';
import FeaturedSarees from './sections/FeaturedSarees/FeaturedSarees';
import TheJournal from './sections/TheJournal/TheJournal';
import BoutiqueSection from './sections/BoutiqueSection/BoutiqueSection';
import FooterSection from './sections/FooterSection/FooterSection';
import LoginPage from './pages/LoginPage/LoginPage';
import CartDrawer from './components/CartDrawer/CartDrawer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import MobileTopHeader from './components/MobileTopHeader/MobileTopHeader';
import MobileBottomNav from './components/MobileBottomNav/MobileBottomNav';
import MobileSearchScreen from './components/MobileSearchScreen/MobileSearchScreen';
import MobileCartScreen from './components/MobileCartScreen/MobileCartScreen';
import MobileWishlistScreen from './components/MobileWishlistScreen/MobileWishlistScreen';
import MobileProfileScreen from './components/MobileProfileScreen/MobileProfileScreen';
import MobileProductModal from './components/MobileProductModal/MobileProductModal';
import { getActivePatron } from './utils/auth';
import useSmoothScroll from './hooks/useSmoothScroll';
import useHeroAnimation from './hooks/useHeroAnimation';
import useMouseParallax from './hooks/useMouseParallax';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPatron, setCurrentPatron] = useState(() => getActivePatron());
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

  const heroRef = useRef(null);
  const collectionRef = useRef(null);
  const storyRef = useRef(null);
  const craftRef = useRef(null);
  const featuredSareesRef = useRef(null);
  const journalRef = useRef(null);
  const boutiqueRef = useRef(null);
  const footerRef = useRef(null);

  // Sync active patron on mount
  useEffect(() => {
    setCurrentPatron(getActivePatron());
  }, []);

  // Track window resize for responsive mobile checks
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check URL hash for #login, #signin, #cart, or #bag
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash;
      if (h === '#login' || h === '#signin' || h === '#account') {
        setIsAuthOpen(true);
      } else if (h === '#cart' || h === '#bag') {
        if (window.innerWidth <= 768) {
          setActiveMobileTab('bag');
        } else {
          setIsCartOpen(true);
        }
      } else if (h === '#search') {
        if (window.innerWidth <= 768) {
          setActiveMobileTab('search');
        }
      } else if (h === '#wishlist') {
        if (window.innerWidth <= 768) {
          setActiveMobileTab('wishlist');
        }
      } else if (h === '#profile') {
        if (window.innerWidth <= 768) {
          setActiveMobileTab('profile');
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parallax layer config
  const parallaxLayers = useMemo(() => [
    { selector: '[data-parallax-layer="background"]', factor: 0.15, maxMove: 5 },
    { selector: '[data-hero-arch-container]', factor: 0.3, maxMove: 3 },
  ], []);

  // Initialize mouse parallax
  const { activate: activateParallax } = useMouseParallax(heroRef, parallaxLayers);

  // Callback when entrance timeline reaches the parallax activation point
  const onParallaxReady = useCallback(() => {
    activateParallax();
  }, [activateParallax]);

  // Initialize smooth scroll (Lenis + GSAP)
  useSmoothScroll();

  // Initialize hero entrance animation
  useHeroAnimation(heroRef, onParallaxReady);

  // Initialize master Framer-style scroll transitions across all sections from Hero to Footer
  useScrollAnimations({
    heroRef,
    collectionRef,
    storyRef,
    craftRef,
    featuredSareesRef,
    journalRef,
    boutiqueRef,
    footerRef,
  });

  return (
    <>
      <CustomCursor />

      {/* Mobile-Only Premium Top Header (<= 768px) */}
      <MobileTopHeader
        onOpenSearch={() => setActiveMobileTab('search')}
        onOpenProfile={() => setActiveMobileTab('profile')}
        onOpenBag={() => setActiveMobileTab('bag')}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectTab={(tab) => {
          setActiveMobileTab(tab);
          if (tab === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        currentPatron={currentPatron}
        activeMobileTab={activeMobileTab}
      />

      {/* Main Website Sections (Desktop always visible, Mobile visible when Home tab is active) */}
      <main className={activeMobileTab !== 'home' ? 'mainHiddenOnMobile' : ''}>
        <Hero
          ref={heroRef}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenCart={() => {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
              setActiveMobileTab('bag');
            } else {
              setIsCartOpen(true);
            }
          }}
          currentPatron={currentPatron}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onSelectTab={(tab) => {
            setActiveMobileTab(tab);
            if (tab === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
        <TheCollection ref={collectionRef} />
        <TheStory ref={storyRef} />
        <TheCraft ref={craftRef} />
        <FeaturedSarees
          ref={featuredSareesRef}
          onSelectProduct={(product) => {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
              setSelectedProduct(product);
            } else {
              setIsCartOpen(true);
            }
          }}
        />
        <TheJournal ref={journalRef} />
        <BoutiqueSection ref={boutiqueRef} />
        <FooterSection ref={footerRef} />
      </main>

      {/* Dedicated Mobile Screens (Scoped strictly to Mobile via .mobileOnlyView) */}
      {(activeMobileTab === 'search' || activeMobileTab === 'shop') && (
        <div className="mobileOnlyView">
          <MobileSearchScreen
            onBack={() => setActiveMobileTab('home')}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        </div>
      )}

      {activeMobileTab === 'bag' && (
        <div className="mobileOnlyView">
          <MobileCartScreen
            onBack={() => setActiveMobileTab('home')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onExplore={() => setActiveMobileTab('home')}
            onOpenProfile={() => setActiveMobileTab('profile')}
            currentPatron={currentPatron}
          />
        </div>
      )}

      {activeMobileTab === 'wishlist' && (
        <div className="mobileOnlyView">
          <MobileWishlistScreen
            onBack={() => setActiveMobileTab('home')}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onExplore={() => setActiveMobileTab('shop')}
          />
        </div>
      )}

      {activeMobileTab === 'profile' && (
        <div className="mobileOnlyView">
          <MobileProfileScreen
            onBack={() => setActiveMobileTab('home')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectTab={(tab) => setActiveMobileTab(tab)}
            currentPatron={currentPatron}
          />
        </div>
      )}

      {/* Full-Height Product Detail Sheet */}
      {selectedProduct && (
        <div className="mobileOnlyView">
          <MobileProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOpenBag={() => {
              setSelectedProduct(null);
              setActiveMobileTab('bag');
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToWeave={() => {
              setSelectedProduct(null);
              setActiveMobileTab('home');
              setTimeout(() => {
                const el = document.getElementById('craft');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 120);
            }}
          />
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (<= 768px) */}
      <MobileBottomNav
        activeTab={activeMobileTab}
        onSelectTab={(tab) => {
          setActiveMobileTab(tab);
          if (tab === 'home' && activeMobileTab === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Luxury Authentication Modal / Page */}
      <LoginPage
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          if (window.location.hash === '#login' || window.location.hash === '#signin' || window.location.hash === '#account') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        onLoginSuccess={(patron) => {
          setCurrentPatron(patron);
        }}
      />

      {/* Luxury Animated Atelier Cart Drawer (Desktop) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          if (window.location.hash === '#cart' || window.location.hash === '#bag') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        onOpenAuth={() => {
          setIsCartOpen(false);
          setIsAuthOpen(true);
        }}
        currentPatron={currentPatron}
      />
    </>
  );
}
