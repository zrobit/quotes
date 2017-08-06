import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from './components/main';
import HomeSection from './components/home/home-section';
import AuthorSection from './components/author/author-section';
import QuoteSection from './components/quote/quote-section';
import LoginSection from './components/auth/login-section';
import SignupSection from './components/auth/signup-section';

const AppRoutes = () => (
  <Main>
    <Switch>
      <Route path="/login" component={LoginSection}/>
      <Route path="/signup" component={SignupSection}/>
      <Route path="/frase/:slug" component={QuoteSection}/>
      <Route path="/autor/:slug" component={AuthorSection}/>
      <Route path="/pag/:page" component={HomeSection}/>
      <Route path="/" component={HomeSection}/>
      {/*
      <Route path="/perfil/:user" component={ProfileSection} />
      */}
    </Switch>
  </Main>
);

export default AppRoutes;
