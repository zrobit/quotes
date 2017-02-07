import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import FormLogin from './FormLogin';

import s from './auth.styl';

@inject('authStore') @observer
class LoginSection extends Component {
  render() {
    const {error} = this.props.authStore;
    return (
      <div className={s.section}>
        { error
          ? <p className={s.error}>{error}</p>
          : null
        }
        <FormLogin action="/login" />

      </div>
    );
  }
}

export default LoginSection;
