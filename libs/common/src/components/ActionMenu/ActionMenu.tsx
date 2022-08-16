import tw, { styled } from 'twin.macro';
import { Menu } from 'antd';

export const ActionMenu = styled(Menu)`
  ${tw`p-0 overflow-hidden min-w-[150px]`}
  .ant-dropdown-menu-item {
    ${tw`py-[12px] px-[14px] text-blue-600 font-bold text-xs uppercase`}
    &.ant-dropdown-menu-item-disabled {
      ${tw`text-slate-300`}
    }
  }

  .ant-dropdown-menu-submenu-title {
    ${tw`py-[12px] px-[14px] text-blue-600 font-bold text-xs uppercase`}

    .ant-dropdown-menu-submenu-arrow-icon {
      ${tw`text-blue-600 text-xs`}
    }
  }
`;

export const ActionMenuItem = styled(Menu.Item)`
  ${tw`py-[12px] px-[14px] text-blue-600 font-bold text-xs uppercase`}
  &.ant-dropdown-menu-item-disabled {
    ${tw`text-slate-300`}
  }
`;
