import React from 'react';
import FormSignup from './form-signup';

import s from './auth.styl';

function SignupSection() {
  return (
    <div className={s.section}>
      <FormSignup action="/signup"/>
    </div>
  );
}

export default SignupSection;
