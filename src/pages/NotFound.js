import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@observer
class NotFound extends React.Component {
  render() {
    return (
      <main>
        <h3>Page not found. Are you lost ?</h3>

        <Link to="/">Main menu</Link>
      </main>
    )
  }
}

export default NotFound;
