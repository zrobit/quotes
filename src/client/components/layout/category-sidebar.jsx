import React from 'react';
import ItemCategory from './item-category';

const cats = [
  {id: 2, name: 'Frases de amor', slug: 'frases-de-amor'},
  {id: 4, name: 'Frases cortas', slug: 'categoria-uno'},
  {id: 40, name: 'Frases de motivacion', slug: 'categoria-uno'},
  {id: 5, name: 'Frases inteligentes', slug: 'categoria-uno'},
  {id: 6, name: 'Frases de amistad ', slug: 'categoria-uno'},
  {id: 8, name: 'Frases de la vida ', slug: 'categoria-uno'},
  {id: 3, name: 'Frases tristes ', slug: 'categoria-uno'},
  {id: 56, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id: 678, name: 'Categoria uno ', slug: 'categoria-uno'}
];

export default () => (
  <div className="sidebar-category">
    <ul>
      {cats.map(item => <ItemCategory key={item.id} name={item.name} slug={item.slug}/>)}
    </ul>
  </div>
);
