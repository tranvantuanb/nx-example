import React from 'react';
import { MenuProps } from 'antd';

export type MenuItemProps = Required<MenuProps>['items'][number];

export const getMenuItem = ({
  key,
  label,
  children,
  icon,
  type,
}: {
  label: React.ReactNode;
  key?: React.Key | null;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
  type?: 'group' | 'divider';
}): MenuItemProps => {
  return {
    key,
    children,
    label,
    icon,
    type,
  } as MenuItemProps;
};
