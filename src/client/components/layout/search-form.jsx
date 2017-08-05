import React from 'react';

const SearchForm = () => (
  <form className="form-search" action="/search" method="get">
    <div className="wrap-input">
      <input className="hell" type="text" name="q" placeholder="buscar"/>
      <button className="btn-search"/>
    </div>
  </form>
);

export default SearchForm;
