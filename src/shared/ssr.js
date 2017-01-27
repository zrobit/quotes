// import csshook from 'css-modules-require-hook/preset'

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'mobx-react';

import routes from '../client/routes';
import jsonStringifySafe from 'json-stringify-safe';


import QuoteStore from '../client/stores/QuoteStore'
import LoginStore from '../client/stores/LoginStore'


export function ssr(req, res, context, template="layout") {
  match({ routes, location: req.originalUrl },
    (err, redirect, props) => {
      if (err){
        // handleError(res, err);
        console.log(err)
      }
      else if (props) {
        console.log('ssr renderrrrrrrrrrrrr')
        const stores = {
          quoteStore: QuoteStore.fromJS(context.state.quotes),
          loginStore: new LoginStore()
        }


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
