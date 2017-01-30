import React from 'react'
import {Link} from 'react-router'
import styles from './tag.styl'


export default ({name, url}) => (
  <li>
    <Link to={url} className={styles.link}>{name}</Link>
  </li>
)
