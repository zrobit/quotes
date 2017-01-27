import React from 'react'
import { Link } from 'react-router'
import ItemCategory from './itemCategory'

const cats = [
  {id:2, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:4, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:5, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:6, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:8, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:3, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:56, name: 'Categoria uno ', slug: 'categoria-uno'},
  {id:678, name: 'Categoria uno ', slug: 'categoria-uno'}
]


export default () => (
  <div className="sidebar-category">
    <ul>
    {cats.map((item)=> <ItemCategory key={item.id} name={item.name} slug={item.slug} />)}
    </ul>
  </div>
);
