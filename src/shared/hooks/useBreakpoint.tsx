import { useLayoutEffect, useState } from 'react';

export function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return {
    isSm: width >= 360 && width < 768,
    isMd: width >= 768,
  };
}
