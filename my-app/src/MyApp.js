import { Button } from 'react-bootstrap';
// Importing the Bootstrap CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyApp.scss';

let buttonName = 'Play timer';
let timer = 0;

function toggleTimer() {
  setInterval(function(timer) {
    timer++;
  }, 1000);
}

const button = <Button onClick={toggleTimer} data-timer={timer} className="btn-danger">{buttonName}</Button>

function MyApp() {
  return button;
}

export default MyApp;