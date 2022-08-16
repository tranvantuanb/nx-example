import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Global } from '@emotion/react';
import { css } from 'twin.macro';

// https://github.com/react-component/overflow/issues/6
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface GlobalScrollbarProps {
  className?: string;
}

/**
 * Customize website's scrollbar like Mac OS only in other's OS.
 * The customization is not applied in Mac OS.
 */
export const GlobalScrollbar: React.FC<GlobalScrollbarProps> = React.memo(
  ({ className }) => {
    const [isApple, setIsApple] = useState(true);

    useIsomorphicLayoutEffect(() => {
      const isNotApple = !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      if (isNotApple) {
        setIsApple(false);
      }
    }, []);

    return isApple ? null : (
      <Global
        styles={css`
          /* total width */
          ::-webkit-scrollbar {
            background-color: #fff;
            width: 16px;
          }

          /* background of the scrollbar except button or resizer */
          ::-webkit-scrollbar-track {
            background-color: #fff;
          }

          /* scrollbar itself */
          ::-webkit-scrollbar-thumb {
            background-color: #babac0;
            border-radius: 16px;
            border: 4px solid #fff;
          }

          /* set button(top and bottom of the scrollbar) */
          ::-webkit-scrollbar-button {
            display: none;
          }
        `}
      />
    );
  }
);
