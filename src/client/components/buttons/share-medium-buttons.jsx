import React from 'react';
import FacebookMediumButton from './facebook-medium-button';
import TwitterMediumButton from './twitter-medium-button';
import style from './buttons.styl';

export default () => (
  <ul className={style.shareMedium}>
    <li className={style.left} >
      <FacebookMediumButton url="/test/facebook"/>
    </li>
    <li className={style.right}>
      <TwitterMediumButton url="/test/twitter"/>
    </li>
  </ul>
);
