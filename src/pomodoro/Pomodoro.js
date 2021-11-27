import React from 'react';
import './pomodoro.scss';

import Card from '../card/Card';
import Button from '../button/Button';
import Select from '../select/Select';
import Alert from '../alert/Alert';
import AudioPlayer from '../audioplayer/AudioPlayer';

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
    this.startPomodoro = this.startPomodoro.bind(this);
    this.audioPlayer = null;
  }

  componentDidMount() {//встроенный метод React
    // По умолчанию кол-во минут берётся из select а там по умолчанию 30 минут
    this.pomodoroMinutes = Number(document.querySelector('#pomodoroMinutes').value);//берём кол-во минут из интерфейса <select>
    this.pomodoroSeconds = this.state.pomodoroTimer[1];

    let pomodoroMinutesMemory = Number( localStorage.getItem('pomodoroMinutesMemory') );
    let pomodoroSecondsMemory = Number( localStorage.getItem('pomodoroSecondsMemory') );

    console.log(pomodoroMinutesMemory);
    console.log(pomodoroSecondsMemory);
    if (pomodoroMinutesMemory !== 0 || pomodoroSecondsMemory !== 0) {
      console.log('pomodoroMinutesMemory: '+pomodoroMinutesMemory);
      console.log('pomodoroSecondsMemory: '+pomodoroSecondsMemory);
      this.pomodoroMinutes = pomodoroMinutesMemory;
      this.pomodoroSeconds = pomodoroSecondsMemory;
      // this.setState({
      //   pomodoroTimer: [pomodoroMinutesMemory, pomodoroSecondsMemory],
      // });
      // this.startPomodoro();
    }
  }

  startPomodoro() {
    console.log('clicked on button');
    if (this.state.break) {
      this.setState({
        break: false,
        buttonName: 'Начать',
      });
      return;
    }

    let pomodoroMinutesMemory = Number( localStorage.getItem('pomodoroMinutesMemory') );
    let pomodoroSecondsMemory = Number( localStorage.getItem('pomodoroSecondsMemory') );
    if (pomodoroMinutesMemory === 0 && pomodoroSecondsMemory === 0) {
      this.pomodoroMinutes = Number(document.querySelector('#pomodoroMinutes').value);
      this.pomodoroSeconds = 0;
    }

    if (!this.state.pomodoroInterval) {

      this.audioPlayer = document.getElementById('audioPlayer');
      this.audioPlayer.play();
      
      // console.log(this.pomodoroMinutes);
      this.setState({
        pomodoroTimer: [this.pomodoroMinutes, this.pomodoroSeconds],//устанавливаем пользовательское кол-во минут
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
        localStorage.setItem('pomodoroMinutesMemory', curTimer[0]);
        localStorage.setItem('pomodoroSecondsMemory', curTimer[1]);
        // console.log(this.state.pomodoroTimer);
      }, 1000);

      this.setState({
        pomodoroInterval: pomodoroInterval,
      });

    }
  }

  render() {
    return (
      <Card title="Техника помодоро, для концентрированной и интенсивной работы.">        
        <p className="card__text">
          Таймер нельзя будет остановить, в этом то вся соль этой техники :)
          <br />
          Если всё таки что-то важное придёт в голову, запишите в блокнот эту мысль и вернитесь к этому после техники помодоро.
        </p>
        <AudioPlayer audioTrackSrc={this.state.noiseUrl} />
        <Button
          className={`card__button ${(this.state.break) ? '--break' : ''}`}
          onClick={this.startPomodoro}
        >
          {this.state.buttonName}
        </Button>
        <Select
          id="pomodoroMinutes"
          className="card__select"
          optionsList={
            <>
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
            </>
          }
        />
        {/* <select id="pomodoroMinutes" className="card__select">
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
        </select> */}
        <Alert className="card__alert" text="минут" />
      </Card>
    );
  }
}

export default Pomodoro;