import React from 'react';
import tw, { styled } from 'twin.macro';

import { Text } from '../Text/Text';

export interface CardSectionProps {
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  noMargin?: boolean;
}

const StyledCardSection = styled.div<Pick<CardSectionProps, 'noMargin'>>`
  ${({ noMargin }) => !noMargin && tw`mb-[32px]`}
`;

export const CardSection: React.FC<CardSectionProps> = React.memo(
  ({ className, header, noMargin, children, ...props }) => {
    return (
      <StyledCardSection noMargin={noMargin} className={className} {...props}>
        {!!header && (
          <Text.Caption size="sm" uppercase className="mb-[16px]">
            {header}
          </Text.Caption>
        )}
        {children}
      </StyledCardSection>
    );
  }
);
