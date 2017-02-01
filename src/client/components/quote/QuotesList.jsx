import React, { Component } from 'react'
import {inject, observer} from "mobx-react";

import QuoteItem from './QuoteItem'

@inject('appStore') @observer
class QuotesList extends Component {
  render() {
    const {quotes, author} = this.props.appStore
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
