import React from 'react';
import Greeting from './Greeting';

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Войти
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Выйти
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  // Я предпочитаю использовать синтаксис полей классов вместо назначения контекста с помощью .bind(this) выше.
  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  }

  // Я предпочитаю использовать синтаксис полей классов вместо назначения контекста с помощью .bind(this) выше.
  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    let button;
    if (this.state.isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn} />
        {button}
      </div>
    );
  }
}

export default LoginControl;