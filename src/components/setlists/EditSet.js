import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import InputField from '../common/InputField'
import Select from 'react-select';

@inject('store')
@inject('state')
@observer
class EditSet extends React.Component {
    constructor (props) {
    super(props)

    this.state = {
      selectedSongs: ''
    };

    this.updateProperty = (key, value) => {
      this.props.item[key] = value
    }

    this.updateSelectedSongs = (selectedSongs) => {
      this.props.item.songs = selectedSongs.map((s) => s.value);
      this.setState({selectedSongs});
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      const { item, store } = this.props
      store.sets.update(item).then(() => {
        this.props.closeEdit();
      })
    }

  } // end constructor

  componentDidMount(){
    if(this.props.item.songs){
      let setSongs = [];
      this.props.item.songs.forEach((songId) => {
          let tempSong = this.props.state.songs.find(s => s.id === songId);
          if(tempSong !== undefined) setSongs.push(tempSong);
        }
      );
      let selectedSongs = setSongs.map((s) => ({value:s.id, label:s.title}));
      this.updateSelectedSongs(selectedSongs);
    }
  }

  render() {
    let{state, item} = this.props;
    return (
      <div className="list-entry">
      <form onSubmit={this.handleSubmit}>
        <InputField name="title" value={item.title}
          onChange={this.updateProperty}/>
        <div className="form-group">
          <label>songs</label>
          <Select
          name="form-field-name"
          placeholder={"Songs"}
          multi={true}
          value={this.state.selectedSongs}
          options={state.songs.map((s) => ({value:s.id, label:s.title}))}
          onChange={this.updateSelectedSongs}
          />
        </div>

        <input type="submit" value="save" />
      </form>
      {/* <ol>
        {item.songs.map((id, index) => {
          let song = state.songs.find(s => s.id === id)
          let songComp = song === undefined ? '' :
          <li key={index}>{index + 1}. {song.title}</li>
          return songComp
        })}
      </ol> */}
      </div>
    )
  }
}

export default EditSet
