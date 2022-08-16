import React from 'react';
import { Global } from '@emotion/react';
import tw, { css } from 'twin.macro';
import { notification as antNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import { Icon } from '../Icon';

export const GlobalStyleNotification: React.FC = () => {
  return (
    <Global
      styles={css`
        .ant-notification-notice-message {
          ${tw`font-bold`}
        }

        .ant-notification-notice-success {
          ${tw`border-l-4 border-solid border-success`}
        }

        .ant-notification-notice-warning {
          ${tw`border-l-4 border-solid border-warning`}
        }

        .ant-notification-notice-error {
          ${tw`border-l-4 border-solid border-danger`}
        }

        .ant-notification-notice-info {
          ${tw`border-l-4 border-solid border-info`}
        }
      `}
    />
  );
};

const commonConfig: Partial<ArgsProps> = {
  closeIcon: <Icon name="close" />,
  duration: 5,
};

const success = (config: ArgsProps) => {
  const successConfig = {
    icon: <Icon size="24px" name="success" />,
  };
  antNotification.success({ ...commonConfig, ...successConfig, ...config });
};

const error = (config: ArgsProps) =>
  antNotification.error({ ...commonConfig, ...config });

const info = (config: ArgsProps) =>
  antNotification.info({ ...commonConfig, ...config });

const warning = (config: ArgsProps) =>
  antNotification.warning({ ...commonConfig, ...config });

const warn = (config: ArgsProps) =>
  antNotification.warn({ ...commonConfig, ...config });

const open = (config: ArgsProps) =>
  antNotification.open({ ...commonConfig, ...config });

const close = (key: string) => antNotification.close(key);

const destroy = () => antNotification.destroy();

export const notification = {
  success,
  error,
  info,
  warning,
  warn,
  open,
  close,
  destroy,
};
