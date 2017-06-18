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


export function SplitPane({main, sidebar, decor}) {
  return (
    <div className={decor.wrap}>
      <div className={cx(decor.inner, 'clearfix')}>
        <div className={decor.sidebar}>
          {sidebar}
        </div>
        <div className={decor.main}>
          {main}
        </div>
      </div>
    </div>
  );
}

const styleRight = {
  wrap: style.wrap,
  inner: style.inner,
  main: style.main,
  sidebar: style.sidebar
};

export function SplitPaneRight({main, sidebar}) {
  return (
    <SplitPane main={main} sidebar={sidebar} decor={styleRight}/>
  );
}

const styleLeft = {
  wrap: style.wrapLeft,
  inner: style.innerLeft,
  main: style.mainLeft,
  sidebar: style.asideLeft
};

export function SplitPaneLeft({main, sidebar}) {
  return (
    <SplitPane main={main} sidebar={sidebar} decor={styleLeft}/>
  );
}

export function SplitPaneThree({main, left, right}) {
  return (
    <SplitPaneLeft
      main={<SplitPaneRight main={main} sidebar={right}/>}
      sidebar={left}
      />
  );
}
