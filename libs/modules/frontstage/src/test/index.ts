import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { baseRender } from '@carro/test/base';

import { backstageApi } from '@carro/backstage-shared/api/backstageApi';

const reducer = combineReducers({
  [backstageApi.reducerPath]: backstageApi.reducer,
});

type RootState = ReturnType<typeof reducer>;

export type MockApiState = {
  backstageApi: {
    queries?: any;
    mutation?: any;
  };
};

export type MockRootState = Partial<
  Omit<RootState, 'backstageApi'> & MockApiState
>;

export const makeStore = (reduxToolkitStoreOptions) => {
  const appStore = configureStore({
    reducer,
    middleware: (getDefaultMiddlewares) => [
      ...getDefaultMiddlewares(),
      backstageApi.middleware,
    ],
    devTools: true,
    preloadedState: {},
    ...reduxToolkitStoreOptions,
  });
  return appStore;
};

export const render = baseRender<MockRootState>(makeStore);

export * from '@carro/test/base';
// export * as mock from './mock';
