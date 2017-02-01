import React, { Component } from 'react'
import {inject} from "mobx-react";
import { Link } from 'react-router';

import TagList from '../tag/TagList'
import ShareSmallButtons from '../buttons/ShareSmallButtons'

import style from './quote.styl';
import cx from 'classnames';

@inject('appStore')
class QuoteItem extends Component {
  tags = [
    {name:"tag1", slug: "slug1"},
    {name:"tag2", slug: "slug2"},
    {name:"tag3", slug: "slug3"},
    {name:"tag7", slug: "slug7"}
  ];

  constructor(props){
    super(props)
  }

  render() {
    const {slug, content} = this.props.quote
    const author = this.props.author
    const tags = this.tags
    return (
      <div className={cx(style.item, 'card-quote clearfix')}>
        <p>
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
