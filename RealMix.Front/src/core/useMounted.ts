import { useLayoutEffect, useRef } from 'react';

export const useMounted = (onUnmount?: () => void) => {
  const mounted = useRef(true);
  useLayoutEffect(() => {
    return () => {
      if (!mounted.current)
        throw new Error('Component already unmounted. You are doing something wrong. useCallback for onUnmount method');
      mounted.current = false;
      if (onUnmount != null) onUnmount();
    };
  }, [mounted, onUnmount]);
  return mounted;
};
