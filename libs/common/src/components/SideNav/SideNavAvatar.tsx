import React, { memo, ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

import { AuthInterfaces } from '@carro/utils';
import { Dropdown } from '../Dropdown';
import { Avatar } from '../Avatar';

interface Props {
  isExpanded: boolean;
  userInfo?: AuthInterfaces.CurrentUser;
  menuElement: ReactElement;
}

const StyledHeaderContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`flex items-center h-[42px] ml-1 cursor-pointer`}
  ${({ isExpanded }) =>
    isExpanded ? tw`w-[202px]` : tw`w-[48px] justify-center`}
`;

const StyledTitle = styled.span`
  ${tw`whitespace-nowrap text-slate-500 ml-3 text-[14px] font-bold ml-3 tracking-wider select-none `}
`;

const StyledImageContainer = styled.div`
  ${tw`w-[32px] h-[32px]`}
  & img {
    ${tw`rounded-full`}
  }
`;

export const SideNavAvatar: React.FC<Props> = memo(
  ({ userInfo, isExpanded, menuElement, ...rest }) => {
    // const [logout] = authApi.useLogoutMutation();
    const { name, profile_image } = userInfo || {};

    return (
      <Dropdown
        key={`${isExpanded}`}
        overlay={menuElement}
        trigger={['click']}
        placement="topLeft"
        {...rest}
      >
        <StyledHeaderContainer isExpanded={isExpanded}>
          <StyledImageContainer>
            <Avatar src={profile_image?.cdn_thumbnail_url ?? undefined}>
              {name}
            </Avatar>
          </StyledImageContainer>
          {isExpanded && <StyledTitle>{name}</StyledTitle>}
        </StyledHeaderContainer>
      </Dropdown>
    );
  }
);
