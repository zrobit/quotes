import React from 'react';
import FacebookMediumButton from './FacebookMediumButton';
import TwitterMediumButton from './TwitterMediumButton';
import style from './buttons.styl'

export default () => (
  <ul className={style.shareMedium}>
    <li className={style.left} >
      <FacebookMediumButton url='/test/facebook' />
    </li>
    <li className={style.right}>
      <TwitterMediumButton url='/test/twitter'/>
    </li>
  </ul>
)
