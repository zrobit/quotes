import React, { Component } from 'react'

import { connect } from 'react-redux'

import { setQuoteDetail } from '../../actions/quoteActions'
import { fetchAuthor } from '../../actions/authorActions'


import { Link } from 'react-router';

import TagList from '../tag/TagList'
import ShareSmallButtons from '../buttons/ShareSmallButtons'

import style from './quote.styl';
import cx from 'classnames';

const sizes = {
  tiny: style.tiny,
  small: style.small,
  medium: style.medium,
  large: style.large
};


class QuoteItem extends Component {
  render() {
    const {slug, content, tags, size} = this.props.quote;
    const author = this.props.author;
    return (
      <div className={cx(style.item, 'card-quote clearfix')}>
        <p className={sizes[size]}>
          <Link
            className={style.link}
            to={"/frase/"+slug}
            onClick={()=> this.props.setQuoteDetail(this.props.quote)} >
            {content}
          </Link>
        </p>
        <div className={style.meta}>
          <h3 className={style.author}>
            <span>—</span>
            <Link
              to={"/autor/"+author.slug}
              onClick={() => this.props.fetchAuthor(author)} >
                {author.name}
            </Link>
          </h3>
          <TagList tags={tags}/>
          <ShareSmallButtons />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuoteDetail: (quote) => {
    dispatch(setQuoteDetail(quote))
  },
  fetchAuthor: (author) => {
    dispatch(fetchAuthor(author))
  }
})

QuoteItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteItem);
export default QuoteItem;
