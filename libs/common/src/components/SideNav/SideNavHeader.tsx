import React, { memo } from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';

interface Props {
  logoUrl: string;
  title: string;
  isExpanded: boolean;
  href: string;
  target?: string;
}

const StyledHeaderContainer = styled.a<{ isExpanded: boolean }>`
  ${tw`flex items-center h-[42px] ml-1`}
  ${({ isExpanded }) => (isExpanded ? tw`w-[202px]` : tw`w-[48px]`)}
`;

const StyledTitle = styled.span`
  ${tw`text-blue-500 font-bold ml-3 tracking-wider select-none`}
`;

export const SideNavHeader: React.FC<Props> = memo(
  ({ logoUrl, title, isExpanded, href, target = '_blank' }) => {
    return (
      <header
        aria-labelledby="navHeader"
        className="w-full flex justify-center"
      >
        <StyledHeaderContainer
          isExpanded={isExpanded}
          href={href}
          target={target}
          aria-label="headerLink"
        >
          <div className="w-[42px] h-[42px]">
            <Image key="header-logo" src={logoUrl} width={42} height={42} />
          </div>
          {isExpanded && <StyledTitle>{title}</StyledTitle>}
        </StyledHeaderContainer>
      </header>
    );
  }
);
