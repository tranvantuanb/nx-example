import React, { memo, ReactElement, useState } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AuthInterfaces } from '@carro/utils';
import { SideNavItem } from './SideNavItem';
import { SideNavHeader } from './SideNavHeader';
import { SideNavLanguage } from './SideNavLanguage';
import { SideNavCountry } from './SideNavCountry';
import { SideNavAvatar } from './SideNavAvatar';

export interface TopNavItemProps {
  name: string;
  href: string;
  icon: React.FC<{}>;
  pathname: string;
}

interface Props {
  navHeaderProps: {
    logoUrl: string;
    title: string;
    href: string;
    target?: string;
  };
  userInfo?: AuthInterfaces.CurrentUser;
  topNavItems: TopNavItemProps[];
  onLanguageChange?: (value: string) => void;
  onCountryChange?: (value: string) => void;
  currentLanguage?: string;
  currentCountry?: string;
  navFooterMenu: ReactElement;
}

const StyledNavContainer = styled.div`
  ${tw`w-[83px] h-full relative`}
`;

const StyledNav = styled.div<{ isExpanded: boolean }>`
  ${tw`absolute top-0 left-0 h-full flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto overflow-x-hidden z-50`}
  ${tw`transition-all	ease-out duration-300`}
  ${({ isExpanded }) => (isExpanded ? tw`w-[242px]` : tw`w-[83px]`)}
`;

export const SideNav: React.FC<Props> = memo(
  ({
    navHeaderProps,
    topNavItems = [],
    navFooterMenu,
    userInfo,
    onLanguageChange,
    onCountryChange,
    currentLanguage,
    currentCountry,
  }) => {
    const [expandNav, setExpandNav] = useState(false);
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
      <StyledNavContainer>
        <StyledNav
          isExpanded={expandNav}
          onMouseOver={() => setExpandNav(true)}
          onMouseEnter={() => setExpandNav(true)}
          onMouseLeave={() => setExpandNav(false)}
        >
          <SideNavHeader isExpanded={expandNav} {...navHeaderProps} />
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 bg-white space-y-1" aria-label="nav">
              {topNavItems.map((item) => (
                <SideNavItem
                  key={item.href}
                  navigationItem={item}
                  isActive={router.pathname === item.pathname}
                  isExpanded={expandNav}
                />
              ))}
            </nav>
          </div>

          <footer
            aria-label="footerLink"
            className="w-full flex justify-center flex-col items-center"
          >
            <SideNavCountry
              isExpanded={expandNav}
              value={currentCountry}
              onChange={onCountryChange}
            />
            <SideNavLanguage
              isExpanded={expandNav}
              value={currentLanguage}
              onChange={onLanguageChange}
            />
            <SideNavAvatar
              tw="mt-[70px]"
              userInfo={userInfo}
              isExpanded={expandNav}
              menuElement={navFooterMenu}
              // onMenuClick={onAvatarClick}
            />
          </footer>
        </StyledNav>
      </StyledNavContainer>
    );
  }
);
