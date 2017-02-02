import React, { Component } from 'react'
import {inject, observer} from "mobx-react";
import hash from '../../utils/hash'

import QuoteItem from './QuoteItem'

@inject('appStore') @observer
class QuotesList extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    // console.log('scrollly')
  }
  quoteItem(quote, author) {
    return (
      <QuoteItem key={hash()} quote={quote} author={author} />
    );
  }
  render() {
    const {quotes, author} = this.props.appStore
    const {fromAuthorSection} = this.props
    return (
      <div>
      { fromAuthorSection ?
        quotes.map(quote => this.quoteItem(quote, author))
        :
        quotes.map(quote => this.quoteItem(quote, quote.author))
      }
      </div>
    );
  }
}

export default QuotesList
