import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import 'jest-styled-components';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import resources from 'locales/all-locales.json';

// import these lines to fix this error: Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'.ts(2339)
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

i18next.use(initReactI18next).init({
  debug: false,
  resources,
  lng: 'en',
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

interface WrapperProps {
  children: React.ReactElement;
}

interface CustomRenderOptions<T> extends RenderOptions {
  initialState?: T;
}

const baseRender =
  <T,>(makeStore) =>
  (
    ui: React.ReactElement,
    { initialState, ...rtlOptions }: CustomRenderOptions<T> = {}
  ) => {
    const store = makeStore({
      preloadedState: initialState,
    });

    const Wrapper: React.FC<WrapperProps> = ({ children }) => {
      return (
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
        </Provider>
      );
    };

    return {
      ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
      store,
    };
  };

// nextjs's mocks
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
const mockFn = jest.fn;
// @ts-ignore
export const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: mockFn(() => Promise.resolve(true)),
  replace: mockFn(() => Promise.resolve(true)),
  reload: mockFn(() => Promise.resolve(true)),
  prefetch: mockFn(() => Promise.resolve()),
  back: mockFn(() => Promise.resolve(true)),
  beforePopState: mockFn(() => Promise.resolve(true)),
  isFallback: false,
  events: {
    on: mockFn(),
    off: mockFn(),
    emit: mockFn(),
  },
}));

// re-export everything from @testing-library
export * from '@testing-library/react';
export { default as user } from '@testing-library/user-event';
export { baseRender };
