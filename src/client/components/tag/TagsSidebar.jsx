import React from 'react'
import {Link} from 'react-router'
import TagList from './TagList'

import s from './tag.styl'

function TagsSidebar({title, tags}){
  return(
    <div className="card">
      <h3>{title}</h3>
      <TagList styleClass={s.tagsMedium} tags={tags}/>
    </div>
  );
}
export default TagsSidebar;
