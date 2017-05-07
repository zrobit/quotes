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
    this.setState((prevState)=>({
      menuOpen: !prevState.menuOpen
    }))
  }
  render(){
    const { isAuth, name, hashId } = this.props.user;
    return (
      <div>
        {isAuth
          ? <UserNav user={name} hash={hashId} open={this.state.menuOpen} onClick={this.handleClick}/>
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
        ? <ListNav {...props}/>
        : null
      }

    </nav>
  );
}

function TopNav({user, hash, ...props}){
  return (
    <a className={s.topNav} href={"/perfil/"+hash} {...props}>
      <img src="/assets/media/images/avatar.png" className={s.avatar} />
      <span className={s.name}>{user}</span>
    </a>
  );
}

function ListNav({hash}){
  const items = [
    {name:'Perfil', link:'/perfil/user'},
    {name:'Configuración', link:'/settings'},
  ]
  return(
    <div className={s.listNav}>
      <div className={s.arrowUp}></div>
      <ul>
        <ListItem name="Perfil" link={'/perfil/'+hash} />
        <ListItem name="Configuración" link='/settings' />
        <ListItemAnchor name="Cerrar Sesión" link="/logout"/>
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

function ListItemAnchor({name, link}){
  return(
    <li>
      <a href={link}>{name}</a>
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
