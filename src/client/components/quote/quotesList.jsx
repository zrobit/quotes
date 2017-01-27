import React, { Component } from 'react'
import {inject, observer} from "mobx-react";

import QuoteView from './quoteView'

@inject('quoteStore') @observer
class QuotesView extends Component {
  render() {
    const {quotes} = this.props.quoteStore
    return (
      <div>
      {quotes.map(quote =>
        <QuoteView key={quote.id} quote={quote} />
      )}
      </div>
    );
  }
}

export default QuotesView
