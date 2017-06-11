import React from 'react';

export default ({name}) => (
  <svg className={'icon icon-' + name}>
    <use xlinkHref={'#icon-' + name}/>
  </svg>
);
