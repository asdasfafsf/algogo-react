import { useEffect, useRef } from 'react';

type UseDidMountEffectCallback = () => void | (() => void);
type UseDidMountEffect = (func: UseDidMountEffectCallback, deps: unknown[]) => void;

const useDidMountEffect: UseDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default useDidMountEffect;
