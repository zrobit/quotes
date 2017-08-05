import React from 'react';

export default ({children}) => (
  <div className="login-auth">
    <div className="auth-wrapper">
      <div className="auth-form">
        {children}
      </div>
    </div>
  </div>
);
