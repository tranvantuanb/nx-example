import { Form } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { Space } from '../Space';
import { CardFormContext } from './CardFormContext';

export interface CardFormActionsProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const CardFormActions: React.FC<CardFormActionsProps> = React.memo(
  ({ onCancel, isSubmitting }) => {
    const { t } = useTranslation('common');
    const { setEditing } = useContext(CardFormContext);
    const form = Form.useFormInstance();

    const handleCancel = () => {
      setEditing(false);
      form.resetFields();
      onCancel?.();
    };

    return (
      <Space>
        <Button type="text" onClick={handleCancel}>{t`Cancel`}</Button>
        <Button
          htmlType="submit"
          type="primary"
          loading={!!isSubmitting}
        >{t`Done`}</Button>
      </Space>
    );
  }
);
