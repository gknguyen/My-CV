import { useEffect, useState } from 'react';
import { profile } from '../../../data/profile';
import { Transition } from '../common/animation';
import { Avatar, Card, CardBody, Typography } from '../common/components';

export const About: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen grid content-center justify-center">
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
        <Card className="mt-6 w-[48rem]" placeholder="">
          <CardBody placeholder="" className="grid grid-cols-3">
            <div className="h-60">
              <Transition
                show={isShowing}
                enter="transform transition ease-in-out duration-1000"
                enterFrom="opacity-0 translate-x-[-100%]"
                enterTo="opacity-100 translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-[-100%]"
              >
                <Avatar
                  placeholder=""
                  src="/images/coffee-chill.jpeg"
                  alt="avatar"
                  variant="rounded"
                  className="w-60 h-60"
                />
              </Transition>
            </div>

            <div className="col-span-2 gap-2 pl-8">
              <div className="h-[35px]">
                <Transition
                  show={isShowing}
                  enter="transform transition ease-in-out duration-1000"
                  enterFrom="opacity-0 translate-y-[-100%]"
                  enterTo="opacity-100 translate-y-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-[-100%]"
                >
                  <Typography placeholder="" variant="h5" color="blue-gray" className="mb-2">
                    ABOUT ME
                  </Typography>
                </Transition>
              </div>

              <div className="h-[280px]">
                <Transition
                  show={isShowing}
                  enter="transform transition ease-in-out duration-1000"
                  enterFrom="opacity-0 translate-x-full"
                  enterTo="opacity-100 translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-full"
                >
                  <div>
                    {profile.about.split('\n').map((ele) => (
                      <Typography key={ele} placeholder="" className="mb-2">
                        {ele}
                      </Typography>
                    ))}
                  </div>
                </Transition>
              </div>
            </div>
          </CardBody>
        </Card>
      </Transition>
    </div>
  );
};
