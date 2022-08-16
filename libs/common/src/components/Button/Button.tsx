import React, { memo } from 'react';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import tw, { css, styled } from 'twin.macro';

import { ButtonTheme, ButtonThemeTypeConfig } from './interfaces';
import { getThemeColors } from './utils';

export interface ButtonProps extends AntdButtonProps {
  theme?: ButtonTheme;
  href?: string;
}

type StyledButtonProps = ButtonProps & Partial<ButtonThemeTypeConfig>;

const styleButtonOptions = {
  shouldForwardProp: (prop: string) =>
    !['theme', 'colorText', 'colorBg', 'colorGhost'].includes(prop),
};

const StyleButton = styled(AntdButton, styleButtonOptions)<StyledButtonProps>`
  ${tw`flex items-center justify-center`}
  ${tw`text-[12px] h-[32px] `}
  ${tw`text-button uppercase font-bold border-0`}
  
  text-shadow: none;

  ${({ colorText, colorBg, disabled }) =>
    !disabled &&
    css`
      background-color: ${colorBg};
      color: ${colorText};

      &:hover,
      &:focus {
        background-color: ${colorBg};
        color: ${colorText};
      }
    `}
  ${({ ghost, colorGhost, disabled }) =>
    !disabled &&
    ghost &&
    css`
      background-color: #fff !important;
      color: ${colorGhost} !important;
      border: 1px solid ${colorGhost} !important;
    `}
  ${({ ghost, disabled }) =>
    disabled &&
    ghost &&
    css`
      background-color: #fff;
      border: 1px solid;
    `}
  &.ant-btn-lg {
    ${tw`h-[38px]`}
  }

  &.ant-btn-sm {
    ${tw`h-[24px]`}
  }
`;

export const Button = memo(
  React.forwardRef<any, ButtonProps>((props, ref) => {
    const { theme = 'primary', type = 'default' } = props;
    const colorConfig = getThemeColors({
      theme,
      type,
    });

    return <StyleButton {...colorConfig} ref={ref} {...props} />;
  })
);
