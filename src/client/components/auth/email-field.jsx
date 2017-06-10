import React from 'react';

import s from './auth.styl';

function EmailField({error, ...props}) {
  return (
    <div className={s.row} >
      <label className={s.label}>Email</label>
      <input
        className={s.inputText}
        type="text"
        name="email"
        {...props}
        />
      {error ?
        <p className={s.error}>{error}</p> :
        null
      }
    </div>
  );
}

export default EmailField;
