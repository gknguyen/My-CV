/**
 * Framer Motion 11's AnimatePresence has return type `Element | undefined`
 * which is incompatible with React 18's JSX element type `Element | null`.
 * This wrapper uses createElement to bypass the JSX type check.
 */
import { AnimatePresence as FramerAnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { createElement, FC, ReactNode } from 'react';

interface Props extends AnimatePresenceProps {
  children?: ReactNode;
}

export const AnimatePresence: FC<Props> = ({ children, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createElement(FramerAnimatePresence as any, rest, children);
};
