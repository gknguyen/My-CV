import { About } from './components/about';
import { CertificateTabs } from './components/certificates/certificates-tabs';
import { ExperienceTabs } from './components/experience/experience-tabs';
import { Header } from './components/header';
import { Overview } from './components/overview';
import './style.css';

export const V2: React.FC = () => {
  return (
    <div id="version-2">
      <Header />

      <div className="-mt-10 overflow-x-hidden">
        <Overview />
        <About />
        <ExperienceTabs />
        <CertificateTabs />
      </div>
    </div>
  );
};
