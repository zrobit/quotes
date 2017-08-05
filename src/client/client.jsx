import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'mobx-react';
import {Router, browserHistory} from 'react-router';

import createStores from './stores';

import routes from './routes';

const initialState = window.initialState || {};

const stores = createStores(initialState);

render(
  <Provider {...stores}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('root')
);
