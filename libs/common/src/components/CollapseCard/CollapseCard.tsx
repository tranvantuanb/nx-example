import React from 'react';
import {
  Collapse as AntCollapse,
  Divider as AntDivider,
  Space,
  SpaceProps,
} from 'antd';
import tw, { styled } from 'twin.macro';

import { Icon, IconName } from '../Icon';

export interface CollapseCardProps {
  className?: string;
  /**
   * Icon on the left of the header.
   */
  icon?: IconName | JSX.Element;
  /**
   * Header title
   */
  header: React.ReactNode;
  /**
   * Sub header title
   */
  subheader?: React.ReactNode;
  /**
   * Set the collapse open as default
   */
  defaultActive?: boolean;
  /**
   * Collapse card content
   */
  children?: React.ReactNode;
  /**
   * Extra items adding to the right of the header
   */
  extra?: React.ReactNode;
}
export interface CollapseCardEditIconProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface CollapseCardInterface extends React.FC<CollapseCardProps> {
  Divider: typeof Divider;
  EditIcon: typeof EditIcon;
  FooterActions: typeof FooterActions;
}

const StyledCollapseCard = styled(AntCollapse)`
  ${tw`border-gray-200 bg-white`}
  .ant-collapse-item {
    ${tw`border-gray-200`}

    .ant-collapse-arrow {
      transition: all 0.3s ease-out;
      top: 24px !important;
      &.active {
        transform: translate(0, -6px) rotate(-180deg);
      }
    }
  }

  .ant-collapse-content {
    ${tw`border-t-0`}
    .ant-collapse-content-box {
      ${tw`pt-0`}
    }
  }

  form.ant-form {
    ${tw`mx-[8px]`}
  }
`;

const Divider = styled(AntDivider)`
  ${tw`my-[20px] border-gray-200`}
`;

const EditIcon: React.FC<CollapseCardEditIconProps> = ({
  className,
  onClick,
}) => (
  <button
    className={className}
    tw="absolute top-[-12px] right-[0px]"
    onClick={onClick}
  >
    <Icon name="edit" size="16px" />
  </button>
);

const FooterActions: React.FC<SpaceProps> = ({
  children,
  className,
  ...otherSpaceProps
}) => (
  <div className={className} tw="flex flex-row-reverse">
    <Space {...otherSpaceProps}>{children}</Space>
  </div>
);

const Header: React.FC<
  Pick<CollapseCardProps, 'icon' | 'header' | 'subheader'>
> = React.memo(({ icon, header, subheader }) => (
  <div className="header-wrapper flex flex-col">
    <div className="flex flex-row">
      {icon && (
        <div className="header-icon flex items-center mr-[12px]">
          {typeof icon === 'string' ? (
            <Icon name={icon as IconName} size="16px" color="black" />
          ) : (
            icon
          )}
        </div>
      )}
      <div className="header-content font-bold text-base">{header}</div>
    </div>
    {subheader && (
      <div className="subheader-content text-sm text-black-300 mt-[8px]">
        {subheader}
      </div>
    )}
  </div>
));

const Extra: React.FC<Pick<CollapseCardProps, 'extra'>> = React.memo(
  ({ extra }) =>
    !extra ? null : (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {extra}
      </div>
    )
);

const CollapseCard: CollapseCardInterface = ({
  className,
  icon,
  header,
  subheader,
  defaultActive = false,
  extra,
  children,
}) => {
  return (
    <StyledCollapseCard
      className={className}
      defaultActiveKey={defaultActive ? ['main-panel'] : undefined}
      expandIcon={({ isActive }) => (
        <Icon name="arrow-down" className={isActive ? 'active' : undefined} />
      )}
      expandIconPosition="end"
    >
      <AntCollapse.Panel
        header={<Header icon={icon} header={header} subheader={subheader} />}
        key="main-panel"
        extra={<Extra extra={extra} />}
      >
        <Divider className="mt-0" />
        <div className="relative">{children}</div>
      </AntCollapse.Panel>
    </StyledCollapseCard>
  );
};

CollapseCard.Divider = Divider;
CollapseCard.EditIcon = EditIcon;
CollapseCard.FooterActions = FooterActions;

export { CollapseCard };
