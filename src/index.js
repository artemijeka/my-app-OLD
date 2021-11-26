// Adding Bootstrap https://create-react-app.dev/docs/adding-bootstrap

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import Pomodoro from './pomodoro/Pomodoro';
// import TasksTable from './tasks/TasksTable';

import reportWebVitals from './reportWebVitals';

// import FilterableProductTable from './testings/FilterableProductTable';
// import CalculatorBoiling from './testings/CalculatorBoiling';
// import Reservation from './testings/Reservation';
// import FlavorForm from './testings/FlavorForm';
// import EssayForm from './testings/EssayForm';
// import NameForm from './testings/NameForm';
// import NumberList from './testings/NumberList';
// import Warning from './testings/Warning';
// import LoginControl from './testings/LoginControl';
// import Toggle from './testings/Toggle';
// import Clock from './testings/Clock';
// import Comment from './testings/Comment';
// import Testings from './testings/Testings';



// const PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];



ReactDOM.render(
  <React.StrictMode>
    <Pomodoro />
    {/* <TasksTable /> */}



    {/* <FilterableProductTable products={PRODUCTS} />
    <CalculatorBoiling />
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
    <Testings /> */}
  </React.StrictMode>,
  document.getElementById('my-app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);