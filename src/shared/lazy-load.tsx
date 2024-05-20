import { Suspense, useEffect, useRef, useState } from 'react';

export const useFirstViewportEntry = (
  ref: React.MutableRefObject<any>,
  observerOptions: IntersectionObserverInit,
) => {
  const [entered, setEntered] = useState(false);

  const observer = useRef(
    new IntersectionObserver(([entry]) => setEntered(entry.isIntersecting), observerOptions),
  );

  useEffect(() => {
    const element = ref.current;
    const ob = observer.current;

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
      {entered && <Suspense fallback={<></>}>{children}</Suspense>}
    </div>
  );
};
