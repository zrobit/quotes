import React, { Component } from 'react'
import {inject, observer} from "mobx-react";
import style from './quote.styl'


@inject('quoteStore')
class QuoteDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {quote} = this.props.quoteStore

    return (
      <div className={style.quote}>
        <p>
          {quote.content}
        </p>
        <div className="quote-detail-meta">
          <h3>
            <span>—</span>
            <span>
              {quote.author.name}
            </span>
          </h3>
        </div>
      </div>
    );
  }
}

export default QuoteDetail
