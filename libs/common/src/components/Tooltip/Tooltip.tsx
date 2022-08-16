import React from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipProps as AntdTooltipProps } from 'antd/lib/tooltip';

type TooltipProps = AntdTooltipProps;

const StyledTooltip = styled(AntdTooltip)``;

export const Tooltip = (props: TooltipProps) => {
  return (
    <StyledTooltip
      // @ts-ignore
      color={tw`bg-blue-500/50`['backgroundColor']}
      overlayStyle={{ maxWidth: '500px' }}
      {...props}
    />
  );
};
