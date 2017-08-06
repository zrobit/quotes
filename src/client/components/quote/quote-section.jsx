import React, {Component} from 'react';

import {inject} from 'mobx-react';

import {Link} from 'react-router-dom';
import cx from 'classnames';

import ShareMediumButtons from '../buttons/share-medium-buttons';

import style from './quote.styl';

const sizes = {
  tiny: style.tiny,
  small: style.small,
  medium: style.medium,
  large: style.large
};

@inject('quoteStore', 'authorStore')
class QuoteDetail extends Component {
  render() {
    const {quote} = this.props.quoteStore;
    const {setAuthorDetail, author} = this.props.authorStore;

    return (
      <div className={cx(style.quoteSection)}>
        <div className={cx(style.main, 'card')}>
          <p className={sizes[quote.size]}>
            {quote.content}
          </p>
          <div className={style.quoteMeta}>
            <h3 className={style.quoteAuthor}>
              <span>—</span>
              <Link
                to={'/autor/' + author.slug}
                onClick={() => setAuthorDetail(author)}
              >
                {author.name}
              </Link>
            </h3>
            <ShareMediumButtons/>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteDetail;
