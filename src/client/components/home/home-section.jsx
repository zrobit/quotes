import React, { Component } from 'react';

import { inject } from 'mobx-react';

import HomeQuotesList from './home-quotes-list'
import HomeSidebar from './home-sidebar'
import {SplitPaneThree as SplitPane} from '../layout/split-pane'

import style from './home.styl'
import cx from 'classnames'

@inject('quoteStore')
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
          main={ <HomeQuotesList quoteStore={this.props.quoteStore}/> }
          left={<HomeSidebar tags={this.tags}/>}
          right={<HomeSidebar tags={this.tags}/>}
        />
      </div>
    )
  }
}


export default Home
