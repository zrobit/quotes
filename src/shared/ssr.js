import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider, useStaticRendering} from 'mobx-react';
import jsonStringifySafe from 'json-stringify-safe';

import AppRoutes from '../client/routes';

import createStores from '../client/stores/';
import metaUtils from './meta-utils';

useStaticRendering(true);

function ssr(req, res, context, template = 'layout') {
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
        <StaticRouter location={req.originalUrl} context={{}}>
          <AppRoutes/>
        </StaticRouter>
      </Provider>
    );
  } catch (err) {
    console.error(err);
  }

  context.initialStateJSON = jsonStringifySafe(context.state);
  context.meta = metaUtils(context.meta || undefined);
  res.render(template, context);
}

module.exports = ssr;
