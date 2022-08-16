import React from 'react';
import { Divider as AntdDivider, DividerProps as AntdDividerProps } from 'antd';
import tw, { css, styled } from 'twin.macro';

export interface DividerProps extends AntdDividerProps {
  color?: string;
  borderStyle?:
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'inset'
    | 'outset'
    | 'ridge'
    | 'solid';
}

const styledDividerOptions = {
  shouldForwardProp: (prop: string) => !['borderStyle'].includes(prop),
};

const StyledDivider = styled(AntdDivider, styledDividerOptions)<DividerProps>`
  ${({ color }) =>
    color
      ? css`
          border-top-color: ${color};
          border-left-color: ${color};
        `
      : tw`border-t-slate-500 border-l-slate-500`}
  ${({ borderStyle }) =>
    borderStyle &&
    css`
      border-style: ${borderStyle};
    `}
`;

export const Divider: React.FC<DividerProps> = (props) => {
  return <StyledDivider {...props} />;
};
