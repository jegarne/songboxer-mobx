import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

@observer
export default class InputField extends Component {
  constructor(props) {
    super(props)
    this.secondsTohhmmss = this.secondsTohhmmss.bind(this)
    this.prettyNum = this.prettyNum.bind(this)
  }

  secondsTohhmmss = (totalSeconds) => {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    // round seconds
    seconds = Math.round(seconds * 100) / 100
    if (!hours && !minutes && !seconds) {
      return '0'
    } else if (hours) {
      return `${this.prettyNum(hours)}:${this.prettyNum(minutes)}:${this.prettyNum(seconds)}`
    } else {
      return `${minutes}:${this.prettyNum(seconds)}`
    }
  }

  prettyNum = (num) => {
    if (isNaN(num) || !num)
      return ''
    return num < 10
      ? '0' + num
      : num
  }

  render() {
    return (<span style={{
        fontSize: '80%'
      }}>{this.secondsTohhmmss(this.props.seconds)}</span>)
  }
}
