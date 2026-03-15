import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ExperienceType } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { Card, CardBody, Typography } from '../../common/components';
import { PlusIcon } from '../../common/icon/solid';
import { ExperienceDetailDialog, ExperienceDetailType } from './experience-detail-dialog';

interface IProps {
  exp: ExperienceType;
}

export const Experience: FC<IProps> = (props) => {
  const expContainerRef = useRef<HTMLDivElement | null>(null);

  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);
  const [isShowing3, setIsShowing3] = useState(false);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShowing1(true);
          const timer = setTimeout(() => {
            setIsShowing2(true);
            clearTimeout(timer);
          }, 500);
          const timer2 = setTimeout(() => {
            setIsShowing3(true);
            clearTimeout(timer2);
          }, 1000);
        }
      },
      { threshold: 0.5 },
    );
    if (expContainerRef.current) observer.observe(expContainerRef.current);
    return () => observer.disconnect();
  }, []);

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
    <Card
      ref={expContainerRef}
      className={cn(
        'sm:w-screen md:w-[48rem]',
        'transition-opacity duration-1000',
        isShowing1 ? 'opacity-100' : 'opacity-0',
      )}
      placeholder=""
    >
      <CardBody placeholder="" className="grid gap-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-2">
          <div className="col-span-3">
            <Typography placeholder="" variant="h5" color="blue-gray" className="mb-2">
              {props.exp.title}
            </Typography>
            <Typography placeholder="" variant="h6" color="blue-gray" className="mb-2">
              {props.exp.position} ({props.exp.period})
            </Typography>

            <ul>
              {props.exp.descriptions.map((des) => (
                <li key={des}>{des}</li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              'justify-self-end sm:hidden md:block',
              'transform transition ease-in-out duration-1000',
              isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
            )}
          >
            <img src={props.exp.logo} alt="" className="w-30 h-30 rounded-2xl" />
          </div>
        </div>

        <div className={cn('px-5', props.exp.projectsCssClass)}>
          <ol className="relative grid gap-5 border-s-2">
            {props.exp.projects?.map((proj) => (
              <li key={proj.name} className="mx-8">
                <span
                  className={cn(
                    'absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full -start-4 ring-4 ring-white',
                    'transform transition ease-in-out duration-1000',
                    isShowing3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
                    'hover:cursor-pointer hover:bg-orange-500',
                  )}
                >
                  <PlusIcon className="block w-[27px]" onClick={() => onOpenExpDetail(proj)} />
                </span>

                <div
                  className={cn(
                    'transform transition ease-in-out duration-1000',
                    isShowing3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
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
            ))}
          </ol>
        </div>
      </CardBody>

      <ExperienceDetailDialog
        open={isShowExpDetail}
        detail={selectedExpDetail}
        onClose={onCloseExpDetail}
      />
    </Card>
  );
};
