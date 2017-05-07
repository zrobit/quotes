import React, { Component } from 'react'

import { connect } from 'react-redux'


import { Link } from 'react-router'

import AuthorBio from './AuthorBio'
import TagsSidebar from '../tag/TagsSidebar'


class AuthorSidebar extends Component {
  render() {
    let {author, isLoading} = this.props;
    let {tags} = this.props;

    return(
      <div className="sidebar">
        { author.bio
          ? <AuthorBio author={author} isLoading={isLoading} />
          : null
        }
        <TagsSidebar title="Etiquetas destacadas del autor" tags={tags}/>
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

AuthorSidebar = connect(
  mapStateToProps
  // mapDispatchToProps
)(AuthorSidebar);
export default AuthorSidebar;
