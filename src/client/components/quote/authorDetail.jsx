import React, { Component } from 'react';
import {inject, observer} from "mobx-react";


@inject('quoteStore')
class AuthorDetail extends Component {
  constructor(props){
    super(props);

  }
  render() {

    return (
      <div>
        <h1>holaaaaaaaaa:  -->{this.props.params.slug}</h1>
      </div>
    )
  }
}

export default AuthorDetail;
