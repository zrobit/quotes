import React, { Component } from 'react'
import {inject, observer} from "mobx-react";


import WrapAuth from './wrapAuth'
import ButtonAuth from './buttonAuth'
import EmailField from './emailField';
import PasswordField from './passwordField';


@inject('loginStore') @observer
class FormAuth extends Component {
  render() {
    const {loginStore} = this.props
    return (
      <WrapAuth>
        <form className="form" method="post" action={this.props.action}>
          <div className="row">
            <EmailField loginStore={loginStore}/>
            <PasswordField loginStore={loginStore}/>
            <ButtonAuth display="SIGNUP"/>
          </div>
        </form>
      </WrapAuth>
    );
  }
}

export default FormAuth
