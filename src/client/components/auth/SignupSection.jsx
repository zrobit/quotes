import React from 'react';
import FormSignup from './FormSignup';
import WrapAuth from './WrapAuth';

function SignupSection() {
  return (
    <WrapAuth>
      <FormSignup action="/signup"/>
    </WrapAuth>
  );
}

export default SignupSection;
