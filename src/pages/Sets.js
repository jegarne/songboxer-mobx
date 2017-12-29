import React from 'react'
import { observer, inject } from 'mobx-react'
import AddSet from '../components/setlists/AddSet'
import Set from '../components/setlists/Set'

@inject('state')
@observer
class Sets extends React.Component {

  // When route is loaded (isomorphic)
  static async onEnter({ state, store }, params) {
    state.common.title = 'Sets'
    await store.setLists.browse()
  }

  render() {
    const { state } = this.props
    return (
      <main>
        <h1>Sets</h1>
        <div className="home">
          <AddSet />
          <section className="main">
            <ul className="todo-list">
              {state.sets.map((item, index) => {
                return <Set key={index} item={item}/>
              })}
            </ul>
          </section>
        </div>
      </main>
    )
  }
}

export default Sets
