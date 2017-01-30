import React from 'react'
import { Link } from 'react-router'
import Icon from '../Icon'
import style from './buttons.styl'
import cx from 'classnames'

export default ({url}) => (
  <Link to={url} className={cx(style.smallBtn, style.facebook)}>
    <Icon name="facebook" />
  </Link>
)
