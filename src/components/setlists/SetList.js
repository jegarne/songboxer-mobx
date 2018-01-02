import React from 'react'
import {observer, inject} from 'mobx-react'
import EditSetList from './EditSetList'
import Set from './Set'

@inject('store')
@inject('state')
@observer
class SetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false
    };
    this.closeEdit = () => {
      this.setState({isEdit: false});
    }
  }

  render() {
    const {state, store, item} = this.props
    return (<div className="todo">
      {
        this.state.isEdit
          ? <EditSetList item={item} closeEdit={this.closeEdit}/>
          : <div className="view">
              <p>{item.title}
                <button className="edit" onClick={(e) => this.setState({isEdit: true})}/>
                <button className="destroy" onClick={(e) => store.setLists.remove(item)}/>
              </p>
              {
                item.sets.map((id, index) => {
                  let set = state.sets.find(s => s.id === id)
                  let setComp = set === undefined
                    ? ''
                    : <Set key={index} item={set}/>
                  return setComp
                })
              }
            </div>
      }
    </div>)
  }
}

export default SetList
