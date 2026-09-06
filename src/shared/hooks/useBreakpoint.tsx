import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}

function getSnapshot() {
  return window.innerWidth;
}

export function useBreakpoint() {
  const width = useSyncExternalStore(subscribe, getSnapshot);

  return {
    isSm: width >= 360 && width < 768,
    isMd: width >= 768,
  };
}
