import { m, useScroll } from 'framer-motion';
import { FC } from 'react';

export const ScrollProgressBar: FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      data-testid="scroll-progress-bar"
      className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-10"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
