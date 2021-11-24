import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    /* !!!Обратите внимание, что мы передаём props базовому (родительскому) конструктору: */
    super(props);
    /* !!!Конструктор — это единственное место, где вы можете присвоить значение this.state напрямую. */
    this.state = {date: new Date()};
  }

  /* Эти методы называются «методами жизненного цикла» (lifecycle methods). */
  /* Должны называться именно этими именами! */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  
  /* Есть ещё такой встроенный метод  */
  componentDidUpdate() {}

  /* Эти методы называются «методами жизненного цикла» (lifecycle methods). */
  /* Должны называться именно этими именами! */
  /* !!!Если компонент Clock когда-либо удалится из DOM, React вызовет метод жизненного цикла componentWillUnmount() и сбросит таймер. */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    /* Не изменяйте состояние напрямую. Вместо этого используйте setState() */
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