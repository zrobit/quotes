import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Link} from 'react-router';

import SearchForm from './search-form';
import UserMenu from '../user/user-menu';

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
          <UserMenu user={this.props.user}/>
        </nav>
      </header>
    );
  }
  handleClick() {

  }
}

Header = inject(
  stores => ({
    user: stores.userStore
  })
)(Header);

export default Header;
