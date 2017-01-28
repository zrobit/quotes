import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import SplitPane from '../layout/splitPane'

import QuotesList from '../quote/quotesList'
import Sidebar from '../layout/sidebar'


import style from './quote.styl'
import cx from 'classnames'

@inject('quoteStore')
class AuthorSection extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
        <SplitPane main={<QuotesList />} sidebar={<Sidebar />} />
    );
  }
}

export default AuthorSection;
