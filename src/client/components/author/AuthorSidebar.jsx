import React, { Component } from 'react'
import { inject, observer } from "mobx-react";

import { Link } from 'react-router'
import AuthorBio from './AuthorBio'


@inject('appStore') @observer
class AuthorSidebar extends Component {
  render() {
    let {author, isLoading} = this.props.appStore
    return(
      <div className="sidebar">
        <AuthorBio author={author} isLoading={isLoading} />
      </div>
    );
  }
}

export default AuthorSidebar;
