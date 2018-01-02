import React from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import FA from 'react-fontawesome'
import {Collapse, Card, CardBody} from 'reactstrap';

@inject('store')
@inject('state')
@observer
class SongEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caretPos: 'caret-right',
      isCollapsed: false
    }

    this.toggleCollapse = () => {
      let _caretPos = this.state.caretPos === 'caret-right'
        ? 'caret-down'
        : 'caret-right';
      this.setState({caretPos: _caretPos})
      this.setState({
        isCollapsed: !this.state.isCollapsed
      })
    }
  } // end constructor

  render() {
    const {store, item, count, state} = this.props
    return (<div className="list-entry">
      <p className="title" onClick={this.toggleCollapse}>
        <FA name={this.state.caretPos}/> {item.title}</p>
      <Collapse isOpen={this.state.isCollapsed}>
        <Card>
          <CardBody>
            <ol>
              {
                item.songs.map((id, index) => {
                  let song = state.songs.find(s => s.id === id)
                  let songComp = song === undefined
                    ? ''
                    : <li><Link to={"/songdetail/" + song.id}>{song.title}</Link></li>
                  return songComp
                })
              }
            </ol>
          </CardBody>
        </Card>
      </Collapse>
    </div>)
  }
}

export default SongEntry
