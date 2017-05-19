import React, { Component } from 'react'

import { inject } from 'mobx-react'
import { fetchAuthor } from '../../actions/authorActions'


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


class QuoteDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {quote} = this.props
    const {author} = quote
    // console.log(quote)

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
                onClick={() => this.props.fetchAuthor(author)} >
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

// const mapStateToProps = (state) => {
//   return {
//     quote: state.quote.detail
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchAuthor: (author) => {
//     dispatch(fetchAuthor(author))
//   }
// })

// QuoteDetail = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(QuoteDetail);

QuoteDetail = inject(
  stores => (
  {
    quote: stores.quoteStore.detail

  })
)(QuoteDetail);



export default QuoteDetail;
