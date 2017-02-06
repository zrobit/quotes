import React from 'react';
import FormLogin from './FormLogin';

import s from './auth.styl';

function LoginSection() {
  return (
    <div className={s.section}>
      <FormLogin action="/login" />
    </div>
  );
}

export default LoginSection;
