import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Link } from 'react-router'

import AuthorBio from './AuthorBio'
import TagsSidebar from '../tag/TagsSidebar'



@inject('appStore') @observer
class AuthorSidebar extends Component {
  render() {
    let {author, isLoading} = this.props.appStore;
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
