import React from 'react';
import { Middleware } from 'redux';
import { notification, message } from 'antd';

import { CommonInterfaces } from '@carro/utils';

interface DefaultAlert {
  success: CommonInterfaces.ApiAlert;
  error: CommonInterfaces.ApiAlert;
}

const DEFAULT_ALERT: DefaultAlert = {
  success: {
    title: 'Success!',
    description: '',
    duration: 4,
    type: 'notification',
  },
  error: {
    title: 'Request failed!',
    description: '',
    duration: 4,
    type: 'notification',
  },
};

const showAlert = (
  alert: CommonInterfaces.ApiAlert | React.ReactNode,
  type: 'success' | 'error'
) => {
  const alertConfig = DEFAULT_ALERT[type];

  if (typeof alert === 'object') {
    const { title, description, type, duration } =
      alert as CommonInterfaces.ApiAlert;
    if (title) alertConfig.title = title;
    if (description) alertConfig.description = description;
    if (type) alertConfig.type = type;
    if (duration) alertConfig.duration = duration;
  } else {
    alertConfig.description = alert;
  }

  if (alertConfig.type === 'message') {
    message[type](alertConfig.description, alertConfig.duration);
  } else {
    notification[type]({
      message: alertConfig.title,
      description: alertConfig.description,
      duration: alertConfig.duration,
    });
  }
};

export const asyncActionMessages: Middleware = () => (next) => (action) => {
  const { type, meta = {}, payload } = action;
  const isServer = typeof window === 'undefined';
  const {
    successAlert,
    failureAlert,
  }: {
    successAlert?: CommonInterfaces.ApiAlert;
    failureAlert?: CommonInterfaces.ApiAlert;
  } = meta.arg?.originalArgs || {};

  if (!type || isServer) {
    return next(action);
  }

  if (type.endsWith('/fulfilled') && successAlert) {
    showAlert(successAlert, 'success');
  }

  if (type.endsWith('/rejected')) {
    if (failureAlert) {
      // show FE error alert
      showAlert(failureAlert, 'error');
      return;
    }

    // show BE error message
    if (payload?.data && payload.data !== 'Network Error') {
      const { message, errors } = payload.data;
      let description: string | Array<any> | React.ReactNode = '';

      if (typeof errors === 'string') {
        description = errors;
      } else if (errors) {
        description = (
          <ul>
            {Object.values(errors)
              .flat(1)
              .map((err, index) => (
                <li key={index}>{`- ${err}`}</li>
              ))}
          </ul>
        );
      }

      showAlert({ title: message, description }, 'error');
    }
  }

  return next(action);
};
