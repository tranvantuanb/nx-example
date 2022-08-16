import React from 'react';
import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';
import tw, { styled, css } from 'twin.macro';

const StyledCollapse = styled(AntdCollapse)<CollapseProps>``;

const StyledCollapsePanel = styled(AntdCollapse.Panel)<CollapsePanelProps>`
  border-bottom: 1px solid white !important;

  .ant-collapse-header {
    ${tw`text-sm font-bold bg-slate-500 uppercase`}

    color: #ffffff !important;
    padding: 7.5px 20px !important;
    line-height: 17px !important;

    ${({ bgColor }) =>
      bgColor &&
      css`
        background-color: ${bgColor};
      `}
  }

  .ant-collapse-content-box {
    ${tw`p-0 bg-white`}

    padding-top: 0 !important;
  }
`;

interface CollapsePanelProps extends AntdCollapsePanelProps {
  children: React.ReactNode;
  bgColor?: string;
}

const CollapsePanel: React.FC<CollapsePanelProps> = ({
  children,
  bgColor,
  ...otherProps
}) => {
  return (
    <StyledCollapsePanel bgColor={bgColor} {...otherProps}>
      {children}
    </StyledCollapsePanel>
  );
};

interface CollapseProps extends AntdCollapseProps {
  children: React.ReactNode;
}

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseInterface = ({ children, ...otherProps }) => {
  return <StyledCollapse {...otherProps}>{children}</StyledCollapse>;
};

Collapse.Panel = CollapsePanel;

export { Collapse };
