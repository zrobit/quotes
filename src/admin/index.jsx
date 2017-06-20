import React from 'react';
import {render} from 'react-dom';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';

import {QuoteList, QuoteEdit} from './quote-admin';
import {AuthorList, AuthorEdit} from './author-admin';

render(
  <Admin restClient={jsonServerRestClient('http://localhost:3000/api/admin')}>
    <Resource name="quotes" list={QuoteList} edit={QuoteEdit}/>
    <Resource name="authors" list={AuthorList} edit={AuthorEdit}/>
  </Admin>,
  document.getElementById('root')
);
