import React from 'react';
import {
  Popconfirm as AntdPopconfirm,
  PopconfirmProps as AntdPopconfirmProps,
} from 'antd';

export const Popconfirm: React.FC<AntdPopconfirmProps> = (props) => {
  return (
    <AntdPopconfirm
      okButtonProps={{
        style: {
          minWidth: '54px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '22px',
          textTransform: 'uppercase',
        },
      }}
      cancelButtonProps={{
        type: 'text',
        style: {
          fontWeight: 900,
          fontSize: '12px',
          lineHeight: '14px',
          textTransform: 'uppercase',
          color: '#8181A5',
        },
      }}
      {...props}
    />
  );
};
