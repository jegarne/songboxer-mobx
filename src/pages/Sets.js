import React from 'react'
import {observer, inject} from 'mobx-react'
import AddSet from '../components/setlists/AddSet'
import SetDetail from '../components/setlists/SetDetail'

@inject('state')
@inject('store')
@observer
class Sets extends React.Component {

  // When route is loaded (isomorphic)
  static async onEnter({ state, store }, params) {
    state.common.title = 'Sets'
    await store.setLists.browse()
    await store.sets.browse()
    await store.songs.browse();
  }

  componentDidMount() {
    const {state, store} = this.props
    state.common.title = 'Sets'
    // store.sets.browse();
    // store.songs.browse();
  }

  render() {
    const {state} = this.props
    return (<main>
      <h1>..</h1>
      <div className="list-container">
        <AddSet/>
        <div className="item-list">
          {
            state.sets.map((item, index) => {
              return <SetDetail key={index} count={index} item={item}/>
            })
          }
        </div>
      </div>
    </main>)
  }
}

export default Sets
