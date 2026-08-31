import { useEffect, useRef } from 'react';
import { createFramerScrollTransitions } from '../animations/scrollAnimations';

export function useScrollAnimations(sectionRefs = {}) {
  const ctxRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctxRef.current = createFramerScrollTransitions(sectionRefs);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [
    sectionRefs.heroRef,
    sectionRefs.collectionRef,
    sectionRefs.storyRef,
    sectionRefs.craftRef,
    sectionRefs.featuredSareesRef,
    sectionRefs.journalRef,
    sectionRefs.boutiqueRef,
    sectionRefs.footerRef,
  ]);

  return ctxRef;
}
