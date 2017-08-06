import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import TagList from '../tag/tag-list';
import ShareSmallButtons from '../buttons/share-small-buttons';

import style from './quote.styl';

const sizes = {
  tiny: style.tiny,
  small: style.small,
  medium: style.medium,
  large: style.large
};

@inject('quoteStore', 'authorStore')
class QuoteItem extends Component {
  render() {
    const {slug, content, tags, size} = this.props.quote;
    const {author} = this.props;

    return (
      <div className={cx(style.item, 'card-quote clearfix')}>
        <p className={sizes[size]}>
          <Link
            className={style.link}
            to={'/frase/' + slug}
            onClick={() => this.setQuoteDetail(this.props.quote, author)}
          >
            {content}
          </Link>
        </p>
        <div className={style.meta}>
          <h3 className={style.author}>
            <span>—</span>
            <Link
              to={'/autor/' + author.slug}
              onClick={() => this.setAuthorDetail(author)}
            >
              {author.name}
            </Link>
          </h3>
          <TagList tags={tags}/>
          <ShareSmallButtons/>
        </div>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.setQuoteDetail = this.setQuoteDetail.bind(this);
    this.setAuthorDetail = this.setAuthorDetail.bind(this);
  }
  setQuoteDetail(quote, author) {
    this.props.quoteStore.setQuoteDetail(quote);
    this.props.authorStore.setAuthor(author);
  }
  setAuthorDetail(author) {
    this.props.authorStore.setAuthorDetail(author);
  }
}

export default QuoteItem;
