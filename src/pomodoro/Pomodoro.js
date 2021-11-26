import React from 'react';
import './pomodoro.scss';

import Card from '../card/Card';
import Button from '../button/Button';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'Начать',
      pomodoroTimer: [0, 0],//[min, sec]
      pomodoroInterval: null,
      noiseUrl: './audio/noise.mp3',
      break: false
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.audioPlayer = null;
  }

  clickHandler() {
    console.log('clicked on button');
    if (this.state.break) {
      this.setState({
        break: false,
        buttonName: 'Начать',
      });
      return;
    }
    if (!this.state.pomodoroInterval) {

      this.audioPlayer = document.getElementById('audioPlayer');
      this.audioPlayer.play();

      this.pomodoroMinutesCustom = Number(document.querySelector('#pomodoroMinutesCustom').value);//берём кол-во минут из интерфейса <select>
      // console.log(this.pomodoroMinutesCustom);
      this.setState({
        pomodoroTimer: [this.pomodoroMinutesCustom, this.state.pomodoroTimer[1]],//устанавливаем пользовательское кол-во минут
      });

      let pomodoroInterval = setInterval(() => {
        this.setState({
          buttonName: this.state.pomodoroTimer.join(':'),
        });

        let curTimer = this.state.pomodoroTimer;

        if (curTimer[1] === 0 && curTimer[0] !== 0) {
          curTimer[1] = 59;
          curTimer[0] -= 1;
        } else if (curTimer[1] === 0 && curTimer[0] === 0) {
          clearInterval(this.state.pomodoroInterval);
          this.audioPlayer.pause();
          this.setState({
            pomodoroInterval: null,
            buttonName: 'Отдых',
            break: true
          });
        } else {
          curTimer[1] -= 1;
        }

        this.setState({
          pomodoroTimer: [curTimer[0], curTimer[1]],
        });
        console.log(this.state.pomodoroTimer);
      }, 1000);

      this.setState({
        pomodoroInterval: pomodoroInterval,
      });

    }
  }

  render() {
    return (
      <Card>
        <h2 className="card__title">Техника помодоро, для концентрированной и интенсивной работы.</h2>
        <p className="card__text">
          Таймер нельзя будет остановить, в этом то вся соль этой техники :)
          <br />
          Если всё таки что-то важное, запишите в блокнот эту мысль и вернитесь к этому после техники помодоро.
        </p>
        <audio id="audioPlayer" loop="loop">
          <source src={this.state.noiseUrl} type="audio/mpeg" />
        </audio>
        <Button className={`card__button ${(this.state.break)?'--break':''}`} onClick={this.clickHandler}>
          {this.state.buttonName}
        </Button>
        <select id="pomodoroMinutesCustom" className="card__select">
          <option key="5">5</option>
          <option key="10">10</option>
          <option key="15">15</option>
          <option key="20">20</option>
          <option key="25">25</option>
          <option key="30" selected="selected">30</option>
          <option key="35">35</option>
          <option key="40">40</option>
          <option key="45">45</option>
          <option key="50">50</option>
          <option key="55">55</option>
          <option key="60">60</option>
        </select>
        <b className="card__alert">минут</b>
      </Card>
    );
  }
}

export default Pomodoro;