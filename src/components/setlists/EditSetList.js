import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import InputField from '../common/InputField'
import Select from 'react-select';

@inject('store')
@inject('state')
@observer
class EditSetList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedSets: ''
    };

    this.updateProperty = (key, value) => {
      this.props.item[key] = value
    }

    this.updateSelectedSets = (selectedSets) => {
      this.props.item.sets = selectedSets.map((s) => s.value);
      this.setState({selectedSets});
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      const {item, store} = this.props
      store.setLists.update(item).then(() => {
        this.props.closeEdit();
      })
    }

  } // end constructor

  componentDidMount() {
    if (this.props.item.sets) {
      let setListSets = [];
      this.props.item.sets.forEach((setId) => {
        let tempSet = this.props.state.sets.find(s => s.id === setId);
        if (tempSet !== undefined)
          setListSets.push(tempSet);
        }
      );
      let selectedSets = setListSets.map((s) => ({value: s.id, label: s.title}));
      this.updateSelectedSets(selectedSets);
    }
  }

  render() {
    let {state, item} = this.props;
    return (<div className="list-entry">
      <form onSubmit={this.handleSubmit}>
        <InputField name="title" value={item.title} onChange={this.updateProperty}/>
        <div className="form-group">
          <label>sets</label>
          <Select name="form-field-name" placeholder={"Sets"} multi={true} value={this.state.selectedSets} options={state.sets.map((s) => ({value: s.id, label: s.title}))} onChange={this.updateSelectedSets}/>
        </div>
        <input type="submit" value="save"/>
      </form>
      {/* <ol>
        {
          item.sets.map((id, index) => {
            let set = state.sets.find(s => s.id === id)
            let setComp = set === undefined
              ? ''
              : <li key={index}>{index + 1}. {set.title}</li>
            return setComp
          })
        }
      </ol> */
      }
    </div>)
  }
}

export default EditSetList
