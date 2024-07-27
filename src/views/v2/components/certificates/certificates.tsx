import { useEffect, useState } from 'react';
import { CertificatesType } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { Card, CardBody, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '../../common/components';
import { AwsRoadmap } from './aws-roadmap';

interface IProps {
  cert: CertificatesType;
}

export const Certificates: React.FC<IProps> = (props) => {
  const [tabValue, setTabValue] = useState(props.cert.list[0].name);
  const [isShowing1, setIsShowing1] = useState(false);

  useEffect(() => {
    setIsShowing1(true);
  }, []);

  return (
    <Card
      className={cn(
        'sm:w-screen md:w-[48rem]',
        'transition-opacity duration-1000',
        isShowing1 ? 'opacity-100' : 'opacity-0',
      )}
      placeholder=""
    >
      <CardBody placeholder="" className="grid gap-4">
        {props.cert.key === 'aws' ? (
          <AwsRoadmap certs={props.cert.list} />
        ) : (
          <Tabs value={tabValue}>
            <TabsHeader placeholder="" className="overflow-y-auto">
              {props.cert.list.map((cert) => (
                <Tab
                  placeholder=""
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
                  <img
                    alt="certificate"
                    src={cert.image}
                    className={cn(cert.link ? 'hover:cursor-pointer' : undefined)}
                    onClick={() => {
                      if (cert.link) window.open(cert.link, '_blank');
                    }}
                  />
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        )}
      </CardBody>
    </Card>
  );
};
