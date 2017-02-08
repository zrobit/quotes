import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import { Link } from 'react-router';

import SearchForm from './SearchForm';
import UserMenu from '../user/UserMenu';

@inject('appStore')
class Header extends Component {
  render() {
    const {isAuth} = this.props.appStore;
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
          </ul>
          <UserMenu appStore={this.props.appStore}/>
        </nav>
      </header>
    )
  }
}

export default Header
