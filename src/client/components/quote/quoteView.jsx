import React, { Component } from 'react'
import {inject} from "mobx-react";
import { Link } from 'react-router';

import style from './quote.styl';
import cx from 'classnames';

@inject('quoteStore')
class QuoteView extends Component {
  constructor(props){
    super(props)
    // this.handleClickAuthor = this.handleClickAuthor.bind(this);
  }

  render() {
    const {slug, content, author} = this.props.quote

    return (
      <div className={cx(style.quote, 'card-quote')}>
        <p>
          <Link
            className={style.contentLink}
            to={"/frase/"+slug}
            onClick={()=> this.props.quoteStore.setQuoteDetail(this.props.quote)} >
            {content}
          </Link>
        </p>
        <div className={style.meta}>
          <h3>
            <span>—</span>
            <Link
              to={"/autor/"+author.slug}
              onClick={() => this.props.quoteStore.setAuthorDetail(author)} >
                {author.name}
            </Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default QuoteView
