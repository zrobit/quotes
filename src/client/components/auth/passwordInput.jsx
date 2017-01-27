import React from 'react'

export default ({value, handleChange, handleBlur}) => (
  <input
    className="in-text"
    type="password"
    name="password"
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
  />
);
