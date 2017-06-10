import React from 'react';
import {Link} from 'react-router';

export default ({name, slug}) => (
  <li className="sidebar-list-item">
    <Link to={'/categoria/' + slug} >{name}</Link>
  </li>
);
