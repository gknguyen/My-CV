import { motion, useInView } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import { CertificatesType } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { Card, CardBody, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';
import { AwsRoadmap } from './aws-roadmap';

interface IProps {
  cert: CertificatesType;
}

const fadeUpVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, type: 'spring' as const } },
};

export const Certificates: FC<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [tabValue, setTabValue] = useState(props.cert.list[0].name);

  return (
    <motion.div
      ref={ref}
      className={cn('sm:w-screen md:w-[48rem]', 'rounded-xl overflow-hidden', 'v2-card-wrapper')}
      variants={fadeUpVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Card className="sm:w-screen md:w-[48rem] v2-card" placeholder="">
        <CardBody placeholder="" className="grid gap-4">
          {props.cert.key === 'aws' ? (
            <AwsRoadmap certs={props.cert.list} />
          ) : (
            <Tabs value={tabValue}>
              <TabsHeader
                placeholder=""
                className="overflow-auto"
                indicatorProps={{ className: 'v2-tab-indicator' }}
              >
                {props.cert.list.map((cert) => (
                  <Tab
                    placeholder=""
                    className={cn(tabValue === cert.name ? 'text-white' : undefined)}
                    key={cert.name}
                    value={cert.name}
                    onClick={() => setTabValue(cert.name)}
                  >
                    {cert.name.toLocaleUpperCase()}
                  </Tab>
                ))}
              </TabsHeader>

              <TabsBody placeholder="">
                {props.cert.list.map((cert) => (
                  <TabPanel key={cert.name} value={cert.name} className="grid justify-items-center">
                    <a href={cert.link} target="_blank" rel="noreferrer">
                      <img
                        alt="certificate"
                        src={cert.image}
                        className={cn(cert.link ? 'hover:cursor-pointer' : undefined)}
                      />
                    </a>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};
