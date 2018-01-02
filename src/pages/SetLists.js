import React from 'react'
import {observer, inject} from 'mobx-react'
import AddSetList from '../components/setlists/AddSetList'
import SetListDetail from '../components/setlists/SetListDetail'

@inject('state')
@inject('store')
@observer
class SetLists extends React.Component {

  // When route is loaded (isomorphic)
  // static async onEnter({ state, store }, params) {
  //   state.common.title = 'Set Lists'
  //   await store.setLists.browse()
  // }

  componentDidMount() {
    const {state, store} = this.props
    state.common.title = 'Set Lists'
    store.setLists.browse();
    store.sets.browse();
    store.songs.browse();
  }

  render() {
    const {state} = this.props
    return (<main>
      <h1>...</h1>
      <div className="list-container">
        <AddSetList/>
        <div className="item-list">
          {
            state.setLists.map((item, index) => {
              return <SetListDetail key={index} item={item}/>
            })
          }
        </div>
      </div>
    </main>)
  }
}

export default SetLists
