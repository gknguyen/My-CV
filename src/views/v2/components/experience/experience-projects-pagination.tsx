import { motion } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
import { chunkArray, cn } from '../../../../shared/helper';
import { AnimatePresence } from '../../common/animate-presence';
import { Typography } from '../../common/components';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '../../common/icon/solid';
import { ExperienceDetailType } from './experience-detail-dialog';

interface Props {
  projects: ExperienceDetailType[];
  onOpenExpDetail: (detail: ExperienceDetailType) => void;
}

const listVariants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const ExperienceProjectsPagination: FC<Props> = (props) => {
  const projectsGroup = useMemo(() => chunkArray(props.projects, 3), [props.projects]);

  const [active, setActive] = useState(0);

  const minPage = useMemo(() => 0, []);
  const maxPage = useMemo(() => projectsGroup.length - 1, [projectsGroup]);

  const next = useCallback(() => {
    if (active === maxPage) return;
    setActive(active + 1);
  }, [active, maxPage]);

  const prev = useCallback(() => {
    if (active === minPage) return;
    setActive(active - 1);
  }, [active, minPage]);

  return (
    <>
      {projectsGroup.length === 1 ? (
        <AnimatePresence mode="wait">
          <motion.ol
            key={active}
            className="relative grid gap-5 border-s-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {projectsGroup[0].map((proj) => (
              <ProjectDetail
                key={proj.name}
                project={proj}
                onOpenExpDetail={props.onOpenExpDetail}
              />
            ))}
          </motion.ol>
        </AnimatePresence>
      ) : (
        <>
          <motion.button
            onClick={prev}
            disabled={active === minPage}
            whileHover={active === minPage ? {} : { scale: 1.1 }}
            whileTap={active === minPage ? {} : { scale: 0.95 }}
            className={cn(
              'absolute z-50',
              'sm:left-[39%] sm:top-auto sm:-bottom-5',
              'md:-left-5 md:top-1/2 md:bottom-1/2',
              'p-2 border-2 rounded-xl h-fit',
              'v2-pagination-btn',
              active === minPage
                ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                : 'bg-white border-gray-500 cursor-pointer',
            )}
          >
            <ArrowLeftIcon
              className={cn('h-5 w-5', active === minPage ? 'text-gray-400' : 'text-gray-600')}
            />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.ol
              key={active}
              className="relative grid gap-5 border-s-2"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {projectsGroup[active].map((proj) => (
                <ProjectDetail
                  key={proj.name}
                  project={proj}
                  onOpenExpDetail={props.onOpenExpDetail}
                />
              ))}
            </motion.ol>
          </AnimatePresence>

          <motion.button
            onClick={next}
            disabled={active === maxPage}
            whileHover={active === maxPage ? {} : { scale: 1.1 }}
            whileTap={active === maxPage ? {} : { scale: 0.95 }}
            className={cn(
              'absolute z-50',
              'sm:right-[39%] sm:top-auto sm:-bottom-5',
              'md:-right-5 md:top-1/2 md:bottom-1/2',
              'p-2 border-2 rounded-xl h-fit',
              'v2-pagination-btn',
              active === maxPage
                ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                : 'bg-white border-gray-500 cursor-pointer',
            )}
          >
            <ArrowRightIcon
              className={cn('h-5 w-5', active === maxPage ? 'text-gray-400' : 'text-gray-600')}
            />
          </motion.button>
        </>
      )}
    </>
  );
};

interface ProjectDetailProps {
  project: ExperienceDetailType;
  onOpenExpDetail: (detail: ExperienceDetailType) => void;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ project: proj, onOpenExpDetail }) => (
  <motion.li
    key={proj.name}
    className="mx-8"
    variants={itemVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <span
      className={cn(
        'absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full ring-4 ring-white',
        'hover:cursor-pointer hover:bg-orange-500 hover:scale-110 active:scale-90',
        'transition-transform duration-150 v2-plus-enter',
      )}
      style={{ left: '-1rem' }}
      onClick={() => onOpenExpDetail(proj)}
    >
      <PlusIcon className="block w-[27px] pointer-events-none" />
    </span>

    <div>
      <Typography placeholder="" variant="h5" className="dark:text-slate-100">
        {proj.name}
      </Typography>
      <Typography placeholder="" variant="h6" className="dark:text-slate-100">
        {proj.position}
      </Typography>
      <div className={cn('sm:hidden', 'md:block')}>{proj.descriptions[0]}</div>
    </div>
  </motion.li>
);
