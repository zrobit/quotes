import React from 'react'
import WrapAuth from './wrapAuth'
import ButtonAuth from './buttonAuth'

export default ({children}) => (
  <div className="login-auth">
    <div className="auth-wrapper">
      <div className="auth-form">
        {children}
      </div>
    </div>
  </div>
);
