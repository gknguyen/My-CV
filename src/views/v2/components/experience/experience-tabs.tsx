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
          className="sm:w-screen md:w-[48rem] bg-transparent px-3 mb-[-10px]"
        >
          {profile.experiences.map((exp) => (
            <Tab
              placeholder=""
              className="w-28 bg-opacity-60 bg-blue-gray-50 rounded-lg"
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
          style={{ minHeight: isSm ? 560 : 612 }}
        >
          <TabPanel key={tabContent.key} value={tabContent.key} className="p-0">
            <Suspense fallback={null}>
              <Experience exp={tabContent} />
            </Suspense>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
