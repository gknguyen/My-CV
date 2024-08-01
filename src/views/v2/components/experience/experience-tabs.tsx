import { lazy, Suspense, useState } from 'react';
import { ExperienceType, profile } from '../../../../data/profile';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';

const Experience = lazy(() => import('./experience').then((m) => ({ default: m.Experience })));

export const ExperienceTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(profile.experiences[0].key);
  const [tabContent, setTabContent] = useState<ExperienceType>(profile.experiences[0]);

  return (
    <div id="experiences" className="h-screen grid content-center justify-center">
      <Tabs value={tabValue}>
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

        <TabsBody placeholder="" style={{ minHeight: 680 }}>
          <TabPanel key={tabContent.key} value={tabContent.key} className="p-0">
            <Suspense fallback={<></>}>
              <Experience exp={tabContent} />
            </Suspense>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
