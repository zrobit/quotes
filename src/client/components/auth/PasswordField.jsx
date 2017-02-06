import React from 'react';

import ErrorField from './ErrorField';

import s from './auth.styl'

function PasswordField({error, ...props}){
  return(
    <div className={s.row}>
      <label className={s.label} >Password</label>
      <input
        className={s.inputText}
        type="password"
        name="password"
        {...props}
      />
      {error
        ? <p className={s.error}>{error}</p>
        : null
      }
    </div>
  )
}

export default PasswordField;
