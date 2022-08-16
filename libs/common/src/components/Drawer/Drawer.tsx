import React from 'react';
import {
  Drawer as AntdDrawer,
  DrawerProps as AntdDrawerProps,
  Divider as AntDivider,
  Space,
  SpaceProps,
} from 'antd';
import tw, { styled } from 'twin.macro';
import { Icon } from '../Icon';

export interface DrawerProps extends AntdDrawerProps {
  loading?: boolean;
}

export interface DrawerEditIconProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IDrawer extends React.FC<DrawerProps> {
  Divider: typeof Divider;
  EditIcon: typeof EditIcon;
  FooterActions: typeof FooterActions;
}

const Divider = styled(AntDivider)`
  ${tw`my-[20px] border-gray-200`}
`;

const EditIcon: React.FC<DrawerEditIconProps> = ({ className, onClick }) => (
  <button
    className={className}
    tw="absolute top-[12px] right-[24px]"
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
  <div
    className={className}
    tw="flex flex-row-reverse border-t mt-[32px] pt-[16px]"
  >
    <Space {...otherSpaceProps}>{children}</Space>
  </div>
);

const StyledDrawer = styled(AntdDrawer)`
  .ant-drawer-title {
    ${tw`font-bold`}
  }

  .ant-drawer-content-wrapper {
    max-width: 85%;
  }

  .ant-drawer-header-title {
    ${tw`flex flex-row-reverse`}

    .ant-drawer-close {
      ${tw`mr-0`}
    }
  }

  .ant-drawer-body {
    position: relative;

    form.ant-form {
      ${tw`mx-[8px]`}
    }
  }
`;

const Drawer: IDrawer = (props) => {
  const { onClose, loading, extra, ...rest } = props;

  return (
    <StyledDrawer
      closable={false}
      width={480}
      maskClosable={!loading}
      onClose={onClose}
      extra={
        <div className="flex">
          {extra}
          <button className="ml-[16px]" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
      }
      {...rest}
    />
  );
};

Drawer.Divider = Divider;
Drawer.EditIcon = EditIcon;
Drawer.FooterActions = FooterActions;

export { Drawer };
