import React, { Component } from 'react'
import {inject} from "mobx-react";
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

@inject('appStore')
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
            onClick={()=> this.props.appStore.setQuoteDetail(this.props.quote)} >
            {content}
          </Link>
        </p>
        <div className={style.meta}>
          <h3 className={style.author}>
            <span>—</span>
            <Link
              to={"/autor/"+author.slug}
              onClick={() => this.props.appStore.setAuthorDetail(author)} >
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

export default QuoteItem
