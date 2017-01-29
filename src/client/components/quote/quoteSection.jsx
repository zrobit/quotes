import React, { Component } from 'react'
import {inject, observer} from "mobx-react";
import { Link } from 'react-router';

import ShareMediumButtons from '../buttons/shareMediumButtons'

import style from './quote.styl'
import cx from 'classnames'

@inject('quoteStore')
class QuoteDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {quote} = this.props.quoteStore
    const {author} = quote

    return (
      <div className={cx(style.quoteSection)}>
        <div className={cx(style.main, 'card')}>
          <p>
            {quote.content}
          </p>
          <div className={style.quoteMeta}>
            <h3 className={style.quoteAuthor}>
              <span>—</span>
              <Link
                to={"/autor/"+author.slug}
                onClick={() => this.props.quoteStore.setAuthorDetail(author)} >
                {author.name}
              </Link>
            </h3>
            <ShareMediumButtons />
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteDetail
