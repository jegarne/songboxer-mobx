import React from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

@inject('store')
@observer
class Menu extends React.Component {
  render() {
    const {store} = this.props
    return (<div>
      {
        store.account.isLoggedIn()
          ? <LoggedInMenu/>
          : <LoggedOutMenu/>
      }
    </div>)
  }
}

function LoggedInMenu() {
  return <menu>
    <Link to="/">Home</Link>
    <Link to="/page/setlists">Set Lists</Link>
    <Link to="/page/sets">Sets</Link>
    <Link to="/page/songs">Songs</Link>
    <Link to="/page/about">About</Link>
    <Link to="/page/logout">Logout</Link>
  </menu>
}

function LoggedOutMenu() {
  return <menu>
    <Link to="/">Home</Link>
    <Link to="/page/about">About</Link>
    <Link to="/page/register">Register</Link>
    <Link to="/page/login">Login</Link>
  </menu>
}

export default Menu
