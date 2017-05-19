import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../client/reducers'

// import { Provider, useStaticRendering } from 'mobx-react';

import routes from '../client/routes';
import jsonStringifySafe from 'json-stringify-safe';


// import AppStore from '../client/stores/AppStore'
// import AuthStore from '../client/stores/AuthStore'

// useStaticRendering(true);

export function ssr(req, res, context, template="layout") {
  match({ routes, location: req.originalUrl },
    (err, redirect, props) => {
      if (err){
        handleError(res, err);
        console.log(err)
        return res.status(500).end('Internal server error');
      }
      else if (props) {
        if(!context.state.user){context.state.user = {} }

        context.state.user.isAuth = req.isAuthenticated();
        if(context.state.user.isAuth){
          context.state.user.name = req.user.name
          context.state.user.hashId = req.user.hashId
        }

        // const stores = {
        //   appStore: AppStore.fromJS(context.state.app),
        //   authStore: new AuthStore(context.state.auth)
        // }
        let store = createStore(reducer, context.state)

        context.root = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        )

        context.initialStateJSON = jsonStringifySafe(store.getState())

        res.render(template, context)
      }
    });
}
