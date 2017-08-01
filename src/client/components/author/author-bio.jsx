import React from 'react';
import hash from '../../utils/hash';
import ShareMediumButtons from '../buttons/share-medium-buttons';

import s from './author.styl';

function HeaderBio({author, isLoading}) {
  return (
    <div className={s.header} >
      <div className={s.pic}>
        {isLoading ? <span>loading</span> : <img src={author.bio.avatar}/>}
      </div>
      <h2 className={s.title}>{author.name}</h2>
    </div>
  );
}

function MetaItem({label, value}) {
  return (
    <li>
      <span>{label}:</span><span>{value}</span>
    </li>
  );
}

function ContentBio({resume, meta}) {
  return (
    <div>
      <p>{resume}</p>
      <ul>
        { meta.map(item => <MetaItem key={hash()} label={item.label} value={item.value}/>) }
      </ul>
    </div>
  );
}

function AuthorBio({author, isLoading}) {
  return (
    <div className="card">
      <HeaderBio author={author} isLoading={isLoading}/>
      { isLoading ?
        <span>loading</span> :
        <ContentBio resume={author.bio.resume} meta={author.bio.meta}/>
      }
      <ShareMediumButtons/>
    </div>
  );
}
export default AuthorBio;
