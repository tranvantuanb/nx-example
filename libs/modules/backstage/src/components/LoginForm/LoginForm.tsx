import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import { Form } from 'antd';
import { useGTMEvent } from '@carro/core/hooks/useGTMEvent';

import {
  CardForm,
  Input,
  Button,
  Alert,
  Checkbox,
  withCardFormContext,
} from '@carro/common/components';

import { setAccessToken } from '@carro/utils/helpers/auth';
import { AuthApi } from '@carro/auth';

const StyledHeader = styled.div`
  ${tw`text-center`}
  .create-one {
    ${tw`text-info`}
  }
`;

interface ComponentProps {
  onLoginSuccess?: (data) => void;
}

const LoginFormInternal: React.FC<ComponentProps> = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [isDisableSubmitBtn, setIsDisableSubmitBtn] = useState(true);

  const router = useRouter();
  const { t } = useTranslation('auth');
  const [login, { isLoading, isError }] = AuthApi.useLoginByEmailMutation();

  const { pushGTMEvent } = useGTMEvent();

  const handleSubmitForm = async (values) => {
    const res = await login(values).unwrap();
    if (res?.data?.access_token) {
      onLoginSuccess?.(res?.data);

      setAccessToken(res.data.access_token);
      const salesperson = res?.data?.user;

      pushGTMEvent({
        event: 'logged_in',
        page_name: 'login',
        salesperson_id: salesperson.id,
        salesperson_name: salesperson.name,
      });

      const page = (router.query['redirectUrl'] as string) || '/';

      router.push(page);
    }
  };

  const handleFieldValueChange = () => {
    const isExistFieldValue = Object.values(form.getFieldsValue(true)).every(
      (value) => value
    );
    setIsDisableSubmitBtn(!isExistFieldValue);
  };

  const handleRememberMe = (e) => {
    console.log('remember me: ', e.target.checked);
  };

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <StyledHeader>
        <div className="flex justify-center">
          <img
            className="h-12 w-auto"
            src="/img/veronica-logo.svg"
            alt="veronica"
          />
        </div>
        <div className="mt-8 mb-4 text-[40px] font-bold">Welcome back!</div>
        <div className="mt-8 mb-4 text-[40px] font-bold">
          Welcome back TuanTV!
        </div>
        <div className="text-xs">
          <span>Don’t have an account yet?</span>
          <a href="#" className="ml-2 text-xs font-black text-info">
            Create one!
          </a>
        </div>
      </StyledHeader>
      <div className="mt-8">
        <CardForm
          form={form}
          name="login-form"
          isEditing
          onFinish={handleSubmitForm}
        >
          <CardForm.Row>
            <CardForm.Item
              name="email"
              label={t('Email')}
              colProps={{ span: 24 }}
            >
              <Input
                placeholder={t('Email')}
                onChange={handleFieldValueChange}
              />
            </CardForm.Item>
            <CardForm.Item
              className="password-input"
              name="password"
              label={
                <div className="password">
                  <span>{t('Password')}</span>
                </div>
              }
              colProps={{ span: 24 }}
            >
              <Input
                type="password"
                placeholder={t('Password')}
                onChange={handleFieldValueChange}
              />
            </CardForm.Item>

            <CardForm.Item colProps={{ span: 24 }}>
              <Checkbox onChange={handleRememberMe}>
                {t('Remember me on this device')}!
              </Checkbox>
              <a href="#" className="font-black text-xs text-info float-right">
                {t('Forgot password')}
              </a>
            </CardForm.Item>

            <CardForm.Item colProps={{ span: 24 }} shouldUpdate>
              {() => (
                <Button
                  className="backstage-primary-btn"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  disabled={!form.isFieldsTouched(true) || isDisableSubmitBtn}
                >
                  {t('Sign in')}
                </Button>
              )}
            </CardForm.Item>

            <CardForm.Item colProps={{ span: 24 }}>
              {isError && (
                <Alert
                  style={{ marginBottom: '16px' }}
                  message={t('Login failed! Wrong email or password.')}
                  type="error"
                  showIcon
                />
              )}
            </CardForm.Item>
          </CardForm.Row>
        </CardForm>
      </div>
    </div>
  );
};

export const LoginForm = withCardFormContext<ComponentProps>(LoginFormInternal);
