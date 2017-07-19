import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {Provider, useStaticRendering} from 'mobx-react';

import jsonStringifySafe from 'json-stringify-safe';
import routes from '../client/routes';
import metaUtils from './meta-utils';

import createStores from '../client/stores/';

useStaticRendering(true);

export function ssr(req, res, context, template = 'layout') {
  match({routes, location: req.originalUrl},
    (err, redirect, props) => {
      if (err) {
        console.log(err);
      } else if (props) {
        if (!context.state.user) {
          context.state.user = {};
        }

        context.state.user.isAuth = req.isAuthenticated();
        if (context.state.user.isAuth) {
          context.state.user.name = req.user.name;
          context.state.user.hashId = req.user.hashId;
        }

        const stores = createStores(context.state);
        try {
          context.root = renderToString(
            <Provider {...stores}>
              <RouterContext {...props}/>
            </Provider>
          );
        } catch (err) {
          console.error(err);
        }

        context.initialStateJSON = jsonStringifySafe(context.state);
        context.meta = metaUtils(context.meta || undefined);
        res.render(template, context);
      }
    });
}
