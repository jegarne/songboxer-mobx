import React from 'react'
import { observer, inject } from 'mobx-react'
import EditSong from './EditSong'

@inject('store')
@observer
class Song extends React.Component {
  constructor (props) {
  super(props)
  this.state = {isEdit:false};
  this.closeEdit = () => {
    this.setState({isEdit:false});
  }
}
  render() {
    const { store, item } = this.props

    return (
      <li>
        {
        this.state.isEdit ?
        <EditSong item={item} closeEdit={this.closeEdit} />
        :
        <div className="view">
                  <h3>{item.title}</h3>
                  <button className="edit" onClick={(e) =>
                    this.setState({isEdit:true})}/>
                  <button className="destroy" onClick={(e) => store.songs.remove(item)}/>
        </div>
        }
      </li>
    )
  }
}

export default Song
