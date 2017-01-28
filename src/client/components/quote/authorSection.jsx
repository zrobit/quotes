import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import style from './quote.styl'
import cx from 'classnames'

@inject('quoteStore')
class AuthorSection extends Component {
  constructor(props){
    super(props);

  }
  render() {

    return (
      <div>
      </div>
    )
  }
}

export default AuthorSection;
