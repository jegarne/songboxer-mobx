import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import SetLists from '../pages/SetLists'
import Sets from '../pages/Sets'
import Songs from '../pages/Songs'

export default [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/setlists',
    component: SetLists
  },
  {
    path: '/sets',
    component: Sets
  },
  {
    path: '/songs',
    component: Songs
  }
]
