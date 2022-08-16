import React from 'react';
import {
  Progress as AntdProgress,
  ProgressProps as AntdProgressProps,
} from 'antd';

export type ProgressProps = AntdProgressProps;

export const Progress: React.FC<ProgressProps> = React.memo((props) => {
  return <AntdProgress {...props} />;
});
