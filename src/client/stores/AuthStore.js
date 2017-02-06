import {observable, computed, action} from "mobx";

import isEmail from 'validator/lib/isEmail'

export default class AuthStore {
  @observable emailValue = '';
  @observable emailError = null;
  @observable passwordValue = '';
  @observable passwordError = null;

  ssrLocation = null;

  emailValidate (value) {
    if(!isEmail(value)){
      this.emailError = "Correo no valido"
    } else {
      this.emailError = null
    }
  }
  passwordValidate (value) {
    if(value.length < 8 ){
      this.passwordError = "Contraseña no valida"
    } else{
      this.passwordError = null
    }
  }
}
