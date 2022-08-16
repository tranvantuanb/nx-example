import React from 'react';
import { Tag as AntTag, TagProps as AntdTagProps } from 'antd';
import tw, { styled, css } from 'twin.macro';

export interface TagProps {
  className?: string;
  children?: React.ReactNode;
  uppercase?: boolean;
  color?: string;
  ghost?: boolean;
  backgroundColor?: string; // doesn't support with ghost
}

const StyledTag = styled(AntTag, {
  shouldForwardProp: (prop: string) =>
    !['uppercase', 'ghost', 'type', 'backgroundColor'].includes(prop),
})<TagProps>`
  ${tw`py-px px-3 font-semibold text-xs leading-5 border-slate-300 mr-0`}
  ${({ uppercase }) => uppercase && tw`uppercase`}
  ${({ color, ghost, backgroundColor }) => {
    if (!color) return tw`bg-white text-slate-500`;

    if (!backgroundColor) {
      switch (color) {
        // custom presets
        case 'info':
          return ghost
            ? tw`text-blue-500 bg-white border-blue-500`
            : tw`text-white bg-blue-500 border-none`;
        case 'warning':
          return ghost
            ? tw`text-amber-400 bg-white border-amber-400`
            : tw`text-white bg-amber-400 border-none`;
        case 'success':
          return ghost
            ? tw`text-emerald-400 bg-white border-emerald-400`
            : tw`text-white bg-emerald-400 border-none`;
        case 'danger':
          return ghost
            ? tw`text-rose-400 bg-white border-rose-400`
            : tw`text-white bg-rose-400 border-none`;
        default:
          // default antd presets
          if (!color?.startsWith('#')) return tw`border-0`;

          // no ghost
          if (!ghost) return tw`border-0`;

          // ghost
          return css`
            border-color: ${color};
            background-color: white !important;
            color: ${color};
          `;
      }
    } else {
      return css`
        border: none;
        background-color: ${backgroundColor} !important;
        color: ${color};
      `;
    }
  }}
`;

export const Tag: React.FC<TagProps & AntdTagProps> = React.memo(
  ({
    className,
    children,
    uppercase,
    ghost,
    backgroundColor,
    ...otherAntTagProps
  }) => {
    return (
      <StyledTag
        className={className}
        uppercase={uppercase}
        ghost={ghost}
        backgroundColor={backgroundColor}
        {...otherAntTagProps}
      >
        {children}
      </StyledTag>
    );
  }
);
