import React from 'react'
import { observer, inject } from 'mobx-react'
import {Link} from 'react-router-dom'
import DisplayTime from '../common/DisplayTime'

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
          {count+1}.{' '}
          <Link to={"/songdetail/" + item.id}>{item.title}</Link>
          {' ('}<DisplayTime seconds={item.seconds} />{')'}
        </p>
      </div>
    )
  }
}

export default SongEntry
