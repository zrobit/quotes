import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import SplitPane from '../layout/SplitPane'

import AuthorQuotesList from './AuthorQuotesList'
import Sidebar from './AuthorSidebar'


import style from './author.styl'
import cx from 'classnames'

@inject('quoteStore')
class AuthorSection extends Component {
  render() {
    const {author} = this.props.quoteStore;
    return (
      <div className={style.section}>
        <SplitPane main={<AuthorQuotesList author={author} />} sidebar={<Sidebar />} />
      </div>
    );
  }
}

export default AuthorSection;
