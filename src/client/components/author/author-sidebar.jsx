import React, {Component} from 'react';
import {inject} from 'mobx-react';

import TagsSidebar from '../tag/tags-sidebar';
import AuthorBio from './author-bio';

@inject('authorStore')
class AuthorSidebar extends Component {
  render() {
    const {author, isLoading} = this.props.authorStore;
    const {tags} = this.props;

    return (
      <div className="sidebar">
        { author.bio ?
          <AuthorBio author={author} isLoading={isLoading}/> :
          null
        }
        <TagsSidebar title="Etiquetas destacadas del autor" tags={tags}/>
      </div>
    );
  }
}

export default AuthorSidebar;
