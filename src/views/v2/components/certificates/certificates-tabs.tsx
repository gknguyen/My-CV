import { lazy, Suspense, useState } from 'react';
import { CertificatesType, profile } from '../../../../data/profile';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';

const Certificates = lazy(() =>
  import('./certificates').then((m) => ({ default: m.Certificates })),
);

export const CertificateTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(profile.certificates[0].key);
  const [tabContent, setTabContent] = useState<CertificatesType>(profile.certificates[0]);

  return (
    <div id="certificates" className="h-screen grid content-center justify-center">
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

        <TabsBody placeholder="" style={{ minHeight: 780 }}>
          <TabPanel key={tabContent.key} value={tabContent.key} className="p-0">
            <Suspense fallback={<></>}>
              <Certificates cert={tabContent} />
            </Suspense>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
