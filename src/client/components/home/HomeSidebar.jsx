import React from 'react';

import CategorySidebar from '../layout/category-sidebar';
import TagsSidebar from '../tag/tags-sidebar';

export default ({tags}) => (
  <div className="sidebar">
    <CategorySidebar/>
    <TagsSidebar title="Etiquetas reconmedas" tags={tags}/>
  </div>
);
