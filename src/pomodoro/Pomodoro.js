import React from 'react';
import { Card, Button } from 'react-bootstrap';


import './Button.scss';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'Начать',
      
    }
  }

  clickHandler(e) {

  }

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Помодоро</Card.Title>
          <Card.Text>
            Техника помодоро для интенсивной, концентрированной работы 30 мин.
          </Card.Text>
          <Button onClick={this.clickHandler} className="btn-danger">{this.state.buttonName}</Button>
        </Card.Body>
      </Card >
    );
  }
}

export default Pomodoro;