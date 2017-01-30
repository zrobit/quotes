import React from 'react'
import { Link } from 'react-router'
import AuthorBio from './authorBio'

export default () => (
  <div className="sidebar">
    <AuthorBio author={author}/>
  </div>
);
