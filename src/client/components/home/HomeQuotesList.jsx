import React from 'react'
import { Link } from 'react-router'
import QuotesList from '../quote/QuotesList'

// import style from './author.styl'
// import cx from 'classnames'

export default ({quotes, isLoading, fetch}) => (
  <div>
    <h2>Frases (60.9944)</h2>
    {<QuotesList quotes={quotes} isLoading={isLoading} fetch={fetch} />}
  </div>
)


