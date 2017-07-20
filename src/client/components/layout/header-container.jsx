import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Link} from 'react-router';

import UserMenu from '../user/user-menu';
import SearchForm from './search-form';

@inject('userStore', 'quoteStore')
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <header className="header">
        <nav className="header-nav">
          <ul>
            <li className="header-logo">
              <Link to="/" onClick={this.handleClick} >
                Fraseary
                <img src=""/>
              </Link>
            </li>
            <li className="header-search">
              <SearchForm/>
            </li>
          </ul>
          <UserMenu user={this.props.userStore}/>
        </nav>
      </header>
    );
  }
  handleClick() {
    this.props.quoteStore.fetchQuotesByHome();
  }
}

export default Header;
