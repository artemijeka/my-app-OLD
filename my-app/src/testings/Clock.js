import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  /* Эти методы называются «методами жизненного цикла» (lifecycle methods). */
  /* Должны называться именно этими именами! */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  /* Эти методы называются «методами жизненного цикла» (lifecycle methods). */
  /* Должны называться именно этими именами! */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>Сейчас время {this.state.date.toLocaleString()}</div>
    );
  }
}

export default Clock;