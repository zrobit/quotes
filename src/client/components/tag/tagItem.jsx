import React from 'react'
import {Link} from 'react-router'

export default ({name, url}) => (
  <li>
    <Link to={url} >#{name}</Link>
  </li>
)
