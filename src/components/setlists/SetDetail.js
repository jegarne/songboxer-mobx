import React from 'react'
import {observer, inject} from 'mobx-react'
import EditSet from './EditSet'
import SongEntry from './SongEntry'

@inject('store')
@inject('state')
@observer
class SetDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false
    };
    this.closeEdit = () => {
      this.setState({isEdit: false});
    }
  }

  render() {
    const {state, store, item} = this.props
    return (<div>
      {
        this.state.isEdit
          ? <EditSet item={item} closeEdit={this.closeEdit}/>
          : <div className="list-entry">
              <p>{item.title}
                <button className="edit" onClick={(e) => this.setState({isEdit: true})}/>
                <button className="destroy" onClick={(e) => store.sets.remove(item)}/>
              </p>
              {
                item.songs.map((id, index) => {
                  let song = state.songs.find(s => s.id === id)
                  let songComp = song === undefined
                    ? ''
                    : <SongEntry key={index} count={index} item={song}/>
                  return songComp
                })
              }
            </div>
      }
    </div>)
  }
}

export default SetDetail
