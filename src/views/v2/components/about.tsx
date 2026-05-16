import { motion, useInView } from 'framer-motion';
import { FC, useRef } from 'react';
import { profile } from '../../../data/profile';
import { cn, isUrl } from '../../../shared/helper';
import { Avatar, Card, CardBody, Typography } from '../common/components';
import { CustomLink } from '../common/customLink';

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
    <div id="about" className={cn('grid content-center justify-center', 'h-auto min-h-screen')}>
      <motion.div
        ref={ref}
        className={cn('sm:w-screen md:w-[48rem]', 'rounded-xl overflow-hidden', 'v2-card-wrapper')}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Card className="sm:w-screen md:w-[48rem] v2-card" placeholder="">
          <CardBody placeholder="" className="grid sm:grid-cols-1 md:grid-cols-3">
            <motion.div
              className="sm:hidden md:block"
              variants={slideLeftVariant}
              whileHover={{ scale: 1.02 }}
            >
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

                <Typography placeholder="" className="mb-3 dark:text-slate-100">
                  Some fun projects that i have made
                </Typography>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
                  {[profile.projects[0], profile.projects[1]].map((proj, index) => (
                    <motion.div
                      key={`${index}-${proj.title}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="p-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/60"
                    >
                      <span className="text-sm font-semibold dark:text-white leading-tight">
                        {proj.title}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2">
                        {isUrl(proj.descriptions[0]) ? (
                          <CustomLink link={proj.descriptions[0]} notDisplayProtocol />
                        ) : (
                          proj.descriptions[0]
                        )}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};
