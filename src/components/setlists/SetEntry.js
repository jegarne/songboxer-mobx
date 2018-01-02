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
    const { store, item, count } = this.props
    return (
      <div className="list-entry">
        <p className="title">
          <p>{count+1}. {item.title}</p>
        </p>
      </div>
    )
  }
}

export default SongEntry
