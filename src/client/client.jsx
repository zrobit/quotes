import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, browserHistory} from 'react-router';
import routes from './routes.jsx';

import AppStore from './stores/AppStore';
import AuthStore from './stores/AuthStore';


// const initialState = window.initialState && JSON.parse(window.initialState) || {};
const initialState = window.initialState || {};

// var viewStore = new ViewStore();

const stores = {
  appStore: AppStore.fromJS(initialState.app || []),
  authStore: new AuthStore(initialState.auth)
}

render(
  <Provider {...stores}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
