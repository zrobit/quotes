import React from 'react'
import { Link } from 'react-router'
import Icon from '../icon'
import style from './buttons.styl'
import cx from 'classnames'

export default ({url}) => (
  <Link to={url} className={cx(style.mediumBtn, style.facebook)}>
    <Icon name="facebook" />
    <span>Share</span>
  </Link>
)
