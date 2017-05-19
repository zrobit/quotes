import React, { Component } from 'react';
import { inject } from 'mobx-react'

import SplitPane from '../layout/SplitPane'

import AuthorQuotesList from './AuthorQuotesList'
import AuthorSidebar from './AuthorSidebar'


import style from './author.styl'
import cx from 'classnames'

class AuthorSection extends Component {
  tags =[
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
    {name:"Tes1", slug:'tag-slug'},
  ]
  render() {
    const {author, quotes, isLoading} = this.props;
    return (
      <div className={style.section}>
        <SplitPane
          main={<AuthorQuotesList author={author} isLoading={isLoading}/>}
          sidebar={<AuthorSidebar tags={this.tags} />} />
      </div>
    );
  }
}


export default AuthorSection;
