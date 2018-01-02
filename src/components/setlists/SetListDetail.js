import React from 'react'
import {observer, inject} from 'mobx-react'
import EditSetList from './EditSetList'
import SetEntry from './SetEntry'

@inject('store')
@inject('state')
@observer
class SetListDetail extends React.Component {
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
    return (<div>
      {
        this.state.isEdit
          ? <EditSetList item={item} closeEdit={this.closeEdit}/>
          : <div className="list-entry">
              <p>{item.title}
                <button className="edit" onClick={(e) => this.setState({isEdit: true})}/>
                <button className="destroy" onClick={(e) => store.setLists.remove(item)}/>
              </p>
              {
                item.sets.map((id, index) => {
                  let set = state.sets.find(s => s.id === id)
                  let setComp = set === undefined
                    ? ''
                    : <SetEntry key={index} count={index} item={set}/>
                  return setComp
                })
              }
            </div>
      }
    </div>)
  }
}

export default SetListDetail
