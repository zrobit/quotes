import React from 'react'

import guid from '../../utils/guid'

import TagItem from './tagItem'


export default ({tags}) => (
  <ul>
    {tags.map(
      tag => <TagItem key={guid()} name={tag.name} url={'/buscar/'+ tag.slug }/>
    )}
  </ul>
)
