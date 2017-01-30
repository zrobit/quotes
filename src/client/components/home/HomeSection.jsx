import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import HomeQuotesList from './HomeQuotesList'
import Sidebar from '../layout/HomeSidebar'
import SplitPane from '../layout/SplitPane'


import style from './home.styl'
import cx from 'classnames'


class Home extends Component {
  render() {
    return (
      <div>
        <div className={style.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <SplitPane main={<HomeQuotesList />} sidebar={<Sidebar />} />
      </div>
    )
  }
}

export default Home;
