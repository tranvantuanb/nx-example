import React, { useContext, useEffect } from 'react';
import { Form, FormProps } from 'antd';

import { CardFormContext, CardFormContextProvider } from './CardFormContext';
import {
  CardFormItem,
  CardFormItemProps as CardFormItemPropsInternal,
} from './CardFormItem/CardFormItem';

import {
  CardFormRow,
  CardFormRowProps as CardFormRowPropsInternal,
} from './CardFormRow';

import {
  CardFormActions,
  CardFormActionsProps as CardFormActionsPropsInternal,
} from './CardFormActions';

export interface CardFormProps {
  className?: string;
  /**
   * Children components should be CardForm.Item
   */
  children?: React.ReactNode;
  /**
   * Prop to control View/Editing mode
   */
  isEditing?: boolean;
  /**
   * Prop to indicate if the form is for newly creating
   */
  mode?: 'create' | 'edit';
}

export type CardFormItemProps = CardFormItemPropsInternal;
export type CardFormRowProps = CardFormRowPropsInternal;
export type CardFormActionsProps = CardFormActionsPropsInternal;
interface ICardForm extends React.FC<CardFormProps & FormProps> {
  Item: typeof CardFormItem;
  Row: typeof CardFormRow;
  Actions: typeof CardFormActions;
}

const CardForm: ICardForm = ({
  children,
  isEditing,
  mode,
  ...antFormProps
}) => {
  const { setEditing, setMode } = useContext(CardFormContext);

  useEffect(() => {
    setEditing(!!isEditing);
    setMode(mode || 'edit');
  }, [isEditing, mode, setEditing, setMode]);

  return (
    <Form layout="vertical" {...antFormProps}>
      {children}
    </Form>
  );
};

const withCardFormContext = <T,>(WrappedComponent) => {
  const Wrapper = React.memo((props: T) => (
    <CardFormContextProvider>
      <WrappedComponent {...props} />
    </CardFormContextProvider>
  ));
  return Wrapper;
};

CardForm.Item = CardFormItem;
CardForm.Row = CardFormRow;
CardForm.Actions = CardFormActions;

export { CardForm, withCardFormContext };
