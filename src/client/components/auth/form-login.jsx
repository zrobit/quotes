import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import EmailField from './email-field';
import PasswordField from './password-field';
import ButtonAuth from './button-auth';

import s from './auth.styl';

@inject('authStore') @observer
class FormSignup extends Component {
  constructor(props) {
    super(props);
    this.authStore = this.props.authStore;
    this.EmailChange = this.EmailChange.bind(this);
    this.EmailBlur = this.EmailBlur.bind(this);
    this.PasswordChange = this.PasswordChange.bind(this);
    this.PasswordBlur = this.PasswordBlur.bind(this);
  }
  componentDidMount() {
    this.authStore.updateEmailParam();
  }
  componentWillUnmount() {
    this.authStore.clearFields();
  }

  EmailChange(e) {
    this.authStore.emailValue = e.target.value;
  }

  EmailBlur(e) {
    this.authStore.emailValidate(e.target.value);
  }

  PasswordChange(e) {
    this.authStore.passwordValue = e.target.value;
  }

  PasswordBlur(e) {
    this.authStore.passwordValidate(e.target.value);
  }

  render() {
    const {action} = this.props;
    return (
      <form className={s.form} method="post" action={action}>
        <EmailField
          value={this.authStore.emailValue}
          onChange={this.EmailChange}
          onBlur={this.EmailBlur}
          error={this.authStore.emailError}
        />
        <PasswordField
          value={this.authStore.passwordValue}
          onChange={this.PasswordChange}
          onBlur={this.PasswordBlur}
          error={this.authStore.passwordError}
        />
        <ButtonAuth display="Iniciar Sesión"/>
      </form>
    );
  }
}

export default FormSignup;
