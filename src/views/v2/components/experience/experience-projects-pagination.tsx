import { FC, useCallback, useMemo, useState } from 'react';
import { chunkArray, cn } from '../../../../shared/helper';
import { Typography } from '../../common/components';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '../../common/icon/solid';
import { ExperienceDetailType } from './experience-detail-dialog';

interface Props {
  isShowing3: boolean;
  projects: ExperienceDetailType[];
  onOpenExpDetail: (detail: ExperienceDetailType) => void;
}

export const ExperienceProjectsPagination: FC<Props> = (props) => {
  const projectsGroup = useMemo(() => chunkArray(props.projects, 3), [props.projects]);

  const ProjectDetail = useCallback(
    (proj: ExperienceDetailType) => (
      <li key={proj.name} className="mx-8">
        <span
          className={cn(
            'absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full -start-4 ring-4 ring-white',
            'transform transition ease-in-out duration-1000',
            props.isShowing3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
            'hover:cursor-pointer hover:bg-orange-500',
          )}
        >
          <PlusIcon className="block w-[27px]" onClick={() => props.onOpenExpDetail(proj)} />
        </span>

        <div
          className={cn(
            'transform transition ease-in-out duration-1000',
            props.isShowing3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
          )}
        >
          <Typography placeholder="" variant="h5">
            {proj.name}
          </Typography>
          <Typography placeholder="" variant="h6">
            {proj.position}
          </Typography>
          <div className={cn('sm:hidden', 'md:block')}>{proj.descriptions[0]}</div>
        </div>
      </li>
    ),
    [props],
  );

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
        <ol className="relative grid gap-5 border-s-2">
          {projectsGroup[0].map((proj) => ProjectDetail(proj))}
        </ol>
      ) : (
        <>
          <button
            onClick={prev}
            className={cn(
              'absolute z-50',
              'sm:left-[40%] sm:top-auto sm:-bottom-4',
              'md:-left-4 md:top-1/2 md:bottom-1/2',
              'p-2 border-2 rounded-xl h-fit bg-white',
              active === minPage ? 'border-gray-300' : 'border-gray-500',
            )}
          >
            <ArrowLeftIcon
              strokeWidth={2}
              className={cn('h-4 w-4', active === minPage ? 'text-gray-300' : 'text-gray-500')}
            />
          </button>

          <ol className="relative grid gap-5 border-s-2">
            {projectsGroup[active].map((proj) => ProjectDetail(proj))}
          </ol>

          <button
            onClick={next}
            className={cn(
              'absolute z-50',
              'sm:right-[40%] sm:top-auto sm:-bottom-4',
              'md:-right-4 md:top-1/2 md:bottom-1/2',
              'p-2 border-2  rounded-xl h-fit bg-white',
              active === maxPage ? 'border-gray-300' : 'border-gray-500',
            )}
          >
            <ArrowRightIcon
              strokeWidth={2}
              className={cn('h-4 w-4', active === maxPage ? 'text-gray-300' : 'text-gray-500')}
            />
          </button>
        </>
      )}
    </>
  );
};
