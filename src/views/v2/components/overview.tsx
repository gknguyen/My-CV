import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { profile } from '../../../data/profile';
import { TECH_STACKS } from '../../../data/tech-stack';
import { ROUTE_V1 } from '../../../router/const';
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
import { FacebookIcon, GithubIcon, LinkedinIcon } from '../common/icon/svg';
import { BasePopover } from '../common/popover';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' as const } },
};

export const Overview: FC = () => {
  const linkedinContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'linkedin');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      icon: <LinkedinIcon width={24} height={24} />,
    };
  }, []);
  const githubContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'github');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      icon: <GithubIcon width={24} height={24} />,
    };
  }, []);
  const facebookContact = useMemo(() => {
    const contact = profile.contacts.find((contact) => contact.key === 'facebook');
    return {
      ...contact,
      content: `https://${contact?.content}`,
      icon: <FacebookIcon width={24} height={24} />,
    };
  }, []);

  const { isMd } = useBreakpoint();

  return (
    <div id="overview" className={cn('grid content-center justify-center', 'h-auto min-h-screen')}>
      <motion.div
        className={cn('sm:w-screen md:w-[48rem]', 'rounded-xl overflow-hidden', 'v2-card-wrapper')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="sm:w-screen md:w-[48rem] v2-card" placeholder="">
          <CardBody
            placeholder=""
            className="grid sm:grid-row-1 md:grid-cols-3 sm:text-center md:text-left sm:gap-2 md:gap-0"
          >
            <div className="md:col-span-2 gap-2 sm:order-2 md:order-1">
              <motion.div
                className="mb-2 flex sm:flex-col md:flex-row sm:gap-0 md:gap-2"
                variants={fadeUpVariant}
              >
                {[profile.career, `(${profile.yearOfExp})`].map((text) => (
                  <Typography
                    key={text}
                    as="span"
                    placeholder=""
                    variant="h5"
                    color="blue-gray"
                    className="inline dark:text-slate-100"
                  >
                    {text}
                  </Typography>
                ))}
              </motion.div>

              <motion.div variants={fadeUpVariant}>
                <Typography placeholder="card-about" className="mb-2 dark:text-slate-100">
                  Hi, i'm {profile.name}, a fullstack developer based in HCMC, Vietnam.
                </Typography>

                <div className="flex sm:justify-center md:justify-start sm:flex-col md:flex-row sm:gap-1 md:gap-0 items-center">
                  <div className="sm:order-2 md:order-1">
                    {[linkedinContact, githubContact, facebookContact].map((contact) => (
                      <a key={contact.key} href={contact.content} target="_blank" rel="noreferrer">
                        <IconButton variant="text" placeholder="">
                          {contact.icon}
                        </IconButton>
                      </a>
                    ))}
                  </div>

                  <div className="sm:order-1 md:order-2">
                    <Button
                      placeholder=""
                      size="sm"
                      variant="text"
                      onClick={() => (globalThis.location.href = ROUTE_V1)}
                    >
                      RESUME
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="sm:order-1 md:order-2"
              variants={slideRightVariant}
              whileHover={{ scale: 1.02 }}
            >
              <Avatar
                placeholder="card-avatar"
                src={profile.avatar}
                alt="avatar"
                variant="rounded"
                className="w-60 h-60"
              />
            </motion.div>
          </CardBody>

          <CardFooter className="pt-0" placeholder="">
            <motion.div
              className="items-center flex sm:flex-col md:flex-row sm:gap-4 md:gap-6"
              variants={fadeUpVariant}
            >
              <span className="dark:text-slate-100">Tech Stack</span>
              <div className="flex gap-4 sm:flex-wrap md: flex-nowrap">
                {TECH_STACKS.map((stack) => (
                  <BasePopover
                    key={stack.name}
                    content={() => (
                      <div className="grid gap-2">
                        <Typography placeholder={stack.name} className="text-center">
                          {stack.name}
                        </Typography>
                        {!!stack.addons && (
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
                    <img
                      src={stack.path}
                      alt={stack.name}
                      className="w-8 h-8 hover:cursor-pointer"
                    />
                  </BasePopover>
                ))}
              </div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
