import React from 'react';
import ReactDOM from 'react-dom';

import MyApp from './MyApp';
// import Button from './testings/bootstrap/Button';
import Toggle from './testings/Toggle';
import Clock from './testings/Clock';
import Comment from './testings/Comment';
import Testings from './testings/Testings';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
    {/* <Button /> */}
    <Toggle />
    <Clock />
    <Comment author="asdasd" text="asdasd" date="111111"/>
    <Testings />
  </React.StrictMode>,
  document.getElementById('my-app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);