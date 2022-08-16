import React from 'react';
import tw, { styled, css } from 'twin.macro';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';

const { Text: AntText } = Typography;

export interface CaptionProps {
  size?: 'sm' | 'base' | 'lg' | '2xl';
  uppercase?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const styledTextOptions = {
  shouldForwardProp: (prop: string) => !['uppercase'].includes(prop),
};

const StyledText = styled(AntText, styledTextOptions)<CaptionProps>`
  ${(props) => props.uppercase && tw`uppercase`}

  strong {
    ${tw`font-bold`}
  }
`;

const StyledTextCaption = styled(StyledText)<CaptionProps>`
  ${(props) => props.size === 'sm' && tw`text-sm`}
  ${(props) => props.size === 'base' && tw`text-base`}
  ${(props) => props.size === 'lg' && tw`text-lg`}
  ${(props) => props.size === '2xl' && tw`text-2xl`}
`;

interface IText extends React.FC<TextProps & CaptionProps> {
  Caption: typeof Caption;
}

const Text: IText = ({ children, ...otherProps }) => (
  <StyledText {...otherProps}>{children}</StyledText>
);

const Caption: React.FC<CaptionProps> = ({ children, ...otherProps }) => (
  <StyledTextCaption tw="block" strong {...otherProps}>
    {children}
  </StyledTextCaption>
);

Text.Caption = Caption;

export { Text };
