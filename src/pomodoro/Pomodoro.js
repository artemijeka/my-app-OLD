import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Button.scss';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'Начать',
      pomodoroTimeM: [0, 5],
      noise: 'audio/noise.mp3',
      pomodoroInterval: null
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (!this.state.pomodoroInterval) {
      let pomodoroInterval = setInterval(() => {   
        this.setState({
          buttonName: this.state.pomodoroTimeM.join(':'),
        });    

        let curTimer = this.state.pomodoroTimeM;

        if (curTimer[1]===0 && curTimer[0]!==0) {
          curTimer[1] = 59;
            curTimer[0] -= 1;
        } else if (curTimer[1]===0 && curTimer[0]===0) {
          clearInterval(this.state.pomodoroInterval);
        } else {
          curTimer[1] -= 1;
        }

        this.setState({
          pomodoroTimeM: [curTimer[0], curTimer[1]],
        });
        console.log(this.state.pomodoroTimeM);
      }, 1000);

      this.setState({
        pomodoroInterval: pomodoroInterval,
      });
    }
  }

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Помодоро</Card.Title>
          <Card.Text>
            Техника помодоро для интенсивной, концентрированной работы.
          </Card.Text>
          <Button onClick={this.clickHandler} className="btn-danger">{this.state.buttonName}</Button>
        </Card.Body>
      </Card >
    );
  }
}

export default Pomodoro;