import React from 'react';
import { Route } from 'react-router';

import Main from './components/main';
import AuthorDetail from './components/quote/authorDetail';
import QuoteDetail from './components/quote/quoteDetail';
import Login from './components/auth/login';

export default (
  <Route path="/" component={Main}>
    <Route path="/autor/:slug" component={AuthorDetail} />
    <Route path="/frase/:slug" component={QuoteDetail} />
    <Route path="/login" component={Login} />
  </Route>
);

