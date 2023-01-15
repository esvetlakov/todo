/* eslint-disable no-plusplus */
import { Component } from 'react';

export default class Timer extends Component {
  state = {
    ...this.props,
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  timerPlay = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => this.timeCount(), 1000);
  };

  timeCount = () => {
    let { min: newMin, sec: newSec } = this.state;

    if (newSec < 60) {
      newSec += 1;
    }
    if (newSec >= 60) {
      newSec = 0;
      newMin += 1;
    }
    if (newMin >= 60) {
      newMin = 0;
    }

    this.setState({
      min: newMin,
      sec: newSec,
    });
  };

  timePause = () => {
    clearInterval(this.timerId);
  };

  render() {
    const { min, sec } = this.state;
    return (
      <>
        <button type="button" className="icon icon-play" aria-label="start timer" onClick={() => this.timerPlay()} />
        <button type="button" className="icon icon-pause" aria-label="pause timer" onClick={() => this.timePause()} />
        <span className="time">
          {min}:{sec}
        </span>
      </>
    );
  }
}
