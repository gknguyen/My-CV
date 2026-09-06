import { m } from 'framer-motion';
import { AnimatePresence } from '../../common/animate-presence';
import { FC, lazy, Suspense, useState } from 'react';
import { ExperienceType, profile } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { useBreakpoint } from '../../../../shared/hooks/useBreakpoint';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';

const Experience = lazy(() => import('./experience').then((m) => ({ default: m.Experience })));

export const ExperienceTabs: FC = () => {
  const [tabValue, setTabValue] = useState(profile.experiences[0].key);
  const [tabContent, setTabContent] = useState<ExperienceType>(profile.experiences[0]);

  const { isSm } = useBreakpoint();

  return (
    <div
      id="experiences"
      className={cn('grid content-center justify-center relative', 'h-auto min-h-screen')}
    >
      <Tabs value={tabValue} className="overflow-visible">
        <TabsHeader
          placeholder=""
          className="sm:w-screen md:w-[48rem] px-3 mb-[-10px] overflow-x-auto"
          indicatorProps={{ className: 'v2-tab-indicator' }}
        >
          {profile.experiences.map((exp) => (
            <Tab
              placeholder=""
              className={cn('w-28 rounded-lg', tabValue === exp.key ? 'text-white' : undefined)}
              key={exp.key}
              value={exp.key}
              onClick={() => {
                setTabValue(exp.key);
                setTabContent(exp);
              }}
            >
              {exp.key.toLocaleUpperCase()}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody
          placeholder=""
          className="overflow-visible"
          style={{ minHeight: isSm ? 560 : 660 }}
        >
          <TabPanel key={tabContent.key} value={tabContent.key} className="p-0">
            <AnimatePresence mode="wait">
              <m.div
                key={tabValue}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Suspense fallback={null}>
                  <Experience exp={tabContent} />
                </Suspense>
              </m.div>
            </AnimatePresence>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
