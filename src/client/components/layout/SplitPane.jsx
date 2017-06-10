import React from 'react';
import cx from 'classnames';

import style from './layout.styl';

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
);
