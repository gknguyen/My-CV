import { useEffect, useState } from 'react';
import { profile } from '../../../data/profile';
import { TECH_STACKS } from '../../../data/tech-stack';
import { Transition } from '../common/animation';
import { Avatar, Card, CardBody, CardFooter, IconButton, Typography } from '../common/components';
import { BasePopover } from '../common/popover';

export const Overview: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="overview" className="h-screen grid content-center justify-center">
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
          <CardBody
            placeholder=""
            className="grid sm:grid-row-1 md:grid-cols-3 sm:text-center md:text-left sm:gap-2 md:gap-0"
          >
            <div className="md:col-span-2 gap-2 sm:order-2 md:order-1">
              <div className="sm:h-[60px] md:h-[35px]">
                <Transition
                  show={isShowing}
                  enter="transform transition ease-in-out duration-1000"
                  enterFrom="opacity-0 translate-y-[-100%]"
                  enterTo="opacity-100 translate-y-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-[-100%]"
                >
                  <div className="mb-2 flex sm:flex-col md:flex-row sm:gap-0 md:gap-2">
                    {[profile.career, `(${profile.yearOfExp})`].map((text) => (
                      <Typography
                        key={text}
                        as="span"
                        placeholder=""
                        variant="h5"
                        color="blue-gray"
                        className="inline"
                      >
                        {text}
                      </Typography>
                    ))}
                  </div>
                </Transition>
              </div>

              <div className="sm:h-[100px] md:h-fit">
                <Transition
                  show={isShowing}
                  enter="transform transition ease-in-out duration-1000"
                  enterFrom="opacity-0 translate-x-[-100%]"
                  enterTo="opacity-100 translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-[-100%]"
                >
                  <div>
                    <Typography placeholder="card-about" className="mb-2">
                      Hi, i'm {profile.name}, a fullstack developer based in HCMC, Vietnam.
                    </Typography>

                    <div className="flex sm:justify-center md:justify-start">
                      <a
                        href="https://linkedin.com/in/gknguyen1711"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <IconButton variant="text" placeholder="">
                          <img src="/icons/linkedin.svg" alt="" className="w-8 h-8" />
                        </IconButton>
                      </a>
                      <a href="https://github.com/gknguyen" target="_blank" rel="noreferrer">
                        <IconButton variant="text" placeholder="">
                          <img src="/icons/github.svg" alt="" className="w-8 h-8" />
                        </IconButton>
                      </a>
                      <a href="https://facebook.com/gknguyen1711" target="_blank" rel="noreferrer">
                        <IconButton variant="text" placeholder="">
                          <img src="/icons/facebook.svg" alt="" className="w-8 h-8" />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div className="h-60 sm:order-1 md:order-2">
              <Transition
                show={isShowing}
                enter="transform transition ease-in-out duration-1000"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Avatar
                  placeholder="card-avatar"
                  src={profile.avatar}
                  alt="avatar"
                  variant="rounded"
                  className="w-60 h-60"
                />
              </Transition>
            </div>
          </CardBody>

          <CardFooter className="sm:h-[144px] md:h-[55px] pt-0" placeholder="">
            <Transition
              show={isShowing}
              enter="transform transition ease-in-out duration-1000"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="items-center flex sm:flex-col md:flex-row sm:gap-4 md:gap-6">
                <span>Tech Stack</span>
                <div className="flex gap-4 sm:flex-wrap md: flex-nowrap">
                  {TECH_STACKS.map((stack) => (
                    <BasePopover
                      key={stack.id}
                      content={() => <Typography placeholder={stack.id}>{stack.name}</Typography>}
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <img src={stack.path} alt={stack.id} className="w-8 h-8" />
                    </BasePopover>
                  ))}
                </div>
              </div>
            </Transition>
          </CardFooter>
        </Card>
      </Transition>
    </div>
  );
};
