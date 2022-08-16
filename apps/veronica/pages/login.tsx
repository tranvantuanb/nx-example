import React from 'react';

import { LoginPage } from '@carro/backstage/components';
import { setUserCountryCode } from '@carro/utils/helpers/auth';

const BackStageLoginPage = () => {
  const handleLoginSuccess = (data) => {
    setUserCountryCode(data.user?.country?.country_code);
  };

  return (
    <div>
      <LoginPage onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default BackStageLoginPage;
