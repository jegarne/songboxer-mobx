import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('state')
@observer
class Home extends React.Component {

  // When route is loaded (isomorphic)
  // static async onEnter({ state, store }, params) {
  //   state.common.title = 'SongBoxer';
  //   await store.setLists.browse();
  //   await store.sets.browse();
  //   await store.songs.browse();
  // }

  componentDidMount() {
    const { state, store } = this.props
    state.common.title = 'SongBoxer'
  }

  render() {
    const {state} = this.props
    return (<main>
      <h1>...</h1>
      <div className="home">
      </div>
    </main>)
  }
}

export default Home
