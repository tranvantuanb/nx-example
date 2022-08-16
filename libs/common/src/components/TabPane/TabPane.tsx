import React, { memo } from 'react';
import { TabPaneProps as AntdTabPaneProps, Tabs as AntdTabs } from 'antd';
import { styled } from 'twin.macro';

export type TabPaneProps = AntdTabPaneProps;

const StyleTabPane = styled(AntdTabs.TabPane)<AntdTabPaneProps>``;

export const TabPane: React.FC<TabPaneProps> = memo((props) => {
  return <StyleTabPane {...props} />;
});
