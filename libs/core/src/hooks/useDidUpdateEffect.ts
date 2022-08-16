import React, { useEffect } from 'react';

// effect run only after the first render
export const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = React.useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};
