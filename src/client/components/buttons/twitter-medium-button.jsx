import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';
import Icon from '../icon';
import style from './buttons.styl';

export default ({url}) => (
  <Link to={url} className={cx(style.mediumBtn, style.twitter)}>
    <Icon name="twitter"/>
    <span>Tweet</span>
  </Link>
);
