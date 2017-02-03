import React from 'react';
import { Route } from 'react-router';

import Main from './components/main';
import AuthorSection from './components/author/AuthorSection';
import QuoteSection from './components/quote/QuoteSection';
import LoginSection from './components/auth/LoginSection';

export default (
  <Route path="/" component={Main}>
    <Route path="/autor/:slug" component={AuthorSection} />
    <Route path="/frase/:slug" component={QuoteSection} />
    <Route path="/login" component={LoginSection} />
  </Route>
);

