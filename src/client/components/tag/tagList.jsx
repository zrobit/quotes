import React from 'react'

import guid from '../../utils/guid'

import TagItem from './tagItem'
import style from './tag.styl'


export default ({tags}) => (
  <ul className={style.tags}>
    {tags.map(
      tag => <TagItem key={guid()} name={tag.name} url={'/buscar/'+ tag.slug }/>
    )}
  </ul>
)
