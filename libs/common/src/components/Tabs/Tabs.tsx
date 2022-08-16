import React, { memo } from 'react';
import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from 'antd';
import tw, { css, styled } from 'twin.macro';

export interface TabsProps extends AntdTabsProps {
  primary?: boolean;
  fullWidth?: boolean;
  hideMoreAction?: boolean;
}

const AntdTabsWrapper: React.FC<TabsProps> = memo(({ primary, ...props }) => {
  return <AntdTabs {...props} />;
});

const options = {
  shouldForwardProp: (prop: string) =>
    !['fullWidth', 'hideMoreAction'].includes(prop),
};

export const Tabs = styled(AntdTabsWrapper, options)<TabsProps>`
  .ant-tabs-tab {
    ${tw`pb-[8px] pt-0`}
  }

  .ant-tabs-nav {
    ${tw`mb-0`}
  }

  .ant-tabs-tab-btn {
    ${tw`text-sm p-[8px] rounded-[4px] text-black-base font-bold`}
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      ${({ primary }) =>
        primary ? tw`bg-blue-50 text-blue-500` : tw`bg-blue-500 text-white`}
    }
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      .ant-tabs-nav-list {
        width: 100%;

        .ant-tabs-tab {
          width: 100%;
          margin: 0;

          .ant-tabs-tab-btn {
            width: 100%;
            text-align: center;
          }
        }
      }
    `}

  ${({ hideMoreAction }) =>
    hideMoreAction &&
    css`
      .ant-tabs-nav-operations {
        ${tw`!hidden`}
      }
    `}
`;
