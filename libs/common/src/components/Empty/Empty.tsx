import React from 'react';
import tw, { styled } from 'twin.macro';
import { Empty as AntdEmpty, EmptyProps as AntdEmptyProps } from 'antd';

export type EmptyProps = AntdEmptyProps;

const StyledEmpty = styled(AntdEmpty)`
  .ant-empty-description {
    ${tw`text-slate-500 font-bold`}
  }
`;

export const Empty = (props: EmptyProps) => {
  return <StyledEmpty {...props} />;
};
