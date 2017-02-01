import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, browserHistory} from 'react-router';
import routes from './routes.jsx';

import AppStore from './stores/AppStore';
import LoginStore from './stores/LoginStore';


// const initialState = window.initialState && JSON.parse(window.initialState) || {};
const initialState = window.initialState || {};

// var viewStore = new ViewStore();

const stores = {
  appStore: AppStore.fromJS(initialState.quotes || []),
  loginStore: new LoginStore()
}

render(
  <Provider {...stores}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
