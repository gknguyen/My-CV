import { lazy } from 'react';
import { profile } from '../../data/profile';
import { RenderOnViewportEntry } from '../../shared/lazy-load';
import './style.css';

const Overview = lazy(() => import('./components/overview').then((m) => ({ default: m.Overview })));
const About = lazy(() => import('./components/about').then((m) => ({ default: m.About })));
const Experience = lazy(() =>
  import('./components/experience').then((m) => ({ default: m.Experience })),
);

export const V2: React.FC = () => {
  return (
    <>
      <RenderOnViewportEntry threshold={0.25} className="h-screen">
        <Overview />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry threshold={0.25} className="h-screen">
        <About />
      </RenderOnViewportEntry>

      {profile.experiences.map((exp) => (
        <RenderOnViewportEntry key={exp.title} threshold={0.25} className="h-screen">
          <Experience exp={exp} />
        </RenderOnViewportEntry>
      ))}
    </>
  );
};
