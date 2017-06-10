import React from 'react';
import FacebookIconButton from './facebook-icon-button';
import TwitterIconButton from './twitter-icon-button';
import style from './buttons.styl';

export default () => (
  <ul className={style.btnList}>
    <li>
      <FacebookIconButton url="/test/facebook"/>
    </li>
    <li>
      <TwitterIconButton url="/test/twitter"/>
    </li>
  </ul>
);
