import React from 'react';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';
import { extractCritical } from '@emotion/server';

type MyDocumentInitialProps = DocumentInitialProps & {
  ids?: Array<string | number>;
  css?: string;
};
const RUDDER_STACK_WRITE_KEY = `${process.env.RUDDER_STACK_WRITE_KEY}`;
const RUDDER_STACK_DATA_PLAN_URL = `${process.env.RUDDER_STACK_DATA_PLAN_URL}`;
const APP_ENV = `${process.env.APP_ENV}`;
const RECAPTCHA_SITE_KEY = `${process.env.RECAPTCHA_SITE_KEY}`;
const GTM_NO_SCRIPT_URL =
  'https://www.googletagmanager.com/ns.html?id=GTM-T9PLTT7';
const GTM_NO_SCRIPT_URL_FINAL =
  APP_ENV !== 'production'
    ? GTM_NO_SCRIPT_URL +
      '&gtm_auth=PFJHmRyAfMtI6NrFq6_cSg&gtm_preview=env-3&gtm_cookies_win=x'
    : GTM_NO_SCRIPT_URL;

// https://codesandbox.io/s/wmrk2?file=/pages/_document.js
export default class MyDocument extends Document<MyDocumentInitialProps> {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  setGoogleTagManager() {
    const GTM_AUTH =
      APP_ENV !== 'production'
        ? "+'&gtm_auth=PFJHmRyAfMtI6NrFq6_cSg&gtm_preview=env-3&gtm_cookies_win=x'"
        : '';

    return {
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl${GTM_AUTH};f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T9PLTT7');
              `,
    };
  }

  setRudderStack(writeKey, dataPlanUrl) {
    return {
      __html: `
      rudderanalytics=window.rudderanalytics=[];
      for(var methods=["load","page","track","identify","alias","group","ready","reset","getAnonymousId","setAnonymousId"],i=0;i<methods.length;i++){
          var method=methods[i];
          rudderanalytics[method]=function(a){
              return function(){
                  rudderanalytics.push([a].concat(Array.prototype.slice.call(arguments)))
              }
          }(method)
      }
      rudderanalytics.load("${writeKey}","${dataPlanUrl}"),
      rudderanalytics.page();
  `,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;0,600;0,700;0,900;1,100;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          {/* <!-- Google Tag Manager --> */}
          <script defer dangerouslySetInnerHTML={this.setGoogleTagManager()} />
          <script
            defer
            dangerouslySetInnerHTML={this.setRudderStack(
              RUDDER_STACK_WRITE_KEY,
              RUDDER_STACK_DATA_PLAN_URL
            )}
          />
          <script
            defer
            src="https://cdn.rudderlabs.com/rudder-analytics.min.js"
          />
          {/* <!-- End Google Tag Manager --> */}

          <script
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
            defer
          />
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src={GTM_NO_SCRIPT_URL_FINAL}
              height="0"
              width="0"
              style={{ visibility: 'hidden', display: 'hidden' }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
