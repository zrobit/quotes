import React, { Component } from 'react'
import {inject, observer} from "mobx-react";

import EmailField from './EmailField'
import PasswordField from './PasswordField'
import ButtonAuth from './ButtonAuth'

import s from './auth.styl'

@inject('loginStore') @observer
class FormSignup extends Component {
  constructor(props){
    super(props);
    this.loginStore = this.props.loginStore;
    this.EmailChange = this.EmailChange.bind(this);
    this.EmailBlur = this.EmailBlur.bind(this);
    this.PasswordChange = this.PasswordChange.bind(this);
    this.PasswordBlur = this.PasswordBlur.bind(this);
  }

  EmailChange(e){
    this.loginStore.emailValue = e.target.value;
  }

  EmailBlur(e){
    this.loginStore.emailValidate(e.target.value);
  }

  PasswordChange(e){
    this.loginStore.passwordValue = e.target.value;
  }

  PasswordBlur(e){
    this.loginStore.passwordValidate(e.target.value);
  }

  render (){
    const {action} = this.props
    return (
      <form className={s.form} method="post" action={action}>
        <EmailField
          value={this.loginStore.emailValue}
          onChange={this.EmailChange}
          onBlur={this.EmailBlur}
          error={this.loginStore.emailError}
        />
        <PasswordField
          value={this.loginStore.passwordValue}
          onChange={this.PasswordChange}
          onBlur={this.PasswordBlur}
          error={this.loginStore.passwordError}
        />
        <ButtonAuth display="Iniciar Sesión" />
      </form>
    );
  }
}

export default FormSignup;
