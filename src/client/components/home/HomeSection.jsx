import React, { Component } from 'react';

import { inject } from 'mobx-react';

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
    const {quotes, isLoading, fetch, next} = this.props

    return (
      <div>
        <div className={style.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <SplitPane
          main={
            <HomeQuotesList
              quotes={quotes}
              isLoading={isLoading}
              fetch={fetch}
              next={next}
            />
          }

          sidebar={<HomeSidebar tags={this.tags}/>}
        />
      </div>
    )
  }
}


Home  = inject(
  stores => ({
    quotes: stores.quoteStore.quotes,
    isLoading: stores.quoteStore.isLoading,
    next: stores.quoteStore.next,
    fetch: stores.quoteStore.fetchQuotes
  })
)(Home)

export default Home
