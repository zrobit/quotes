import React from 'react'
import { Link } from 'react-router'
import QuotesList from '../quote/QuotesList'

// import style from './author.styl'
// import cx from 'classnames'

export default ({author, quoteStore}) => (
  <div>
    <h2>
      <span>Todas las frases de </span>
      <span>{author.name} (50)</span>
    </h2>
    <QuotesList author={author} quoteStore={quoteStore}/>
  </div>
)
