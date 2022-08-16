import React from 'react';
import { Row, RowProps } from 'antd';

export type CardFormRowProps = RowProps;

export const CardFormRow: React.FC<CardFormRowProps> = React.memo(
  ({ children, ...rowProps }) => {
    return (
      <Row gutter={[16, 16]} {...rowProps}>
        {children}
      </Row>
    );
  }
);
