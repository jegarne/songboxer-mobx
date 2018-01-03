import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

@observer
export default class InputField extends Component {
  constructor(props) {
    super(props)
    this.propsOnChange = this.propsOnChange.bind(this)
    this.secondsTohhmmss = this.secondsTohhmmss.bind(this)
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    this.onHoursChange = (event) => {
      let value = event.target.value * 1;
      this.setState({hours: value})
      let seconds = value * 3600
      seconds += this.state.minutes * 60
      seconds += this.state.seconds
      this.propsOnChange(seconds)
    }

    this.onMinutesChange = (event) => {
      let value = event.target.value * 1
      this.setState({minutes: value})
      let seconds = this.state.hours * 3600
      seconds += value * 60
      seconds += this.state.seconds
      this.propsOnChange(seconds)
    }

    this.onSecondsChange = (event) => {
      let value = event.target.value * 1
      this.setState({seconds: value})
      let seconds = this.state.hours * 3600
      seconds += this.state.minutes * 60
      seconds += value * 1
      this.propsOnChange(seconds)
    }
  }

  componentDidMount() {
    let seconds = this.props.value
    let result = this.secondsTohhmmss(seconds)
    this.setState({hours: result[0], minutes: result[1], seconds: result[2]})
  }

  propsOnChange(seconds) {
    this.props.onChange('seconds', seconds)
  }

  secondsTohhmmss = (totalSeconds) => {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    // round seconds
    seconds = Math.round(seconds * 100) / 100

    let result = [];
    result[0] = isNaN(hours) ? 0 : hours;
    result[1] = isNaN(minutes) ? 0 : minutes;
    result[2 ]= isNaN(seconds) ? 0 : seconds;
    return result;
  }

  render() {
    const input = this.props
    return (<div className="form-group">
      <label>Hours</label>
      <input className="Select-control" name="hours" onChange={this.onHoursChange} type="text" value={this.state.hours}/>
      <label>Minutes</label>
      <input className="Select-control" name="minutes" onChange={this.onMinutesChange} type="text" value={this.state.minutes}/>
      <label>Seconds</label>
      <input className="Select-control" name="seconds" onChange={this.onSecondsChange} type="text" value={this.state.seconds}/>
    </div>)
  }
}
