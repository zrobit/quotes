import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import QuotesView from './quote/quotesView'
import SideBar from './layout/sidebar'
// import color from './test.css'

import home from './home.styl'
import cx from 'classnames'


class Home extends Component {
  render() {
    return (
      <div>
        <div className={home.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <div className={home.wrap}>
          <div className={cx(home.inner, 'clearfix')}>
            <div className={home.main}>
              <QuotesView />
            </div>
            <div className={home.sidebar}>
              {/* sideBar*/}
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
