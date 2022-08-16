import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { baseRender } from '@carro/test/base';

const reducer = combineReducers({});

type RootState = ReturnType<typeof reducer>;

export type MockRootState = Partial<Omit<RootState, ''>>;

export const makeStore = (reduxToolkitStoreOptions) => {
  const appStore = configureStore({
    reducer,
    middleware: (getDefaultMiddlewares) => [...getDefaultMiddlewares()],
    devTools: true,
    preloadedState: {},
    ...reduxToolkitStoreOptions,
  });
  return appStore;
};

export const render = baseRender<MockRootState>(makeStore);

export * from '@carro/test/base';
