import React, { Component } from 'react'
import {inject} from "mobx-react";
import { Link } from 'react-router';

import style from './quote.styl';
import cx from 'classnames';

@inject('quoteStore')
class QuoteItem extends Component {
  constructor(props){
    super(props)
    // this.handleClickAuthor = this.handleClickAuthor.bind(this);
  }

  render() {
    const {slug, content, author} = this.props.quote
    return (
      <div className={cx(style.item, 'card-quote')}>
        <p>
          <Link
            className={style.link}
            to={"/frase/"+slug}
            onClick={()=> this.props.quoteStore.setQuoteDetail(this.props.quote)} >
            {content}
          </Link>
        </p>
        <div className={style.meta}>
          <h3 className={style.author}>
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

export default QuoteItem
