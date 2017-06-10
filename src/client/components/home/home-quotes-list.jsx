import React from 'react';
import QuotesList from '../quote/quotes-list';

export default ({quoteStore}) => (
  <div>
    <h2>Frases (60.9944)</h2>
    <QuotesList quoteStore={quoteStore}/>
  </div>
);
