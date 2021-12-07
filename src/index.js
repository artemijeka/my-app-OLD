import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Pomodoro from './pomodoro/Pomodoro';
import Tasks from './tasks/Tasks';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <div className="navigation">
        <Link to='/' class="navigation__link">Main</Link> | 
        <Link to='/tasks' class="navigation__link">Tasks</Link> | 
        <Link to='/pomodoro' class="navigation__link">Pomodoro</Link>
      </div>
      <Routes>
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/pomodoro' element={<Pomodoro />} />
        <Route path='/' element={<><Tasks /><Pomodoro /></>} />
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