import React from 'react';
import { Alert as AntdAlert, AlertProps as AntdAlertProps } from 'antd';
import tw, { css, styled } from 'twin.macro';

/* eslint-disable-next-line */
export interface AlertProps extends AntdAlertProps {}

const StyledAlert = styled(AntdAlert)``;

export const Alert: React.FC<AlertProps> = (props) => {
  return <StyledAlert {...props} />;
};
