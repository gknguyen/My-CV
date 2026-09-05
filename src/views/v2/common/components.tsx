import { ComponentPropsWithRef, ElementType, ForwardRefExoticComponent } from 'react';
import * as MT from '@material-tailwind/react';

// @material-tailwind/react's published types were compiled against an older
// @types/react that had (now removed) `onResize`/`onResizeCapture`/
// `onPointerEnterCapture`/`onPointerLeaveCapture` props on every DOM element.
// Current @types/react no longer defines them, which makes every MT prop type
// falsely require them. Re-export each component with those props made
// optional so consumers aren't forced to pass dummy values.
type MTCaptureProps = {
  onResize?: unknown;
  onResizeCapture?: unknown;
  onPointerEnterCapture?: unknown;
  onPointerLeaveCapture?: unknown;
};

type FixedProps<C extends ElementType> = Omit<ComponentPropsWithRef<C>, keyof MTCaptureProps> &
  MTCaptureProps;

const fixType = <C extends ElementType>(component: C) =>
  component as unknown as ForwardRefExoticComponent<FixedProps<C>>;

export const Avatar = fixType(MT.Avatar);
export const Button = fixType(MT.Button);
export const Card = fixType(MT.Card);
export const CardBody = fixType(MT.CardBody);
export const CardFooter = fixType(MT.CardFooter);
export const CardHeader = fixType(MT.CardHeader);
export const Dialog = fixType(MT.Dialog);
export const DialogBody = fixType(MT.DialogBody);
export const DialogFooter = fixType(MT.DialogFooter);
export const DialogHeader = fixType(MT.DialogHeader);
export const IconButton = fixType(MT.IconButton);
export const List = fixType(MT.List);
export const ListItem = fixType(MT.ListItem);
export const Navbar = fixType(MT.Navbar);
export const Popover = fixType(MT.Popover);
export const PopoverContent = fixType(MT.PopoverContent);
export const PopoverHandler = fixType(MT.PopoverHandler);
export const Step = fixType(MT.Step);
export const Stepper = fixType(MT.Stepper);
export const Tab = fixType(MT.Tab);
export const TabPanel = fixType(MT.TabPanel);
export const Tabs = fixType(MT.Tabs);
export const TabsBody = fixType(MT.TabsBody);
export const TabsHeader = fixType(MT.TabsHeader);
export const Typography = fixType(MT.Typography);
