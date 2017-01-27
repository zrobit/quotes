import React, { Component } from 'react';
import {observer} from "mobx-react";
import SearchForm from './searchForm'
import { Link } from 'react-router'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="header-nav">
          <ul>
            <li className="header-logo">
              <Link to="/">Dot</Link>
            </li>
            <li className="header-search">
              <SearchForm/>
            </li>
            <li className="signup">
              <Link to="/signup">Sign up</Link>
            </li>
            <li className="login">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
