import React, { Component } from 'react';
import { connect } from 'react-redux'

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


const mapStateToProps = (state) => {
  return {
    author: state.author.detail,
    isLoading: state.author.isLoading
  }
}

AuthorSection = connect(
  mapStateToProps
  // mapDispatchToProps
)(AuthorSection);
export default AuthorSection;
