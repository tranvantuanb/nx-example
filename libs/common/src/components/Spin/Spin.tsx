import React from 'react';
import { Spin as AntdSpin, SpinProps as AntdSpinProps } from 'antd';
import tw, { styled } from 'twin.macro';

export interface SpinProps extends AntdSpinProps {
  centered?: boolean;
}

const options = {
  shouldForwardProp: (prop: string) => !['centered'].includes(prop),
};

const StyledSpin = styled(AntdSpin, options)`
  ${(centered) => centered && tw`relative flex justify-center`}
`;

export const Spin: React.FC<SpinProps> = (props) => {
  return <StyledSpin {...props} />;
};
