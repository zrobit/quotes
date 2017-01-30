import React from 'react';
import FacebookMediumButton from './FacebookMediumButton';
import TwitterMediumButton from './TwitterMediumButton';
import style from './buttons.styl'

export default () => (
  <ul className={style.mediumBtnList}>
    <li>
      <FacebookMediumButton url='/test/facebook' />
    </li>
    <li>
      <TwitterMediumButton url='/test/twitter'/>
    </li>
  </ul>
)
