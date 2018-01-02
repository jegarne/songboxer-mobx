import React from 'react'
import { observer, inject } from 'mobx-react'
import AddSong from '../components/setlists/AddSong'
import SongEntry from '../components/setlists/SongEntry'

@inject('state')
@inject('store')
@observer
class Songs extends React.Component {

  // When route is loaded (isomorphic)
  // static async onEnter({ state, store }, params) {
  //   state.common.title = 'Songs'
  //   await store.songs.browse()
  // }

  componentDidMount() {
    const { state, store } = this.props
    state.common.title = 'Songs'
    store.songs.browse();
  }

  render() {
    const { state } = this.props
    return (
      <main>
        <h1>.</h1>
        <div className="list-container">
          <AddSong />
            <div className="item-list">
              {state.songs.map((item, index) => {
                return <SongEntry key={index} count={index} item={item}/>
              })}
            </div>
        </div>
      </main>
    )
  }
}

export default Songs
