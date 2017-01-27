// import isDev from 'isdev';
// import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'mobx-react';
import { dehydrate } from '../client/state/hydrate';
import { fetchData } from './fetch';
// import { Dir } from '~/src/config';
import routes from '../client/routes';
import initStore from '../client/stores/stores';

function handleRouter(req, res, props) {
  // const index = path.join(Dir.src, 'index');
  const { components, params, location } = props;

  /*
    Initialize the store injecting the needed
    Initial State to pass on the client-side
  */
  const stores = initStore({
    app: { ssrLocation: req.url },
  });

  /*
    Fetch data from the Components
  */
  fetchData(stores, components, params, location.query)
    /*
      Pass the store to the mobx-react Provider
    */
    .then(() => renderToString(
      <Provider {...stores}>
        <RouterContext {...props} />
      </Provider>
    ))
    /*
      Render the html with dehydrate store
    */
    .then((html) => res
      .status(200)
      .render('home', {
        root: html,
        state: dehydrate(stores),
      }));
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
  res.status(500).send(err.message);
}

export function isoMiddleware(req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err);
      else if (redirect) handleRedirect(res, redirect);
      else if (props) handleRouter(req, res, props);
      else handleNotFound(res);
    });
}
