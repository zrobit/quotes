import React from 'react';
import {hydrate} from 'react-dom';

import {Provider} from 'mobx-react';
import {BrowserRouter as Router} from 'react-router-dom';

import createStores from './stores';

import AppRoutes from './routes';

const initialState = window.initialState || {};

const stores = createStores(initialState);

hydrate(
  <Provider {...stores}>
    <Router>
      <AppRoutes/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
