import React from 'react';
import ReactDOM from 'react-dom';

import MyApp from './MyApp';
// import Button from './testings/bootstrap/Button';
import Reservation from './testings/Reservation';
import FlavorForm from './testings/FlavorForm';
import EssayForm from './testings/EssayForm';
import NameForm from './testings/NameForm';
import NumberList from './testings/NumberList';
import Warning from './testings/Warning';
import LoginControl from './testings/LoginControl';
import Toggle from './testings/Toggle';
import Clock from './testings/Clock';
import Comment from './testings/Comment';
import Testings from './testings/Testings';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
    {/* <Button /> */}

    <Reservation />
    <FlavorForm />
    <EssayForm />
    <NameForm />
    <NumberList numbers={[1, 2, 3, 4, 5]} />
    <Warning />
    <LoginControl />
    <Toggle />
    <Clock />
    <Comment author="Athor Name" text="Text Author" date="20.11.2021"/>
    <Testings />
  </React.StrictMode>,
  document.getElementById('my-app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);