import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Song extends React.Component {
  render() {
    const { store, item } = this.props

    return (
      <li className="todo">
        <div className="view">
          <label>{item.title}</label>
          <button className="destroy" onClick={(e) => store.songs.remove(item)}/>
        </div>
      </li>
    )
  }
}

export default Song
