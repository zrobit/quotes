import React, { Component } from 'react';
import {inject, observer} from "mobx-react";


import EmailInpunt from './emailInput';
import ErrorField from './errorField';


@observer
class EmailField extends Component {

  constructor(props){
    super(props)
    this.loginStore = this.props.loginStore
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange (e) {
    this.loginStore.emailValue = e.target.value
  }

  handleBlur (e) {
    this.loginStore.emailValidate(e.target.value)
  }

  render() {
    const {emailValue, emailError} = this.props.loginStore
    return (
      <div>
        <label>Email</label>
        <EmailInpunt
          value={emailValue}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
        />
        {emailError ?
          <ErrorField message='Correo electrónico no valido'/>
          :
          null
        }
      </div>
    )
  }
}

export default EmailField;
