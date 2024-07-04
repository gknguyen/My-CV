import { useEffect, useState } from 'react';
import { profile } from '../../../data/profile';
import { cn } from '../../../shared/helper';
import { Avatar, Card, CardBody, Typography } from '../common/components';

export const About: React.FC = () => {
  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  useEffect(() => {
    setIsShowing1(true);
    const timer = setTimeout(() => {
      setIsShowing2(true);
      clearTimeout(timer);
    }, 1000);
  }, []);

  return (
    <div id="about" className="h-screen grid content-center justify-center">
      <Card
        className={cn(
          'sm:w-screen md:w-[48rem]',
          'transition-opacity duration-1000',
          isShowing1 ? 'opacity-100' : 'opacity-0',
        )}
        placeholder=""
      >
        <CardBody placeholder="" className="grid sm:grid-cols-1 md:grid-cols-3">
          <div
            className={cn(
              'sm:hidden md:block',
              'transform transition ease-in-out duration-1000',
              isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]',
            )}
          >
            <Avatar
              placeholder=""
              src="/images/coffee-chill.jpeg"
              alt="avatar"
              variant="rounded"
              className="w-60 h-60"
            />
          </div>

          <div className="col-span-2 gap-2 pl-8">
            <div
              className={cn(
                'transform transition ease-in-out duration-1000',
                isShowing2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]',
              )}
            >
              <Typography placeholder="" variant="h5" color="blue-gray" className="mb-2">
                ABOUT ME
              </Typography>
            </div>

            <div
              className={cn(
                'transform transition ease-in-out duration-1000',
                isShowing2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
              )}
            >
              {profile.about.map((ele) => (
                <Typography key={ele} placeholder="" className="mb-2">
                  {ele}
                </Typography>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
