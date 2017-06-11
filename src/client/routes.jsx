import React from 'react';
import {Route} from 'react-router';

import Main from './components/main';
import AuthorSection from './components/author/author-section';
import QuoteSection from './components/quote/quote-section';
import LoginSection from './components/auth/login-section';
import SignupSection from './components/auth/signup-section';

export default (
  <Route path="/" component={Main}>
    <Route path="/pag/:page" component={Main}/>
    <Route path="/signup" component={SignupSection}/>
    <Route path="/login" component={LoginSection}/>
    <Route path="/frase/:slug" component={QuoteSection}/>
    <Route path="/autor/:slug" component={AuthorSection}/>
    <Route path="/buscar/:tag" component={Main}/>
    {/*
    <Route path="/perfil/:user" component={ProfileSection} />
    */}
  </Route>
);

