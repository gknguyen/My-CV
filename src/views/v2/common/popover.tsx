import { FC, ReactElement, useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverHandler } from './components';
import { PopoverProps } from './types';

interface IProps extends PopoverProps {
  content: () => ReactElement;
}

export const BasePopover: FC<IProps> = ({ content, children, ...popoverProps }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = useMemo(
    () => ({
      onMouseEnter: () => setOpenPopover(true),
      onMouseLeave: () => setOpenPopover(false),
    }),
    [],
  );

  return (
    <Popover open={openPopover} handler={setOpenPopover} {...popoverProps}>
      <PopoverHandler {...triggers}>{children}</PopoverHandler>
      <PopoverContent placeholder="" {...triggers} className="z-50 max-w-[24rem]">
        {content()}
      </PopoverContent>
    </Popover>
  );
};
