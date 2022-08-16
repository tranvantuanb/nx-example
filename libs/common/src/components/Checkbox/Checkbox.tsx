import React from 'react';
import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from 'antd';
import tw, { styled } from 'twin.macro';

export type CheckboxProps = AntdCheckboxProps;

const StyledCheckbox = styled(AntdCheckbox)``;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <StyledCheckbox {...props} />;
};
