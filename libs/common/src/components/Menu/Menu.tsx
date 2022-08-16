import tw, { css, styled } from 'twin.macro';
import { MenuRef } from 'rc-menu';
import { Menu as AntdMenu, MenuProps as AntdMenuProps } from 'antd';
import React from 'react';
import { Global } from '@emotion/react';

const StyledMenu = styled(AntdMenu)`
  ${tw`p-0 overflow-hidden`}
  .ant-dropdown-menu-submenu {
    ${tw`p-0`}
    .ant-dropdown-menu-submenu-title {
      ${tw`py-[10px] px-[14px]`}
      .ant-dropdown-menu-title-content {
        ${tw`pr-[15px]`}
      }

      .ant-dropdown-menu-submenu-expand-icon {
        ${tw`mt-[-2px]`}
      }
    }
  }
`;

const InternalMenu = React.forwardRef<any, AntdMenuProps>((props, ref) => {
  return (
    <>
      <Global
        styles={css`
          .ant-dropdown-menu-sub {
            ${tw`max-h-[400px] overflow-auto`}

            .ant-dropdown-menu-item {
              ${tw`py-[10px] px-[14px]`}
            }
          }
        `}
      />
      <StyledMenu ref={ref} {...props} />
    </>
  );
});

export interface MenuItemInterface {
  label: React.ReactNode;
  key: string | number;
  icon: React.ReactNode;
  className?: string;
}

export const MenuItem = styled(AntdMenu.Item)`
  ${tw`py-[12px] px-[14px] uppercase`}
`;
export const SubMenu = styled(AntdMenu.SubMenu)`
  ${tw`p-0 overflow-hidden`}
`;

export class Menu extends React.Component<AntdMenuProps, {}> {
  static Divider = AntdMenu.Divider;

  static Item = MenuItem;

  static SubMenu = SubMenu;

  static ItemGroup = AntdMenu.ItemGroup;

  menu: MenuRef | null;

  constructor(props) {
    super(props);
    this.menu = null;
  }

  override render() {
    return (
      <InternalMenu
        ref={(node) => {
          this.menu = node;
        }}
        {...this.props}
      />
    );
  }
}
