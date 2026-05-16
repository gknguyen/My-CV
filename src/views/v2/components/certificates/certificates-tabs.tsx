import { motion } from 'framer-motion';
import { AnimatePresence } from '../../common/animate-presence';
import { FC, lazy, Suspense, useState } from 'react';
import { CertificatesType, profile } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { useBreakpoint } from '../../../../shared/hooks/useBreakpoint';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';

const Certificates = lazy(() =>
  import('./certificates').then((m) => ({ default: m.Certificates })),
);

export const CertificateTabs: FC = () => {
  const [tabValue, setTabValue] = useState(profile.certificates[0].key);
  const [tabContent, setTabContent] = useState<CertificatesType>(profile.certificates[0]);

  const { isSm } = useBreakpoint();

  return (
    <div
      id="certificates"
      className={cn('grid content-center justify-center', 'h-auto min-h-screen')}
    >
      <Tabs value={tabValue}>
        <TabsHeader
          placeholder=""
          className="sm:w-screen md:w-[48rem] px-3 mb-[-10px]"
          indicatorProps={{ className: 'v2-tab-indicator' }}
        >
          {profile.certificates.map((exp) => (
            <Tab
              placeholder=""
              className="w-28 rounded-lg"
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

        <TabsBody placeholder="" style={{ minHeight: isSm ? 715 : 665, overflow: 'hidden' }}>
          <TabPanel key={tabContent.key} value={tabContent.key} className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={tabValue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Suspense fallback={null}>
                  <Certificates cert={tabContent} />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
