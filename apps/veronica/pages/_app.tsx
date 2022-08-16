import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';

import { Config, EchoManager } from '@carro/core';
import { useCurrentLanguage } from '@carro/auth/hooks';
import { getUserCountryCode } from '@carro/utils/helpers/auth';
import AuthWrapper from '@carro/auth/components/AuthWrapper';
import OnePageSpin from '@carro/common/components/Spin/OnePageSpin';
import { updateConfigEnv } from '@carro/core/slice/configEnv/configEnvSlice';
import { appStore, wrapper } from '../store';
import GlobalStyles from '../styles/GlobalStyles';

import 'antd/es/date-picker/style/index';
import '../public/static/css/icomoona.css';

// initialize Echo Manager
const echoManager = EchoManager.getInstance();

function CustomApp({ Component, pageProps }: AppProps) {
  const currentLang = useCurrentLanguage();
  const country = getUserCountryCode();

  useEffect(() => {
    if (appStore) {
      //@ts-ignore
      appStore.injectReducer(country);
      appStore.dispatch(updateConfigEnv(country));
    }
  }, [country]);

  useEffect(() => {
    if (currentLang) Config.i18nConfig.i18n.changeLanguage(currentLang);
  }, [currentLang]);

  useEffect(() => {
    echoManager.initialize(undefined, appStore.dispatch);

    window.__ECHO_MANAGER__ = echoManager;

    return () => {
      echoManager.destroy();
      delete window.__ECHO_MANAGER__;
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href={'/img/veronica-logo.svg'} />
        <link rel="apple-touch-icon" href={'/img/veronica-logo.svg'} />

        <title>Veronica</title>
        <meta name="title" content="Veronica" />
        <meta name="description" content="Veronica" />
      </Head>
      <main className="app">
        <GlobalStyles />
        <I18nextProvider i18n={Config.i18nConfig.i18n}>
          <AuthWrapper loadingSpin={<OnePageSpin />}>
            <Component {...pageProps} />
          </AuthWrapper>
        </I18nextProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
