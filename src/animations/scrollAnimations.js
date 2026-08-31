import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SHLOKA — High-Performance Cinematic Scroll Animation Engine
 * Ultra-smooth, 60fps GPU-composited motion with zero frame-drops.
 * Uses hardware-accelerated transforms (translate, scale, opacity) exclusively.
 */
export function createFramerScrollTransitions(sectionRefs = {}) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) return null;

  const {
    heroRef,
    collectionRef,
    storyRef,
    craftRef,
    featuredSareesRef,
    journalRef,
    boutiqueRef,
    footerRef,
  } = sectionRefs;

  const ctx = gsap.context(() => {
    // ═════════════════════════════════════════════════════════════════
    // SHARED UTILITY: Fast GPU Divider Line Expansion
    // ═════════════════════════════════════════════════════════════════
    function animateDividers(sec) {
      const lines = sec.querySelectorAll(
        '[class*="divLine"], [class*="flourishLine"], [class*="qLine"], [class*="flourishLineShort"], [class*="categoryLine"], [class*="needleLine"], [class*="cardDivLine"]'
      );
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      const dots = sec.querySelectorAll(
        '[class*="divDot"], [class*="flourishDiamond"], [class*="flourishDot"], [class*="cardDivDot"]'
      );
      if (dots.length > 0) {
        gsap.fromTo(
          dots,
          { scale: 0, rotation: -45, transformOrigin: 'center center' },
          {
            scale: 1,
            rotation: 0,
            duration: 0.45,
            stagger: 0.03,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }

    // ═════════════════════════════════════════════════════════════════
    // 1. HERO SECTION
    // ═════════════════════════════════════════════════════════════════
    if (heroRef?.current) {
      const hero = heroRef.current;
      const bgImg = hero.querySelector('[data-hero-bg]');
      const scrollIndicator = hero.querySelector('[data-scroll-indicator]');

      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 10,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '15% top',
            scrub: true,
          },
        });
      }
    }

    // ═════════════════════════════════════════════════════════════════
    // 2. THE COLLECTION (CHAPTER I)
    // ═════════════════════════════════════════════════════════════════
    if (collectionRef?.current) {
      const sec = collectionRef.current;
      const artwork = sec.querySelector('[class*="palaceArtworkImg"]');
      const headerTexts = sec.querySelectorAll('[data-col-header]');
      const cards = sec.querySelectorAll('[class*="card"]');
      const sideBotanicals = sec.querySelectorAll('[class*="sideBotanical"]');

      if (artwork) {
        gsap.fromTo(
          artwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (headerTexts.length > 0) {
        gsap.fromTo(
          headerTexts,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec.querySelector('[class*="grid"]') || sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (sideBotanicals.length > 0) {
        gsap.fromTo(
          sideBotanicals,
          { opacity: 0, x: (i) => (i === 0 ? -25 : 25) },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 3. THE STORY (CHAPTER II)
    // ═════════════════════════════════════════════════════════════════
    if (storyRef?.current) {
      const sec = storyRef.current;
      const storyArtwork = sec.querySelector('[class*="storyArtworkImg"]');
      const textNodes = sec.querySelectorAll('[data-story-text]');
      const storyImage = sec.querySelector('[class*="storyImage"]');
      const quoteText = sec.querySelector('[class*="quoteText"]');

      if (storyArtwork) {
        gsap.fromTo(
          storyArtwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (storyImage) {
        gsap.fromTo(
          storyImage,
          { scale: 1.04 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      if (quoteText) {
        gsap.fromTo(
          quoteText,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quoteText,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 4. THE CRAFT (CHAPTER III) - Desktop Only (Mobile scroll animations disabled)
    // ═════════════════════════════════════════════════════════════════
    if (craftRef?.current && window.innerWidth > 768) {
      const sec = craftRef.current;
      const craftArtwork = sec.querySelector('[class*="craftArtworkImg"]');
      const textNodes = sec.querySelectorAll('[data-craft-text]');
      const leftCard = sec.querySelector('[class*="leftCard"]');
      const rightImageFrame = sec.querySelector('[class*="rightImageFrame"]');
      const craftImage = sec.querySelector('[class*="craftImage"]');

      if (craftArtwork) {
        gsap.fromTo(
          craftArtwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (leftCard) {
        gsap.fromTo(
          leftCard,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftCard,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (rightImageFrame) {
        gsap.fromTo(
          rightImageFrame,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightImageFrame,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (craftImage) {
        gsap.fromTo(
          craftImage,
          { scale: 1.04 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 5. FEATURED SAREES (THE CURATION)
    // ═════════════════════════════════════════════════════════════════
    if (featuredSareesRef?.current && window.innerWidth > 768) {
      const sec = featuredSareesRef.current;
      const sareeArtwork = sec.querySelector('[class*="sareeArtworkImg"]');
      const textNodes = sec.querySelectorAll('[data-saree-text]');
      const sareeCards = sec.querySelectorAll('[class*="card"]');
      const exploreBtnLink = sec.querySelector('[class*="exploreBtnLink"]');

      if (sareeArtwork) {
        gsap.fromTo(
          sareeArtwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (sareeCards.length > 0) {
        gsap.fromTo(
          sareeCards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec.querySelector('[class*="grid"]') || sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (exploreBtnLink) {
        gsap.fromTo(
          exploreBtnLink,
          { y: 16, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: exploreBtnLink,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 6. THE JOURNAL (CHAPTER IV)
    // ═════════════════════════════════════════════════════════════════
    if (journalRef?.current && window.innerWidth > 768) {
      const sec = journalRef.current;
      const artwork = sec.querySelector('[class*="journalArtworkImg"]');
      const textNodes = sec.querySelectorAll('[data-journal-text]');
      const heroCard = sec.querySelector('[class*="heroCard"]');
      const splitCards = sec.querySelectorAll('[class*="splitCard"]');
      const viewAllBtn = sec.querySelector('[class*="viewAllBtnLink"]');

      if (artwork) {
        gsap.fromTo(
          artwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (heroCard) {
        if (window.innerWidth > 768) {
          gsap.fromTo(
            heroCard,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: heroCard,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        } else {
          gsap.set(heroCard, { x: 0, opacity: 1 });
        }
      }

      if (splitCards.length > 0) {
        if (window.innerWidth > 768) {
          gsap.fromTo(
            splitCards,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.09,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: splitCards[0],
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        } else {
          gsap.set(splitCards, { x: 0, opacity: 1 });
        }
      }

      if (viewAllBtn) {
        gsap.fromTo(
          viewAllBtn,
          { y: 16, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: viewAllBtn,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 7. BOUTIQUE SECTION (THE HOUSE)
    // ═════════════════════════════════════════════════════════════════
    if (boutiqueRef?.current && window.innerWidth > 768) {
      const sec = boutiqueRef.current;
      const visitArtwork = sec.querySelector('[class*="visitShlokaArtworkImg"]');
      const textNodes = sec.querySelectorAll('[data-house-text]');
      const archContainer = sec.querySelector('[class*="archVisualContainer"]');
      const needleDivider = sec.querySelector('[class*="verticalNeedleDivider"]');
      const detailsCard = sec.querySelector('[class*="houseDetailsCard"]');
      const rightLeaf = sec.querySelector('[class*="houseRightLeafImg"]');

      if (visitArtwork) {
        gsap.fromTo(
          visitArtwork,
          { y: 25, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (archContainer) {
        gsap.fromTo(
          archContainer,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: archContainer,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (needleDivider) {
        gsap.fromTo(
          needleDivider,
          { scaleY: 0, transformOrigin: 'center top', opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: needleDivider,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (detailsCard) {
        gsap.fromTo(
          detailsCard,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsCard,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (rightLeaf) {
        gsap.to(rightLeaf, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sec,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      animateDividers(sec);
    }

    // ═════════════════════════════════════════════════════════════════
    // 8. FOOTER SECTION (THE EPILOGUE)
    // ═════════════════════════════════════════════════════════════════
    if (footerRef?.current) {
      const sec = footerRef.current;
      const textNodes = sec.querySelectorAll('[data-ftr-text]');
      const archContainer = sec.querySelector('[class*="archFrameContainer"]');
      const navBar = sec.querySelector('[class*="navBar"]');
      const brandSignature = sec.querySelector('[class*="brandSignature"]');
      const bottomBar = sec.querySelector('[class*="bottomBar"]');

      if (textNodes.length > 0) {
        gsap.fromTo(
          textNodes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (navBar) {
        const navLinks = navBar.querySelectorAll('a');
        if (navLinks.length > 0) {
          gsap.fromTo(
            navLinks,
            { y: 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: navBar,
                start: 'top 90%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      if (brandSignature) {
        gsap.fromTo(
          brandSignature,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: brandSignature,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (bottomBar) {
        gsap.fromTo(
          bottomBar,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomBar,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      animateDividers(sec);
    }
  });

  return ctx;
}
