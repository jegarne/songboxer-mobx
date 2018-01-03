import React from 'react'
import {observer, inject} from 'mobx-react'
import EditSet from './EditSet'
import SongEntry from './SongEntry'
import DisplayTime from '../common/DisplayTime'

@inject('store')
@inject('state')
@observer
class SetDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      totalSeconds: 0,
      songs: []
    };

    this.closeEdit = () => {
      this.updateSongs();
      this.setState({isEdit: false});
    }

    this.addSongTime = (songSeconds) => {
      let newTotal = this.state.totalSeconds += songSeconds
      this.setState({totalSeconds: newTotal});
    }

    this.updateSongs = () => {
      let songArray = this.props.item.songs.map((id) => {
        let song = this.props.state.songs.find(s => s.id == id);
        if (song !== undefined) {
          if (song.seconds !== undefined) {
            this.addSongTime(song.seconds * 1)
          }
          return song;
        }
      });
      this.setState({songs: songArray})
    }

  } // end constructor

  componentDidMount() {
    this.updateSongs();
  }

  render() {
    const {state, store, item} = this.props
    return (<div>
      {
        this.state.isEdit
          ? <EditSet item={item} closeEdit={this.closeEdit}/>
          : <div className="list-entry">
              <p>{item.title}
                {' - '}
                <DisplayTime seconds={this.state.totalSeconds}/>
                <button className="edit" onClick={(e) => this.setState({isEdit: true})}/>
                <button className="destroy" onClick={(e) => store.sets.remove(item)}/>
              </p>
              {
                this.state.songs.map((song, index) => {
                  return (song !== undefined) ?
                  <SongEntry key={index} count={index} item={song}/>
                  : ''
                })
              }
            </div>
      }
    </div>)
  }
}

export default SetDetail
