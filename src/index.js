import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import Pomodoro from './pomodoro/Pomodoro';
import Tasks from './tasks/Tasks';
// import TasksTable from './tasks/TasksTable';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Tasks/>
    <Pomodoro />
    {/* <TasksTable /> */}
  </React.StrictMode>,
  document.getElementById('my-app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);