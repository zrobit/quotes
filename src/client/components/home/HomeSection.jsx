import React, { Component } from 'react';

import { connect } from 'react-redux'
import { fetchQuotes } from '../../actions/quoteActions'

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
    const {quotes, isLoading, fetch} = this.props

    return (
      <div>
        <div className={style.landing}>
          <img src="/assets/media/images/cover.jpg"/>
        </div>
        <SplitPane
          main={
            <HomeQuotesList quotes={quotes} isLoading={isLoading} fetch={fetch}/>
          }

          sidebar={<HomeSidebar tags={this.tags}/>}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quotes: state.quote.quotes,
    isLoading: state.quote.isLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: () => {
    dispatch(fetchQuotes())
  }
})

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
export default Home;
