import React from 'react';

import ErrorField from './ErrorField';

function PasswordField({error, ...props}){
  return(
    <div>
      <label>Password</label>
      <input
        className="in-text"
        type="password"
        name="password"
        {...props}
      />
      {error
        ? <ErrorField message={error}/>
        : null
      }
    </div>
  )
}

export default PasswordField;
