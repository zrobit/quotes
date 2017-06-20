import React from 'react';
import {render} from 'react-dom';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';

import {QuoteList, QuoteShow, QuoteEdit} from './quote-admin';
import {AuthorList, AuthorShow, AuthorEdit} from './author-admin';
import {TagList, TagShow, TagEdit} from './tag-admin';

render(
  <Admin restClient={jsonServerRestClient('http://localhost:3000/api/admin')}>
    <Resource name="quotes" list={QuoteList} show={QuoteShow} edit={QuoteEdit}/>
    <Resource name="authors" list={AuthorList} show={AuthorShow} edit={AuthorEdit}/>
    <Resource name="tags" list={TagList} show={TagShow} edit={TagEdit}/>
  </Admin>,
  document.getElementById('root')
);
