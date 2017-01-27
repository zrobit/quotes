import React from 'react';
import { Route } from 'react-router';

import Main from './components/main';
import AuthorSection from './components/quote/authorSection';
import QuoteSection from './components/quote/quoteSection';
import Login from './components/auth/login';

export default (
  <Route path="/" component={Main}>
    <Route path="/autor/:slug" component={AuthorSection} />
    <Route path="/frase/:slug" component={QuoteSection} />
    <Route path="/login" component={Login} />
  </Route>
);

