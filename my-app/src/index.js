import React from 'react';
import ReactDOM from 'react-dom';

import MyApp from './MyApp';
// import Testings from './Testings';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
    {/* <Testings /> */}
  </React.StrictMode>,
  document.getElementById('my-app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
