import { FC, useEffect, useMemo, useState } from 'react';
import { profile } from '../../../data/profile';
import { TECH_STACKS } from '../../../data/tech-stack';
import { ROUTE_V1 } from '../../../router/const';
import { useNavigate } from '../../../router/hook';
import { cn } from '../../../shared/helper';
import { useBreakpoint } from '../../../shared/hooks/useBreakpoint';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Typography,
} from '../common/components';
import { BasePopover } from '../common/popover';

export const Overview: FC = () => {
  const navigate = useNavigate();

  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  useEffect(() => {
    setIsShowing1(true);
    const timer = setTimeout(() => {
      setIsShowing2(true);
      clearTimeout(timer);
    }, 1000);
  }, []);

  const linkedinContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'linkedin');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      image: '/icons/linkedin.svg',
    };
  }, []);
  const githubContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'github');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      image: '/icons/github.svg',
    };
  }, []);
  const facebookContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'facebook');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      image: '/icons/facebook.svg',
    };
  }, []);

  const { isMd } = useBreakpoint();

  return (
    <div id="overview" className={cn('grid content-center justify-center', 'h-auto min-h-screen')}>
      <Card
        className={cn(
          'sm:w-screen md:w-[48rem]',
          'transition-opacity duration-1000',
          isShowing1 ? 'opacity-100' : 'opacity-0',
        )}
        placeholder=""
      >
        <CardBody
          placeholder=""
          className="grid sm:grid-row-1 md:grid-cols-3 sm:text-center md:text-left sm:gap-2 md:gap-0"
        >
          <div className="md:col-span-2 gap-2 sm:order-2 md:order-1">
            <div
              className={cn(
                'mb-2 flex sm:flex-col md:flex-row sm:gap-0 md:gap-2',
                'transform transition ease-in-out duration-1000',
                isShowing2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]',
              )}
            >
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

            <div
              className={cn(
                'transform transition ease-in-out duration-1000',
                isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]',
              )}
            >
              <Typography placeholder="card-about" className="mb-2">
                Hi, i'm {profile.name}, a fullstack developer based in HCMC, Vietnam.
              </Typography>

              <div className="flex sm:justify-center md:justify-start sm:flex-col md:flex-row sm:gap-1 md:gap-0 items-center">
                <div className="sm:order-2 md:order-1">
                  {[linkedinContact, githubContact, facebookContact].map((contact) => (
                    <a key={contact.key} href={contact.content} target="_blank" rel="noreferrer">
                      <IconButton variant="text" placeholder="">
                        <img src={contact.image} alt="" className="w-8 h-8" />
                      </IconButton>
                    </a>
                  ))}
                </div>

                <div className="sm:order-1 md:order-2">
                  <Button
                    placeholder=""
                    size="sm"
                    variant="text"
                    onClick={() => navigate(ROUTE_V1)}
                  >
                    RESUME
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'sm:order-1 md:order-2',
              'transform transition ease-in-out duration-1000',
              isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
            )}
          >
            <Avatar
              placeholder="card-avatar"
              src={profile.avatar}
              alt="avatar"
              variant="rounded"
              className="w-60 h-60"
            />
          </div>
        </CardBody>

        <CardFooter className="pt-0" placeholder="">
          <div
            className={cn(
              'items-center flex sm:flex-col md:flex-row sm:gap-4 md:gap-6',
              'transform transition ease-in-out duration-1000',
              isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
            )}
          >
            <span>Tech Stack</span>
            <div className="flex gap-4 sm:flex-wrap md: flex-nowrap">
              {TECH_STACKS.map((stack) => (
                <BasePopover
                  key={stack.name}
                  content={() => (
                    <div className="grid gap-2">
                      <Typography placeholder={stack.name} className="text-center">
                        {stack.name}
                      </Typography>
                      {stack.addons && (
                        <>
                          <div className="border"></div>
                          {stack.addons.map((addon) => (
                            <div key={addon.name} className="flex gap-2 items-center">
                              <img src={addon.path} alt={addon.name} className="w-8 h-8" />
                              <Typography placeholder={addon.name}>{addon.name}</Typography>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  placement={isMd ? 'bottom' : 'top'}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <img src={stack.path} alt={stack.name} className="w-8 h-8 hover:cursor-pointer" />
                </BasePopover>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
