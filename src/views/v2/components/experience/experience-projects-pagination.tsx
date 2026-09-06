import { m } from 'framer-motion';
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

  const minPage = 0;
  const maxPage = projectsGroup.length - 1;

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
      <ProjectsList
        projects={projectsGroup[active]}
        active={active}
        onOpenExpDetail={props.onOpenExpDetail}
      />

      {projectsGroup.length > 1 && (
        <>
          <PaginationButton direction="prev" onClick={prev} disabled={active === minPage} />
          <PaginationButton direction="next" onClick={next} disabled={active === maxPage} />
        </>
      )}
    </>
  );
};

interface ProjectsListProps {
  projects: ExperienceDetailType[];
  active: number;
  onOpenExpDetail: (detail: ExperienceDetailType) => void;
}

const ProjectsList: FC<ProjectsListProps> = ({ projects, active, onOpenExpDetail }) => (
  <AnimatePresence mode="wait">
    <m.ol
      key={active}
      className="relative grid gap-5 border-s-2"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((proj) => (
        <ProjectDetail key={proj.name} project={proj} onOpenExpDetail={onOpenExpDetail} />
      ))}
    </m.ol>
  </AnimatePresence>
);

interface PaginationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({ direction, onClick, disabled }) => {
  const Icon = direction === 'prev' ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <m.button
      type="button"
      aria-label={direction === 'prev' ? 'Previous projects' : 'Next projects'}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={cn(
        'absolute z-50',
        direction === 'prev'
          ? cn('sm:left-[39%] sm:top-auto sm:-bottom-5', 'md:-left-5 md:top-1/2 md:bottom-1/2')
          : cn('sm:right-[39%] sm:top-auto sm:-bottom-5', 'md:-right-5 md:top-1/2 md:bottom-1/2'),
        'p-2 border-2 rounded-xl h-fit',
        'v2-pagination-btn',
        disabled
          ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
          : 'bg-white border-gray-500 cursor-pointer',
      )}
    >
      <Icon className={cn('h-5 w-5', disabled ? 'text-gray-400' : 'text-gray-600')} />
    </m.button>
  );
};

interface ProjectDetailProps {
  project: ExperienceDetailType;
  onOpenExpDetail: (detail: ExperienceDetailType) => void;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ project: proj, onOpenExpDetail }) => (
  <m.li
    key={proj.name}
    className="mx-8"
    variants={itemVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <button
      type="button"
      aria-label={`View details for ${proj.name}`}
      className={cn(
        'absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full ring-4 ring-white',
        'hover:cursor-pointer hover:bg-orange-500 hover:scale-110 active:scale-90',
        'transition-transform duration-150 v2-plus-enter',
      )}
      style={{ left: '-1rem' }}
      onClick={() => onOpenExpDetail(proj)}
    >
      <PlusIcon className="block w-[27px] pointer-events-none" />
    </button>

    <div>
      <Typography placeholder="" variant="h5" className="dark:text-slate-100">
        {proj.name}
      </Typography>
      <Typography placeholder="" variant="h6" className="dark:text-slate-100">
        {proj.position}
      </Typography>
      <div className={cn('sm:hidden', 'md:block')}>{proj.descriptions[0]}</div>
    </div>
  </m.li>
);
