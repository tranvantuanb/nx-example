import React from 'react';
import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import tw, { styled } from 'twin.macro';
import colors from 'tailwindcss/colors';

export type AvatarProps = AntdAvatarProps;

const listColors = Object.keys(colors).reduce((result: string[], key) => {
  if (typeof colors[key] !== 'object') return result;

  return [...result, colors[key][100]];
}, []);

const getBackground = (children) => {
  if (typeof children !== 'string') return undefined;

  return listColors[(children?.codePointAt(0) ?? 0) % listColors.length];
};

const StyledAvatar = styled(AntdAvatar)`
  ${tw`font-bold !text-xs leading-[32px] text-black-base`}
  background-color: ${({ children }) => getBackground(children)}
`;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { children, ...rest } = props;
  const modifiedChildren =
    typeof children === 'string' && children.length > 1
      ? children.slice(0, 1).toUpperCase()
      : children;

  return <StyledAvatar {...rest}>{modifiedChildren}</StyledAvatar>;
};
