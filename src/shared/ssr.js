import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';

import routes from '../client/routes';
import jsonStringifySafe from 'json-stringify-safe';


import createStores from '../client/stores/'

useStaticRendering(true);

export function ssr(req, res, context, template="layout") {
  match({ routes, location: req.originalUrl },
    (err, redirect, props) => {
      if (err){
        // handleError(res, err);
        console.log(err)
      }
      else if (props) {
        if(!context.state.user){context.state.user = {} }

        context.state.user.isAuth = req.isAuthenticated();
        if(context.state.user.isAuth){
          context.state.user.name = req.user.name
          context.state.user.hashId = req.user.hashId
        }

        let stores = createStores(context.state)

        context.root = renderToString(
          <Provider {...stores}>
            <RouterContext {...props} />
          </Provider>
        )

        context.initialStateJSON = jsonStringifySafe(context.state)

        res.render(template, context)
      }
    });
}
