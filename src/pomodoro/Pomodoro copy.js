import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Input, Row, Col, Container } from 'reactstrap';
import './pomodoro.scss';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'Начать',
      pomodoroTimeM: [30, 0],
      pomodoroInterval: null,
      noiseUrl: './audio/noise.mp3',
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.audioPlayer = null;
  }

  clickHandler() {
    if (!this.state.pomodoroInterval) {

      this.audioPlayer = document.getElementById('audioPlayer');
      this.audioPlayer.loop = true;
      this.audioPlayer.play();

      this.pomodoroMinutesCustom = document.querySelector('#pomodoroMinutes').value;
      if (this.pomodoroMinutesCustom!=='') {
        this.setState({
          pomodoroTimeM: [this.pomodoroMinutesCustom, 0],
        });
      }

      let pomodoroInterval = setInterval(() => {
        this.setState({
          buttonName: this.state.pomodoroTimeM.join(':'),
        });

        let curTimer = this.state.pomodoroTimeM;

        if (curTimer[1] === 0 && curTimer[0] !== 0) {
          curTimer[1] = 59;
          curTimer[0] -= 1;
        } else if (curTimer[1] === 0 && curTimer[0] === 0) {
          clearInterval(this.state.pomodoroInterval);
          this.audioPlayer.pause();
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
      <Card
        color="light"
        outline
        color="danger"
        className="pomodoro"
      >
        <CardBody>
          <CardTitle tag="h5">
            Помодоро
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Техника помодоро - для интенсивной, концентрированной работы.
          </CardSubtitle>
          <CardText>
            {/* Some quick example text to build on the card title and make up the bulk of the card's content. */}
          </CardText>
          <audio id="audioPlayer">
            <source src={this.state.noiseUrl} type="audio/mpeg" />
          </audio>
          <Container fluid="true">
            <Row xs="12">
              <Col xs="4">
                <Button onClick={this.clickHandler} color="danger">
                  {this.state.buttonName}
                </Button>
              </Col>
              <Col xs="5">
                <Input
                  id="pomodoroMinutes"
                  name="number"
                  placeholder="30мин"
                  type="number"
                />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

export default Pomodoro;