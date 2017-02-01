import React from 'react'
import { Link } from 'react-router'
import s from './author.styl'

import ShareMediumButtons from '../buttons/ShareMediumButtons'

function HeaderBio({author, isLoading}){
  console.log('desde HeaderBio: '+ isLoading)
  return (
    <div className={s.header} >
      <div className={s.pic}>
        {!isLoading ? <img src={author.bio.avatar} /> : <span>loading</span>}
      </div>
      <h2 className={s.title}>{author.name}</h2>
    </div>
  );
};

function MetaItem({label, value}) {
  return(
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
        { meta.map((item) => <MetaItem label={item.label} value={item.value} />) }
      </ul>
    </div>
  );
};


function AuthorBio({author, isLoading}) {
  return(
    <div className="card">
      <HeaderBio author={author} isLoading={isLoading}/>
      { !isLoading ?
        <ContentBio resume={author.bio.resume} meta={author.bio.meta} />
        :
        <span>loading</span>
      }
      <ShareMediumButtons />
    </div>
  );
};
export default AuthorBio;
