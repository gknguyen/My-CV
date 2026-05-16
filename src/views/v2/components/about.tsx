import { motion, useInView } from 'framer-motion';
import { FC, useRef } from 'react';
import { profile } from '../../../data/profile';
import { cn } from '../../../shared/helper';
import { Avatar, Card, CardBody, Typography } from '../common/components';
import { CustomLink } from '../common/customLink';

const projectLinks = ['https://travel-guide.gknguyen.com', 'https://dynamic-qr-code.gknguyen.com'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

export const About: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      id="about"
      className={cn('grid content-center justify-center', 'h-auto min-h-screen')}
    >
      <motion.div
        ref={ref}
        className={cn('sm:w-screen md:w-[48rem]', 'rounded-xl overflow-hidden', 'v2-card-wrapper')}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Card className="sm:w-screen md:w-[48rem] v2-card" placeholder="">
          <CardBody placeholder="" className="grid sm:grid-cols-1 md:grid-cols-3">
            <motion.div className="sm:hidden md:block" variants={slideLeftVariant}>
              <Avatar
                placeholder=""
                src="/images/coffee-chill.jpeg"
                alt="avatar"
                variant="rounded"
                className="w-60 h-60"
              />
            </motion.div>

            <div className="col-span-2 gap-2 pl-8">
              <motion.div variants={fadeUpVariant}>
                <Typography
                  placeholder=""
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 dark:text-slate-100"
                >
                  ABOUT ME
                </Typography>
              </motion.div>

              <motion.div variants={slideRightVariant}>
                {profile.about.map((ele) => (
                  <Typography key={ele} placeholder="" className="mb-2 dark:text-slate-100">
                    {ele}
                  </Typography>
                ))}

                <Typography placeholder="" className="dark:text-slate-100">
                  Some fun projects that i have made
                </Typography>
                <ul className="flex flex-col list-disc">
                  {projectLinks.map((link) => (
                    <li key={link} className="ml-5">
                      <CustomLink link={link} notDisplayProtocol />
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};
