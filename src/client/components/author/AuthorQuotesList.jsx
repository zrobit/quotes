import React from 'react'
import { Link } from 'react-router'
import QuotesList from '../quote/QuotesList'

// import style from './author.styl'
// import cx from 'classnames'

export default ({author, isLoading}) => (
  <div>
    <h2>
      <span>Todas las frases de </span>
      <span>{author.name} (50)</span>
    </h2>
    <QuotesList quotes={author.quotes} isLoading={isLoading} author={author}/>
  </div>
)
