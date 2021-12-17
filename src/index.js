import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <App />,
  document.getElementById('my-app')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();// reportWebVitals(console.log);

window.addEventListener('unhandledrejection', event => {
  let target = event.target; // объект запроса IndexedDB
  let reason = event.reason; //  Необработанный объект ошибки, как request.error
  let message = reason.message;
  console.log('unhandledrejection target: ');
  console.log(target);
  console.log('unhandledrejection reason: ');
  console.log(reason);
  console.log('unhandledrejection message: ');
  console.log(message);
});