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
    <Link to="/home">Home</Link>
    <Link to="/setlists">Set Lists</Link>
    <Link to="/sets">Sets</Link>
    <Link to="/songs">Songs</Link>
    <Link to="/logout">Logout</Link>
  </menu>
}

function LoggedOutMenu() {
  return <menu>
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  </menu>
}

export default Menu
