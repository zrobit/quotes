import React, { Component } from 'react';

import style from './layout.styl'
import cx from 'classnames'


export default ({main, sidebar}) => (
  <div className={style.wrap}>
    <div className={cx(style.inner, 'clearfix')}>
      <div className={style.sidebar}>
        {sidebar}
      </div>
      <div className={style.main}>
        {main}
      </div>
    </div>
  </div>
)
