import React from 'react';
import { Input } from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input/TextArea';
import tw, { styled, theme } from 'twin.macro';

const { TextArea: AntdTextArea } = Input;

export type TextAreaProps = AntdTextAreaProps;

const StyledTextArea = styled(AntdTextArea)<TextAreaProps>`
  ${({ disabled }) => disabled && tw`!text-slate-500 !bg-gray-100`}
`;

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <StyledTextArea {...props} />;
};
