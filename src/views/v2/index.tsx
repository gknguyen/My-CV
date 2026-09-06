import { domAnimation, LazyMotion } from 'framer-motion';
import { useEffect } from 'react';
import { About } from './components/about';
import { BackToTop } from './components/back-to-top';
import { CertificateTabs } from './components/certificates/certificates-tabs';
import { ExperienceTabs } from './components/experience/experience-tabs';
import { Header } from './components/header';
import { Overview } from './components/overview';
import { useActiveSection } from './common/useActiveSection';
import { useDarkMode } from './common/useDarkMode';
import './style.css';

export const V2: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const activeSection = useActiveSection();

  useEffect(() => {
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div id="version-2">
        <Header isDark={isDark} onToggleDark={toggle} activeSection={activeSection} />
        <BackToTop />

        <div className="-mt-10 overflow-x-hidden">
          <Overview />
          <About />
          <ExperienceTabs />
          <CertificateTabs />
        </div>
      </div>
    </LazyMotion>
  );
};
