import React from 'react';
import FacebookIconButton from './FacebookIconButton';
import TwitterIconButton from './TwitterIconButton';
import style from './buttons.styl'

export default () => (
  <ul className={style.btnList}>
    <li>
      <FacebookIconButton url='/test/facebook' />
    </li>
    <li>
      <TwitterIconButton url='/test/twitter'/>
    </li>
  </ul>
)
