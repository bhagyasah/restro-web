import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: 0,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.timer());
  }
  timer = () => setInterval(() => {
    this.setState({
      timerValue: this.state.timerValue + 1,
    });
  }, 1000);

  render() {
    const valueInSecond = Math.floor((Date.now() - this.props.startTime) / 1000);
    return (
      <div>
        {`${Math.floor(valueInSecond / 3600)}h:${(Math.floor(valueInSecond / 60)) % 60}m:${valueInSecond % 60}s`}
      </div>
    );
  }
}
Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
}
export default Timer;

