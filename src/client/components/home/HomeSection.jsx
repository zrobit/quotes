import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import HomeQuotesList from './HomeQuotesList'
import HomeSidebar from './HomeSidebar'
import SplitPane from '../layout/SplitPane'


import style from './home.styl'
import cx from 'classnames'


class Home extends Component {
  tags =[
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
  ]

  render() {
    return (
      <div>
        <div className={style.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <SplitPane
          main={<HomeQuotesList />}
          sidebar={<HomeSidebar tags={this.tags}/>}
        />
      </div>
    )
  }
}

export default Home;
