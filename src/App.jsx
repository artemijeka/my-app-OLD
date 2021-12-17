import React from 'react';
import Pomodoro from './pomodoro/Pomodoro';
import './App.scss';

import Tasks from './tasks/Tasks';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <div className="navigation">
          <NavLink to='/' className={`navigation__link`}>Main</NavLink>&nbsp;-&nbsp;
          <NavLink to='/tasks' className={`navigation__link`}>Tasks</NavLink>&nbsp;-&nbsp;
          <NavLink to='/pomodoro' className={`navigation__link`}>Pomodoro</NavLink>
        </div>
        <Routes>
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/pomodoro' element={<Pomodoro />} />
          <Route path='/' element={<><Tasks /><Pomodoro test="test" /></>} />
        </Routes>
        {/*<Tasks />*/}
        {/*<Pomodoro />*/}
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;