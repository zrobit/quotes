import {observable} from 'mobx';

import isEmail from 'validator/lib/isEmail';
import param from '../utils/param';

export default class AuthStore {
  @observable emailValue = '';
  @observable emailError = null;
  @observable passwordValue = '';
  @observable passwordError = null;
  error= null;

  constructor(state = {}) {
    if (state.error) {
      this.error = state.error;
    }
  }
  emailValidate(value) {
    if (isEmail(value)) {
      this.emailError = null;
    } else {
      this.emailError = 'Correo no valido';
    }
  }
  passwordValidate(value) {
    if (value.length < 8) {
      this.passwordError = 'Contraseña no valida';
    } else {
      this.passwordError = null;
    }
  }
  updateEmailParam() {
    const email = param('field');
    if (email) {
      this.emailValue = email;
    }
  }
  clearFields() {
    this.emailValue = '';
    this.emailError = null;
    this.passwordValue = '';
    this.passwordError = null;
  }
}
