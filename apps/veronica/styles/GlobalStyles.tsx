import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';

import {
  GlobalStyleNotification,
  GlobalScrollbar,
} from '@carro/common/components';

import antdTheme from './antdTheme';

const customStyles = css`
  body {
    ${tw`antialiased text-black-base`}
    // TODO: Style button with href props, should move into @rabbit/common/components/Button
    a.ant-btn {
      ${tw`!pt-[12px] leading-none`}
    }

    .ant-dropdown {
      min-width: unset !important;
    }

    .backstage-primary-btn {
      ${tw`bg-[#5E81F4]`}

      &:hover, &:focus, &:active {
        ${tw`bg-[#5E81F4] border-[#5E81F4]`}
      }
    }

    .backstage-text-btn {
      ${tw`text-[#5E81F4]`}

      &:hover, &:focus, &:active {
        ${tw`text-[#5E81F4]`}
      }
    }

    .filters-body .ant-modal-content {
      border-radius: 20px !important;
    }
  }

  #__next,
  .app {
    ${tw`h-full`}
  }

  // Fixing some icon not align center
  svg {
    vertical-align: baseline;
  }

  :root {
    ${css(
      Object.keys(antdTheme).reduce((obj, key) => {
        obj[key.replace('@', '--')] = antdTheme[key];
        return obj;
      }, {})
    )}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
    <GlobalStyleNotification />
    <GlobalScrollbar />
  </>
);

export default GlobalStyles;
