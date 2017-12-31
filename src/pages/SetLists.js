import React from 'react'
import { observer, inject } from 'mobx-react'
import AddSetList from '../components/setlists/AddSetList'
import SetList from '../components/setlists/SetList'

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
    const { state, store } = this.props
    state.common.title = 'Set Lists'
    store.setLists.browse();
  }

  render() {
    const { state } = this.props
    return (
      <main>
        <h1>Set Lists</h1>
        <div className="home">
          <AddSetList/>
          <section className="main">
            <ul className="item-list">
              {state.setLists.map((item, index) => {
                return <SetList key={index} item={item}/>
              })}
            </ul>
          </section>
        </div>
      </main>
    )
  }
}

export default SetLists
