import { motion } from 'framer-motion';
import { FC } from 'react';
import { APPLICATION_ARCHITECT } from '../../../../data/aws-roadmap';
import { cn } from '../../../../shared/helper';
import { Typography } from '../../common/components';
import { CustomLink } from '../../common/customLink';
import { ArrowRightIcon, PlusIcon } from '../../common/icon/solid';

interface IProps {
  certs: {
    name: string;
    isShow: boolean;
    isPopup: boolean;
    link?: string;
    image: string;
  }[];
}

export const AwsRoadmap: FC<IProps> = (props) => {
  return (
    <div>
      <Typography
        placeholder=""
        variant="h5"
        color="blue-gray"
        className="mb-2 sm:text-center md:text-left dark:text-slate-100"
      >
        {APPLICATION_ARCHITECT.title}
      </Typography>

      <div className="flex sm:flex-wrap md:flex-nowrap justify-center sm:gap-2 md:gap-0 my-6">
        {APPLICATION_ARCHITECT.certs.map((cert, index) => {
          const validCert = props.certs.find((ce) => ce.image === cert.image);
          return (
            <div key={cert.title} className="flex">
              {!!index && <ArrowRightIcon className="sm:hidden md:block w-8" />}
              <motion.div
                whileHover={validCert ? { scale: 1.08 } : {}}
                whileTap={validCert ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <a href={validCert?.link} target="_blank" rel="noreferrer">
                  <img
                    alt={cert.title}
                    src={cert.image}
                    className={cn('h-40', validCert ? 'hover:cursor-pointer' : 'grayscale')}
                  />
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="border"></div>

      <div className="flex sm:flex-wrap md:flex-nowrap justify-center sm:gap-2 md:gap-0 my-6">
        {APPLICATION_ARCHITECT.addons.map((cert, index) => {
          const validCert = props.certs.find((ce) => ce.image === cert.image);
          return (
            <div key={cert.title} className="flex">
              {!!index && <PlusIcon className="sm:hidden md:block w-[27px]" />}
              <motion.div
                whileHover={validCert ? { scale: 1.08 } : {}}
                whileTap={validCert ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <a href={validCert?.link} target="_blank" rel="noreferrer">
                  <img
                    alt={cert.title}
                    src={cert.image}
                    className={cn('h-40', validCert ? 'hover:cursor-pointer' : 'grayscale')}
                  />
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="sm:text-center md:text-left">
        For more detail: <CustomLink link="https://aws.amazon.com/certification" />
      </div>
    </div>
  );
};
