import React from 'react';

import hash from '../../utils/hash';

import TagItem from './tag-item';
import style from './tag.styl';

function TagList({styleClass, tags}) {
  return (
    <ul className={styleClass}>
      {tags.map(
        tag => <TagItem key={hash()} name={tag.name} url={'/buscar/' + tag.slug}/>
      )}
    </ul>
  );
}

TagList.defaultProps = {
  styleClass: style.tags
};

export default TagList;
