import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import ErrorField from './errorField';

function EmailField ({error, ...props}) {
  return (
    <div>
      <label>Email</label>
      <input
        className="in-text"
        type="text"
        name="email"
        {...props}
      />
      {error
        ? <ErrorField message={error}/>
        : null
      }
    </div>
  )
}

export default EmailField;
