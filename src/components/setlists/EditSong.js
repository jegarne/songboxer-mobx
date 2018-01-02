import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import InputField from '../common/InputField'
import TextField from '../common/TextField'

@inject('store')
@observer
class EditSong extends React.Component {
  constructor(props) {
    super(props)
    this.updateProperty = this.updateProperty.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateProperty(key, value) {
    this.props.item[key] = value
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {item, store} = this.props
    store.songs.update(item).then(() => {
      this.props.closeEdit();
    })
  }

  render() {
    let {item} = this.props;
    return (<div className="song-detail-edit">
      <form onSubmit={this.handleSubmit}>
        <InputField name="title" value={item.title} onChange={this.updateProperty}/>
        <InputField name="artist" value={item.artist} onChange={this.updateProperty}/>
        <InputField name="key" value={item.key} onChange={this.updateProperty}/>
        <InputField name="videoURL" value={item.videoURL} onChange={this.updateProperty}/>
        <input type="submit" value="save"/>
      </form>
    </div>)
  }
}

export default EditSong
