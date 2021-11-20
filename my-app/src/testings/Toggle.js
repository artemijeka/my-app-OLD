import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // Эта привязка обязательна для работы `this` в колбэке.
    // При обращении к this в JSX-колбэках необходимо учитывать, что методы класса в JavaScript по умолчанию не привязаны к контексту.
    // Если вы забудете привязать метод this.handleClick и передать его в onClick, значение this будет undefined в момент вызова функции.
    // Дело не в работе React, это часть того, как работают функции в JavaScript. Обычно, если ссылаться на метод без () после него, например, onClick={this.handleClick}, этот метод нужно привязать.
    this.handleClick = this.handleClick.bind(this);
  }

  // Если вам не по душе bind, существует другой способ. 
  // Если вы пользуетесь экспериментальным синтаксисом общедоступных полей классов, 
  // такой синтаксис доступен в Create React App по умолчанию, вы можете использовать его, чтобы правильно привязать колбэки:
  // Тогда привязыание контекста this через .bind(this), выше, не потребуется.
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }  

  handleClick(id) {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      // Ещё вариант если метод .bind(this) не нравится можно вызвать событие синтаксисом стрелочной функции.
      // Проблема этого синтаксиса в том, что при каждом рендере компонента создаётся новый колбэк. 
      // Чаще всего это не страшно. Однако, если этот колбэк попадает как проп в дочерние компоненты, 
      // эти компоненты могут быть отрендерены снова. Мы рекомендуем делать привязку в конструкторе 
      // или использовать синтаксис полей классов, чтобы избежать проблем с производительностью.
      // <button onClick={(e) => this.handleClick(e)}>
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Включено' : 'Выключено'}
      </button>
    );
  }
}

export default Toggle;