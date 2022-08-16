import React from 'react';
import { LoginForm } from '../LoginForm';

// import { Components as AuthComponents } from '@carro/auth';
interface ComponentProps {
  className?: string;
  onLoginSuccess?: (data) => void;
}

export const LoginPage: React.FC<ComponentProps> = ({
  className = '',
  onLoginSuccess,
}) => {
  console.log('login page');
  return (
    <div tw="h-screen flex justify-center items-center" className={className}>
      <div className="py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};
