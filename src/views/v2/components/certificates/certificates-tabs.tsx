import { FC, lazy, Suspense, useState } from 'react';
import { CertificatesType, profile } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';

const Certificates = lazy(() =>
  import('./certificates').then((m) => ({ default: m.Certificates })),
);

export const CertificateTabs: FC = () => {
  const [tabValue, setTabValue] = useState(profile.certificates[0].key);
  const [tabContent, setTabContent] = useState<CertificatesType>(profile.certificates[0]);

  return (
    <div
      id="certificates"
      className={cn('grid content-center justify-center', 'h-auto min-h-screen')}
    >
      <Tabs value={tabValue}>
        <TabsHeader
          placeholder=""
          className="sm:w-screen md:w-[48rem] bg-transparent px-3 mb-[-10px]"
        >
          {profile.certificates.map((exp) => (
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
            <Suspense fallback={null}>
              <Certificates cert={tabContent} />
            </Suspense>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
