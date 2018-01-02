import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

@observer
export default class TextField extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
  }

  render () {
    const input = this.props
    return (
      <div className="form-group">
        <label htmlFor={input.id}>{input.label || input.name}</label>
        <textarea
            className="form-control"
            id={input.id}
            name={input.name}
            onChange={this.onChange}
        >
          {input.value}
        </textarea>
      </div>
    )
}
}

TextField.propTypes = {
onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
type: 'text'
}
