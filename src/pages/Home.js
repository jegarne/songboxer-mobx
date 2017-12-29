import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('state')
@observer
class Home extends React.Component {

  // When route is loaded (isomorphic)
  static async onEnter({
    state,
    store
  }, params) {
    state.common.title = 'Home'
    await store.setLists.browse()
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
