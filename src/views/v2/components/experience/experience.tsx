import { motion, useInView } from 'framer-motion';
import { FC, useCallback, useRef, useState } from 'react';
import { ExperienceType } from '../../../../data/profile';
import { cn, highlightAchievement } from '../../../../shared/helper';
import { Card, CardBody, Typography } from '../../common/components';
import { ExperienceDetailDialog, ExperienceDetailType } from './experience-detail-dialog';
import { ExperienceProjectsPagination } from './experience-projects-pagination';

interface IProps {
  exp: ExperienceType;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

export const Experience: FC<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [isShowExpDetail, setIsShowExpDetail] = useState(false);
  const [selectedExpDetail, setSelectedExpDetail] = useState<ExperienceDetailType | null>(null);

  const onOpenExpDetail = useCallback((detail: ExperienceDetailType) => {
    setIsShowExpDetail(true);
    setSelectedExpDetail(detail);
  }, []);

  const onCloseExpDetail = useCallback(() => {
    setIsShowExpDetail(false);
    setSelectedExpDetail(null);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn('sm:w-screen md:w-[48rem]', 'rounded-xl', 'v2-card-wrapper')}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.01, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card className="sm:w-screen md:w-[48rem] v2-card" placeholder="">
        <CardBody placeholder="" className="grid gap-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-2">
            <motion.div className="col-span-3" variants={slideLeftVariant}>
              <Typography
                placeholder=""
                variant="h5"
                color="blue-gray"
                className="mb-2 dark:text-slate-100"
              >
                {props.exp.title}
              </Typography>
              <Typography
                placeholder=""
                variant="h6"
                color="blue-gray"
                className="mb-2 dark:text-slate-100"
              >
                {props.exp.position} ({props.exp.period})
              </Typography>

              <ul>
                {props.exp.descriptions.map((des, index) => (
                  <li key={`${index}-${des}`}>{highlightAchievement(des)}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="justify-self-end sm:hidden md:block"
              variants={slideRightVariant}
            >
              <img src={props.exp.logo} alt="" className="w-30 h-30 rounded-2xl bg-white" />
            </motion.div>
          </div>

          {props.exp.projects?.length && (
            <div className={cn('px-5', props.exp.projectsCssClass)}>
              <ExperienceProjectsPagination
                projects={props.exp.projects}
                onOpenExpDetail={onOpenExpDetail}
              />
            </div>
          )}
        </CardBody>

        <ExperienceDetailDialog
          open={isShowExpDetail}
          detail={selectedExpDetail}
          onClose={onCloseExpDetail}
        />
      </Card>
    </motion.div>
  );
};
