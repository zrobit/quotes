import React from 'react';
import FacebookIconButton from './facebookIconButton';
import TwitterIconButton from './twitterIconButton';
import style from './buttons.styl'

export default () => (
  <ul className={style.btnList}>
    <li>
      <FacebookMediumButton url='/test/facebook' />
    </li>
    <li>
      <TwitterMediumButton url='/test/twitter'/>
    </li>
  </ul>
)
