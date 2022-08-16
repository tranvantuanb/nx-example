import React, { useCallback, useMemo, useReducer, createContext } from 'react';
import { createAction, createReducer } from '@reduxjs/toolkit';

type CardFormMode = 'create' | 'edit';

interface CardFormContextValue {
  isEditing: boolean;
  mode: CardFormMode;
  // at the moment for simplicity, data sharing in the form context does not require type check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

const INITIAL_STATE: CardFormContextValue = {
  isEditing: false,
  mode: 'edit',
  data: {},
};

// ------------------------------------------- ACTIONS -------------------------------------------
const Action = {
  setEditing: createAction<boolean>('CARD_FORM/SET_EDITING'),
  setMode: createAction<CardFormMode>(`CARD_FORM/SET_MODE`),
  setData: createAction<Record<string, any>>(`CARD_FORM/SET_DATA`),
};

// ------------------------------------------- REDUCER -------------------------------------------
const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(Action.setEditing, (state, { payload }) => {
    state.isEditing = payload;
  });
  builder.addCase(Action.setMode, (state, { payload }) => {
    state.mode = payload;
  });
  builder.addCase(Action.setData, (state, { payload }) => {
    state.data = payload;
  });
});

export const CardFormContext = createContext({
  ...INITIAL_STATE,
  setEditing: (payload: boolean) => {},
  setMode: (payload: CardFormMode) => {},
  setData: (payload: Record<string, any>) => {},
});

export const CardFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setEditing = useCallback(
    (payload: boolean) => dispatch(Action.setEditing(payload)),
    []
  );

  const setMode = useCallback(
    (payload: CardFormMode) => dispatch(Action.setMode(payload)),
    []
  );

  const setData = useCallback(
    (payload: Record<string, any>) => dispatch(Action.setData(payload)),
    []
  );

  const value = useMemo(
    () => ({ ...state, setEditing, setMode, setData }),
    [state, setEditing, setMode, setData]
  );
  return (
    <CardFormContext.Provider value={value}>
      {children}
    </CardFormContext.Provider>
  );
};
