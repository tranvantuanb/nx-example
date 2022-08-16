import { useState } from 'react';

const objCheck = (thing) => {
  if ({}.toString.call(thing) !== '[object Object]') {
    throw '`useMergeState` only accepts objects.';
  }
  return thing;
};

export const useMergeState = (initialState = {}) => {
  const [state, setState] = useState(() => objCheck(initialState));

  const mergeState = (objOrFxn) => {
    setState((prevState) => {
      const newState = objCheck(
        objOrFxn instanceof Function ? objOrFxn(prevState) : objOrFxn
      );
      return { ...prevState, ...newState };
    });
  };
  return [state, mergeState];
};
