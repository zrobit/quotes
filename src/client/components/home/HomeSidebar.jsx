import React from 'react'
import { Link } from 'react-router'
import CategorySidebar from '../layout/CategorySidebar'
import TagsSidebar from '../tag/TagsSidebar'

export default ({tags}) => (
  <div className="sidebar">
    <CategorySidebar />
    <TagsSidebar title="Etiquetas reconmedas" tags={tags}/>
  </div>
);
