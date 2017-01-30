import React from 'react'

const SearchForm = (props) => (
  <form className="form-search" action="/search" method="post">
    <div className="wrap-input">
      <input className="hell" type="text" name="search" placeholder="buscar"/>
      <button className="btn-search"></button>
    </div>
  </form>
);

export default SearchForm;
