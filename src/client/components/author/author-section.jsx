import React, {Component} from 'react';
import {inject} from 'mobx-react';

import SplitPane from '../layout/split-pane';
import AuthorQuotesList from './author-quotes-list';
import AuthorSidebar from './author-sidebar.jsx';

import style from './author.styl';

@inject('authorStore')
class AuthorSection extends Component {
  tags =[
    {name: 'Tes1', slug: 'tag-slug'},
    {name: 'Tes1', slug: 'tag-slug'},
    {name: 'Tes1', slug: 'tag-slug'},
    {name: 'Tes1', slug: 'tag-slug'}
  ]
  render() {
    const {author} = this.props.authorStore;
    return (
      <div className={style.section}>
        <SplitPane
          main={<AuthorQuotesList author={author} quoteStore={this.props.authorStore}/>}
          sidebar={<AuthorSidebar tags={this.tags}/>}
        />
      </div>
    );
  }
}

export default AuthorSection;
