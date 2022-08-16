import React, { memo } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { TopNavItemProps } from './SideNav';

interface Props {
  navigationItem: TopNavItemProps;
  isActive: boolean;
  isExpanded: boolean;
}

interface StyledProps {
  isActive: boolean;
  isExpanded?: boolean;
}

const StyledIcon = styled.span<StyledProps>`
  ${tw`text-[19px] h-8 w-6 rounded-lg grid place-content-center`}

  ${({ isActive }) =>
    isActive
      ? tw`text-indigo-500 text-[19px]`
      : tw`text-gray-400 group-hover:text-gray-500`}
`;

const StyledNavContainer = styled.div`
  ${tw`bg-white flex justify-between`}
`;

const StyledNavLink = styled.div<StyledProps>`
  ${tw`flex items-center px-3 py-2 text-base rounded-md`}
  ${tw`transition-all	ease-out`}
  ${tw`hover:cursor-pointer`}

  ${({ isActive }) =>
    isActive ? tw`bg-blue-50` : tw`bg-white hover:bg-gray-100`}

  ${({ isExpanded }) => (isExpanded ? tw`w-[202px]` : tw`w-[48px]`)}
`;

const StyledHighlight = styled.div`
  ${tw`bg-indigo-500 w-[2px]`}
`;

const StyledTitle = styled.p<StyledProps>`
  ${tw`ml-2 text-[14px] select-none whitespace-nowrap`}

  ${({ isActive }) => (isActive ? tw`text-black-base` : tw`text-gray-500`)}
`;

export const SideNavItem: React.FC<Props> = memo(
  ({ navigationItem, isActive = false, isExpanded = true }) => {
    const { name, href } = navigationItem;
    const Icon = navigationItem.icon;

    return (
      <StyledNavContainer data-testid="nav-item">
        <div className="flex justify-center w-full">
          <Link href={href}>
            <StyledNavLink
              className="nav-link"
              isExpanded={isExpanded}
              isActive={isActive}
            >
              <StyledIcon className="group" isActive={isActive}>
                <Icon />
              </StyledIcon>
              {isExpanded && (
                <StyledTitle isActive={isActive}>{name}</StyledTitle>
              )}
            </StyledNavLink>
          </Link>
        </div>
        {isActive && <StyledHighlight />}
      </StyledNavContainer>
    );
  }
);
