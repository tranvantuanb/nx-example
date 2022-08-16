import React from 'react';
import { Spin } from './Spin';

const OnePageSpin = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin spinning size="large" />
    </div>
  );
};

export default OnePageSpin;
