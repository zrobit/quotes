import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import SplitPane from '../layout/splitPane'

import QuotesList from '../quote/quotesList'
import Sidebar from './authorSidebar'


import style from './author.styl'
import cx from 'classnames'

@inject('quoteStore')
class AuthorSection extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className={style.section}>
        <SplitPane main={<QuotesList />} sidebar={<Sidebar />} />
      </div>

    );
  }
}

export default AuthorSection;
