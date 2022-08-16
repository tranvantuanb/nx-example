import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { Row, Col, ColProps, Form, FormItemProps } from 'antd';

import { CardFormContext } from '../CardFormContext';

const StyledFormItem = styled(Form.Item)`
  ${tw`mb-0`}
`;

export interface CardFormItemProps extends FormItemProps {
  /**
   * This function is to use for rendering custom UI in view mode.
   * E.g:
   * - render the form value into different formats
   * - render File Viewer
   */
  renderViewValue?: (value) => React.ReactNode;
  /**
   * This prop allows customization of the FormItem Col.
   * E.g: if we want to render 1 field as full width, pass in
   * colProps = { xs: 24 }
   */
  colProps?: ColProps;
}

const FormItemViewOnly: React.FC<CardFormItemProps> = React.memo(
  ({ renderViewValue = (val) => val, label, name, initialValue }) => {
    const form = Form.useFormInstance();
    const fieldValue = (name ? form.getFieldValue(name) : '') || initialValue;
    const viewValue = fieldValue ? renderViewValue(fieldValue) : '';

    return (
      <Row className="card-form-item-view-only flex">
        <Col span={8} className="text-sm font-bold text-black-300">
          {label}
        </Col>
        <Col span={16} className="text-sm font-bold truncate overflow-ellipsis">
          {viewValue}
        </Col>
      </Row>
    );
  }
);

export const CardFormItem: React.FC<CardFormItemProps> = React.memo(
  ({ className, colProps = {}, children, renderViewValue, ...otherProps }) => {
    const { isEditing } = useContext(CardFormContext);

    const mergedColProps = {
      span: isEditing ? 12 : 24,
      ...colProps,
    };

    return (
      <Col className={className} {...mergedColProps}>
        {!isEditing ? (
          <FormItemViewOnly renderViewValue={renderViewValue} {...otherProps} />
        ) : (
          <StyledFormItem {...otherProps}>{children}</StyledFormItem>
        )}
      </Col>
    );
  }
);
