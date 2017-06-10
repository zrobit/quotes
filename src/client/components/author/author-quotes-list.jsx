import React from 'react';
import QuotesList from '../quote/quotes-list';

export default ({author, quoteStore}) => (
  <div>
    <h2>
      <span>Todas las frases de </span>
      <span>{author.name} (50)</span>
    </h2>
    <QuotesList author={author} quoteStore={quoteStore}/>
  </div>
);
