import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Pomodoro from './pomodoro/Pomodoro';
import Tasks from './tasks/Tasks';
import {BrowserRouter,
        Routes,
        Route,
        Link} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Link to='/tasks'>Tasks</Link> | <Link to='/pomodoro'>Pomodoro</Link>
      <Routes>
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/pomodoro' element={<Pomodoro />} />
      </Routes>
      {/*<Tasks />*/}
      {/*<Pomodoro />*/}
    </React.StrictMode>
  </BrowserRouter>,
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