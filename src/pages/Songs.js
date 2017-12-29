import React from 'react'
import { observer, inject } from 'mobx-react'
import AddSong from '../components/setlists/AddSong'
import Song from '../components/setlists/Song'

@inject('state')
@observer
class Songs extends React.Component {

  // When route is loaded (isomorphic)
  static async onEnter({ state, store }, params) {
    state.common.title = 'Songs'
    await store.setLists.browse()
  }

  render() {
    const { state } = this.props
    return (
      <main>
        <h1>Songs</h1>
        <div className="home">
          <AddSong />
          <section className="main">
            <ul className="todo-list">
              {state.songs.map((item, index) => {
                return <Song key={index} item={item}/>
              })}
            </ul>
          </section>
        </div>
      </main>
    )
  }
}

export default Songs
