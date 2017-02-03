import React, { Component } from 'react';
import FormAuth from './formAuth';
import {inject, observer} from "mobx-react";



@inject('loginStore') @observer
class Login extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.loginStore.title}</h1>
        <FormAuth action="/login" />
      </div>
    )
  }
}

export default Login;
