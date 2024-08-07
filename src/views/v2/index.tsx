import { lazy } from 'react';
import { RenderOnViewportEntry } from '../../shared/lazy-load';
import { CertificateTabs } from './components/certificates/certificates-tabs';
import { Header } from './components/header';
import './style.css';

const Overview = lazy(() => import('./components/overview').then((m) => ({ default: m.Overview })));
const About = lazy(() => import('./components/about').then((m) => ({ default: m.About })));
const ExperienceTabs = lazy(() =>
  import('./components/experience/experience-tabs').then((m) => ({ default: m.ExperienceTabs })),
);

export const V2: React.FC = () => {
  return (
    <>
      <Header />

      <div className="-mt-10">
        <RenderOnViewportEntry threshold={0.25} className="h-screen">
          <Overview />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry threshold={0.25} className="h-screen">
          <About />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry threshold={0.25} className="h-screen">
          <ExperienceTabs />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry threshold={0.25} className="h-screen">
          <CertificateTabs />
        </RenderOnViewportEntry>
      </div>
    </>
  );
};
