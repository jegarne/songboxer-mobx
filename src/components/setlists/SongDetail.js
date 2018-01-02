import React, {Component, PropTypes} from 'react'
import {observer, inject} from 'mobx-react'
import EditSong from './EditSong'
import YouTube from 'react-youtube'
const getVideoId = require('get-video-id');
import RichTextEditor from 'react-rte/lib/RichTextEditor';

@inject('store')
@inject('state')
@observer
class SongDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      isEdit: false,
      areNotesReadOnly: true,
      areLyricsReadOnly: true,
      playerOptions: {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      },
      notes: RichTextEditor.createEmptyValue(),
      notesBtnText:'Edit',
      lyrics: RichTextEditor.createEmptyValue(),
      lyricsBtnText:'Edit'
    };

    this.onNotesChange = (notes) => {
      this.setState({notes});
    }

    this.onLyricsChange = (lyrics) => {
      this.setState({lyrics});
    }

    this.closeEdit = () => {
      this.setState({isEdit: false});
    }

    this.goBack = () => {
      this.props.history.push('/songs');
    }

    this.toggleNotes = () => {
      if (!this.state.areNotesReadOnly) {
        let song = Object.assign({}, this.state.item)
        song.notes = this.state.notes.toString('html')
        this.props.store.songs.update(song).then(() => {
          this.setState({areNotesReadOnly: true,
            notesBtnText:'Edit'})
        })
      } else {
        this.setState({areNotesReadOnly: false,
          notesBtnText:'Save'})
      }
    }

    this.toggleLyrics = () => {
      if (!this.state.areLyricsReadOnly) {
        let song = Object.assign({}, this.state.item)
        song.lyrics = this.state.lyrics.toString('html')
        this.props.store.songs.update(song).then(() => {
          this.setState({areLyricsReadOnly: true,
            lyricsBtnText:'Edit'})
        })
      } else {
        this.setState({areLyricsReadOnly: false,
          lyricsBtnText:'Save'})
      }
    }

    this.onPlayerReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }
  } // end contructor

  // When route is loaded (isomorphic)
  // static async onEnter({ state, store }, params) {
  //   state.common.title = 'Songs'
  //   await store.songs.browse()
  // }

  componentDidMount() {
    //this.props.store.songs.browse();
    let song = this.props.state.getSong(this.props.match.params.id);
    this.setState({item: song});
    this.props.state.common.title = song.title;
    if (song.notes !== undefined) {
      this.setState({
        notes: RichTextEditor.createValueFromString(song.notes, 'html')
      })
    }
    if (song.lyrics !== undefined) {
      this.setState({
        lyrics: RichTextEditor.createValueFromString(song.lyrics, 'html')
      })
    }
  }

  render() {
    const {store} = this.props
    const {item} = this.state
    const videoId = item.videoURL
      ? getVideoId(item.videoURL)
      : ''
    return (<main>
      {
        this.state.isEdit
          ? <EditSong item={item} closeEdit={this.closeEdit}/>
          : <div className="song-detail">
              <div>
                <button className="detail-button back" onClick={(e) => this.goBack()}/>
                <button className="detail-button edit" onClick={(e) => this.setState({isEdit: true})}/>
                <button className="detail-button destroy" onClick={(e) => store.songs.remove(item)}/>
              </div>
              <h2 className="title">{item.title}</h2>
              <p>
                <span className="artist">{item.artist}</span>{' | '}
                <span className="key">Key: {item.key}</span>{' | '}
                <span>
                  {
                    (item.videoURL)
                      ? <a className="video" href={item.videoURL} target="_blank">
                          video</a>
                      : 'no video'
                  }
                </span>
              </p>
              {
                (videoId)
                  ? <YouTube videoId={videoId.id} opts={this.state.playerOptions} onReady={this.onPlayerReady}/>
                  : ''
              }
            </div>
      }
      <p>
        <button className="song-button" onClick={(e) => this.toggleNotes()}>
          {this.state.notesBtnText + ' Notes'}</button>
      </p>
      <div style={{width:'640px'}}>
        <RichTextEditor value={this.state.notes}
          onChange={this.onNotesChange}
          readOnly={this.state.areNotesReadOnly}/>
      </div>
      <p>
        <button className="song-button" onClick={(e) => this.toggleLyrics()}>
          {this.state.lyricsBtnText + ' Lyrics'}</button>
      </p>
      <div style={{width:'640px'}}>
        <RichTextEditor value={this.state.lyrics}
          onChange={this.onLyricsChange}
          readOnly={this.state.areLyricsReadOnly}/>
      </div>

    </main>)
  }
}

export default SongDetail
