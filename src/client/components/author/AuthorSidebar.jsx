import React, { Component } from 'react'

import { inject } from 'mobx-react'


import { Link } from 'react-router'

import AuthorBio from './author-bio'
import TagsSidebar from '../tag/tags-sidebar'

@inject('authorStore')
class AuthorSidebar extends Component {
  render() {
    let {author, isLoading} = this.props.authorStore;
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


export default AuthorSidebar;
