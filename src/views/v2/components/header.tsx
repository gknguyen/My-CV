import { FC } from 'react';
import { cn } from '../../../shared/helper';
import { Navbar, Typography } from '../common/components';

const HEADER = [
  {
    title: 'Overview',
    href: '#overview',
  },
  {
    title: 'About',
    href: '#about',
  },
  {
    title: 'Experiences',
    href: '#experiences',
  },
  {
    title: 'Certificates',
    href: '#certificates',
  },
];

export const Header: FC = () => {
  return (
    <Navbar
      placeholder=""
      className={cn(
        'sticky top-0 z-50',
        'mx-auto max-w-screen-xl py-0',
        'rounded-none rounded-b-lg',
        'sm:px-2',
        'md:px-6',
      )}
    >
      <div
        className={cn(
          'flex items-center text-blue-gray-900',
          'sm:justify-center',
          'md:justify-between',
        )}
      >
        <Typography
          placeholder=""
          variant="h6"
          className={cn('mr-4 cursor-pointer py-1.5', 'sm:hidden', 'md:block')}
        >
          gknguyen.info
        </Typography>

        <div className="overflow-x-auto">
          <ul className="my-2 flex flex-col gap-2 sm:mb-0 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
            {HEADER.map((header) => (
              <Typography
                key={header.title}
                placeholder=""
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <a
                  href={header.href}
                  className="flex items-center hover:text-blue-500 transition-colors"
                >
                  {header.title}
                </a>
              </Typography>
            ))}
          </ul>
        </div>
      </div>
    </Navbar>
  );
};
