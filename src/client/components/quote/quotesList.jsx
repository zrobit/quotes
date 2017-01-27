import React, { Component } from 'react'
import {inject, observer} from "mobx-react";

import QuoteItem from './quoteItem'

@inject('quoteStore') @observer
class QuotesList extends Component {
  render() {
    const {quotes} = this.props.quoteStore
    return (
      <div>
      {quotes.map(quote =>
        <QuoteItem key={quote.id} quote={quote} />
      )}
      </div>
    );
  }
}

export default QuotesList
