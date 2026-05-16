import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { cn } from '../../../shared/helper';
import { Navbar, Typography } from '../common/components';
import { ScrollProgressBar } from './scroll-progress-bar';

const HEADER = [
  { title: 'Overview', href: '#overview', id: 'overview' },
  { title: 'About', href: '#about', id: 'about' },
  { title: 'Experiences', href: '#experiences', id: 'experiences' },
  { title: 'Certificates', href: '#certificates', id: 'certificates' },
];

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
  activeSection: string;
}

export const Header: FC<Props> = ({ isDark, onToggleDark, activeSection }) => {
  return (
    <div className="v2-header sticky top-0 z-[60]">
      <Navbar
        placeholder=""
        className={cn(
          'relative',
          'mx-auto max-w-screen-xl py-0',
          'rounded-none rounded-b-lg',
          'sm:px-2',
          'md:px-6',
          'dark:bg-slate-900 dark:border-slate-700',
        )}
      >
        <ScrollProgressBar />

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
            className={cn('mr-4 py-1.5', 'sm:hidden', 'md:block', 'dark:text-slate-100')}
          >
            gknguyen.info
          </Typography>

          <div className="overflow-x-auto">
            <ul className={cn('my-2 flex gap-4 mb-0 mt-0 items-center', 'md:gap-6')}>
              {HEADER.map((header) => (
                <Typography
                  key={header.title}
                  placeholder=""
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className={cn('p-1 font-medium', 'dark:text-slate-100')}
                >
                  <a
                    href={header.href}
                    className={cn(
                      'flex items-center hover:text-blue-500 transition-colors',
                      activeSection === header.id ? 'text-blue-500 font-semibold' : undefined,
                    )}
                  >
                    {header.title}
                  </a>
                </Typography>
              ))}

              <button
                onClick={onToggleDark}
                aria-label="Toggle dark mode"
                className="p-1.5 rounded-lg hover:bg-blue-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 dark:text-slate-100" />
                )}
              </button>
            </ul>
          </div>
        </div>
      </Navbar>
    </div>
  );
};
