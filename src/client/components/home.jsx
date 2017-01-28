import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import QuotesList from './quote/quotesList'
import Sidebar from './layout/sidebar'
import SplitPane from './layout/splitPane'


import style from './home.styl'
import cx from 'classnames'


class Home extends Component {
  render() {
    return (
      <div>
        <div className={style.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <SplitPane main={<QuotesList />} sidebar={<Sidebar />} />
      </div>
    )
  }
}

export default Home;
