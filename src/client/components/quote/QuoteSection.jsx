import React, { Component } from 'react'

import { inject } from 'mobx-react'


import { Link } from 'react-router';

import ShareMediumButtons from '../buttons/ShareMediumButtons'

import style from './quote.styl'
import cx from 'classnames'

const sizes = {
  tiny: style.tiny,
  small: style.small,
  medium: style.medium,
  large: style.large
};

@inject('quoteStore', 'authorStore')
class QuoteDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote } = this.props.quoteStore;
    const { setAuthorDetail, author } = this.props.authorStore

    return (
      <div className={cx(style.quoteSection)}>
        <div className={cx(style.main, 'card')}>
          <p className ={sizes[quote.size]}>
            {quote.content}
          </p>
          <div className={style.quoteMeta}>
            <h3 className={style.quoteAuthor}>
              <span>—</span>
              <Link
                to={"/autor/"+author.slug}
                onClick={() => setAuthorDetail(author)} >
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


export default QuoteDetail;
