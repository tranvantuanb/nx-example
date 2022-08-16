import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { backstageApi } from '@carro/backstage-shared/api';
import { reducer as CoreReducer } from '@carro/core/slice';
import configEnvReducer from '@carro/core/slice/configEnv/configEnvSlice';
import { authApi } from '@carro/auth/slice/api';

import { middlewares as StoreMiddlewares } from './middlewares';

const isProd = process.env['APP_ENV'] === 'production';

const reducerCountryMapping = {
  MY: {},
};

const staticReducers = {
  [backstageApi.reducerPath]: backstageApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  core: CoreReducer,
  configEnv: configEnvReducer,
};

const combinedReducer = combineReducers({ ...staticReducers });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof reducer>;

export let appStore: Store<RootState>;

export const makeStore = (reduxToolkitStoreOptions: any) => {
  appStore = configureStore({
    reducer,
    middleware: (getDefaultMiddlewares) => [
      ...getDefaultMiddlewares(),
      ...StoreMiddlewares,
      backstageApi.middleware,
      authApi.middleware,
    ],
    devTools: !isProd,
    preloadedState: {},
    ...reduxToolkitStoreOptions,
  });

  //@ts-ignore
  appStore.injectReducer = (countryCode) => {
    //@ts-ignore
    appStore.reducerCountry = reducerCountryMapping[countryCode];
    //@ts-ignore
    appStore.replaceReducer(createReducer(appStore.reducerCountry));
  };

  const createReducer = (reducerCountry) => {
    const newRootReducer = combineReducers({
      ...staticReducers,
      ...reducerCountry,
    });
    return newRootReducer;
  };

  return appStore;
};

export const wrapper = createWrapper(makeStore);
