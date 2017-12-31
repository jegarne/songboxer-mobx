import React from 'react'
import { observer, inject } from 'mobx-react'
import EditSet from './EditSet'
import Song from './Song'

@inject('store')
@inject('state')
@observer
class Set extends React.Component {
  constructor (props) {
  super(props)
  this.state = {isEdit:false};
  this.closeEdit = () => {
    this.setState({isEdit:false});
  }
}

  render() {
    const { state, store, item } = this.props
    return (
      <li>
        {
        this.state.isEdit ?
        <EditSet item={item} closeEdit={this.closeEdit} />
        :
        <div className="view">
                  <h3>{item.title}</h3>
                  <button className="edit" onClick={(e) =>
                    this.setState({isEdit:true})}/>
                  <button className="destroy" onClick={(e) =>
                    store.sets.remove(item)}/>
                  {item.songs.map((id, index) => {
                    let song = state.songs.find(s => s.id === id)
                    let songComp = song === undefined ? '' :
                    <Song key={index} item={song} />
                    return songComp
                  })}
        </div>
        }
      </li>
    )
  }
}

export default Set
