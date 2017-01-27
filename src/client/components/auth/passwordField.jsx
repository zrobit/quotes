import React, { Component } from 'react';
import {inject, observer} from "mobx-react";


import PasswordInpunt from './passwordInput';
import ErrorField from './errorField';


@observer
class PasswordField extends Component {

  constructor(props){
    super(props)
    this.loginStore = this.props.loginStore
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange (e) {
    this.loginStore.passwordValue = e.target.value
  }

  handleBlur (e) {
    this.loginStore.passwordValidate(e.target.value)
  }

  render() {
    const {passwordValue, passwordError} = this.props.loginStore
    return (
      <div>
        <label>Password</label>
        <PasswordInpunt
          value={passwordValue}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
        />
        {passwordError ?
          <ErrorField message='Password almenos 8 caracteres'/>
          :
          null
        }
      </div>
    )
  }
}

export default PasswordField;
