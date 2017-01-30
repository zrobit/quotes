import React, { Component } from 'react'
import {inject, observer} from "mobx-react";

import QuoteItem from './QuoteItem'

@inject('quoteStore') @observer
class QuotesList extends Component {
  render() {
    const {quotes, author} = this.props.quoteStore
    return (
      <div>
      {quotes.map(quote =>
        <QuoteItem key={quote.id} quote={quote} author={quote.author || author} />
      )}
      </div>
    );
  }
}

export default QuotesList
