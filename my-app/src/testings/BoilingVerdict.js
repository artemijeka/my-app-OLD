import React from 'react';

class BoilingVerdict extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.celsius >= 100) {
      return <p>Вода закипит.</p>;
    }
    return <p>Вода не закипит.</p>;
  }
}

// Переписал функциональный компнент в классовый компонент выше.
// function BoilingVerdict(props) {
//   if (props.celsius >= 100) {
//     return <p>Вода закипит.</p>;
//   }
//   return <p>Вода не закипит.</p>;
// }

export default BoilingVerdict;