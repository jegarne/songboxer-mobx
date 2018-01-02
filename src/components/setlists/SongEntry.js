import React from 'react'
import { observer, inject } from 'mobx-react'
import {Link} from 'react-router-dom'

@inject('store')
@observer
class SongEntry extends React.Component {
  constructor (props) {
    super(props)

  }

  render() {
    const { store, item } = this.props
    return (
      <div className="view">
        <p className="title">
          <Link to={"/songdetail/" + item.id}>{item.title}</Link>
        </p>
      </div>
    )
  }
}

export default SongEntry
