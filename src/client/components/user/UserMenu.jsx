import React, { Component } from 'react';
import { Link } from 'react-router'

import s from './user.styl'
import cx from 'classnames'

class UserMenu extends Component{
// function UserMenu({appStore}){
  constructor(props){
    super(props);
    this.state = {menuOpen: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    e.preventDefault();
    // event.preventDefault()
    // console.log('holaaaaaa')
    this.setState((prevState)=>({
      menuOpen: !prevState.menuOpen
    }))
  }
  render(){
    const { isAuth } = this.props.appStore;
    return (
      <div>
        {isAuth
          ? <UserNav open={this.state.menuOpen} onClick={this.handleClick}/>
          : <AuthMenu />
        }
      </div>
    );
  }
}

function UserNav({open, ...props}){
  return (
    <nav className={s.userNav}>
      <TopNav {...props} />
      {open
        ? <ListNav />
        : null
      }

    </nav>
  );
}

function TopNav(props){
  return (
    <a className={s.topNav} href="/perfil/user" {...props}>
      <img src="/assets/media/images/avatar.png" className={s.avatar} />
      <span className={s.name}>Name</span>
    </a>
  );
}

function ListNav(){
  const items = [
    {name:'Perfil', link:'/perfil/user'},
    {name:'Configuración', link:'/settings'},
  ]
  return(
    <div className={s.listNav}>
      <div className={s.arrowUp}></div>
      <ul>
        {items.map(item => <ListItem name={item.name} link={item.link} />)}
        <ListItem name="Cerrar Sesión" link="/logout"/>
      </ul>
    </div>
  );
}

function ListItem({name, link}){
  return(
    <li>
      <Link to={link} >{name}</Link>
    </li>
  );
}


function AuthMenu(){
  return (
    <ul>
      <li className="signup">
        <Link to="/signup">Sign up</Link>
      </li>
      <li className="login">
        <Link to="/login">Log in</Link>
      </li>
    </ul>
  );
}

export default UserMenu;
