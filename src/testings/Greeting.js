import React from "react";

function UserGreeting(props) {
  return <h1>С возвращением!</h1>;
}

function GuestGreeting(props) {
  return <h1>Войдите, пожалуйста.</h1>;
}

function Greeting(props) {
  if (props.isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props = {
//       isLoggedIn: true,
//     }
//   }

//   render() {    
//     if (this.props.isLoggedIn) {
//       return <UserGreeting />;
//     }
//     return <GuestGreeting />;
//   }

// }

export default Greeting;