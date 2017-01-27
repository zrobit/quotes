import React from 'react'

export default ({value, handleChange, handleBlur}) => (
  <input
    className="in-text"
    type="text"
    name="email"
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
  />
);
