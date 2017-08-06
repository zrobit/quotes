import React from 'react';
import {Link} from 'react-router-dom';
import styles from './tag.styl';

function TagItem({name, url}) {
  return (
    <li>
      <Link to={url} className={styles.link}>{name}</Link>
    </li>
  );
}
export default TagItem;
