import {observable, computed, action} from "mobx";

import isEmail from 'validator/lib/isEmail'

export default class LoginStore {
  @observable emailValue = '';
  @observable emailError = false;
  @observable passwordValue = '';
  @observable passwordError = false;

  ssrLocation = null;

  emailValidate (value) {
    this.emailError = !isEmail(value)
  }
  passwordValidate (value) {
    this.passwordError = value.length < 8
  }
}
