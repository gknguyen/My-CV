import { Suspense, useEffect, useRef, useState } from 'react';

const useFirstViewportEntry = (
  ref: React.RefObject<Element | null>,
  observerOptions: IntersectionObserverInit,
) => {
  const [entered, setEntered] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  if (observerRef.current === null) {
    observerRef.current = new IntersectionObserver(
      ([entry]) => setEntered(entry.isIntersecting),
      observerOptions,
    );
  }

  useEffect(() => {
    const element = ref.current;
    const ob = observerRef.current as IntersectionObserver;

    if (entered) {
      ob.disconnect();
      return;
    }

    if (element && !entered) ob.observe(element);

    return () => ob.disconnect();
  }, [entered, ref]);

  return entered;
};

interface IRenderOnViewportEntry extends IntersectionObserverInit {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const RenderOnViewportEntry: React.FC<IRenderOnViewportEntry> = ({
  threshold = 0,
  children,
  ...wapperProps
}) => {
  const ref = useRef(null);

  const entered = useFirstViewportEntry(ref, { threshold });

  return (
    <div id="render-on-viewport" {...wapperProps} ref={ref}>
      {entered && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
};
