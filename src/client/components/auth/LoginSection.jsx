import React from 'react';
import FormLogin from './FormLogin';
import WrapAuth from './WrapAuth';

function LoginSection() {
  return (
    <WrapAuth>
      <FormLogin action="/login" />
    </WrapAuth>
  );
}

export default LoginSection;
