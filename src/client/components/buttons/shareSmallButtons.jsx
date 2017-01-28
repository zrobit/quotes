import React from 'react';
import FacebookSmallButton from './facebookSmallButton';
import TwitterSmallButton from './twitterSmallButton';
import style from './buttons.styl'

export default () => (
  <ul className={style.btnList}>
    <li>
      <FacebookSmallButton url='/test/facebook' />
    </li>
    <li>
      <TwitterSmallButton url='/test/twitter'/>
    </li>
  </ul>
)
