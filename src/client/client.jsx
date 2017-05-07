import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';


import { Router, browserHistory} from 'react-router';
import routes from './routes.jsx';


const initialState = window.initialState || {};

let store = createStore(reducer, initialState, applyMiddleware(thunk, logger))
// let store = createStore(reducer, initialState, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
