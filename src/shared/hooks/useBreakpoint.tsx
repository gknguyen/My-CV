import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 1024;
}

export function useBreakpoint() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    isSm: width >= 360 && width < 768,
    isMd: width >= 768,
  };
}
