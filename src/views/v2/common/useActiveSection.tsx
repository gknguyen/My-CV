import { useEffect, useState } from 'react';

const SECTION_IDS = ['overview', 'about', 'experiences', 'certificates'];

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return activeSection;
}
