import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import tw, { styled } from 'twin.macro';

// todo: antd has not export AvatarGroupProps yet
export type AvatarGroupProps = Record<string, unknown>;

const StyledAvatarGroup = styled(AntdAvatar.Group)``;

export const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  return <StyledAvatarGroup {...props} />;
};
