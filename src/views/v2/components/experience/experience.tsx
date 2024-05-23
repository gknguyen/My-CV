import { useEffect, useState } from 'react';
import { ExperienceType } from '../../../../data/profile';
import { cn } from '../../../../shared/helper';
import { Transition } from '../../common/animation';
import { Card, CardBody, Typography } from '../../common/components';

interface IProps {
  exp: ExperienceType;
}

export const Experience: React.FC<IProps> = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 500);
    const timer2 = setTimeout(() => {
      setIsShowing2(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Transition
      show
      appear
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity transform transition ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Card className="sm:w-screen md:w-[48rem]" placeholder="">
        <CardBody placeholder="" className="grid gap-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-4">
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

            <div className="h-30 justify-self-end sm:hidden md:block">
              <Transition
                show={isShowing}
                enter="transform transition ease-in-out duration-1000"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <img src={props.exp.logo} alt="" className="w-30 h-30 rounded-2xl" />
              </Transition>
            </div>
          </div>

          <div className={cn('px-5', props.exp.projectsCssClass)}>
            <ol className="relative grid gap-5 border-s-2 h-full">
              {props.exp.projects?.map((proj) => (
                <li key={proj.name} className="mx-8">
                  <Transition
                    show={isShowing2}
                    enter="transform transition ease-in-out duration-1000"
                    enterFrom="opacity-0 translate-y-full"
                    enterTo="opacity-100 translate-y-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-full"
                  >
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full -start-4 ring-4 ring-white"></span>
                  </Transition>

                  <Transition
                    show={isShowing2}
                    enter="transform transition ease-in-out duration-1000"
                    enterFrom="opacity-0 translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-full"
                  >
                    <div>
                      <Typography placeholder="" variant="h5">
                        {proj.name}
                      </Typography>
                      <Typography placeholder="" variant="h6">
                        {proj.position}
                      </Typography>
                      <div className="sm:hidden md:block">{proj.descriptions[0]}</div>
                    </div>
                  </Transition>
                </li>
              ))}
            </ol>
          </div>
        </CardBody>
      </Card>
    </Transition>
  );
};
