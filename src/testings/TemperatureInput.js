import React from 'react';

const scaleNames = {
  c: 'Цельсия',
  f: 'Фаренгейта'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);//привязка контекста this к методу класса (либо использовать синтаксис полей класса "handleChange = (this) => {")
  }

  handleChange(e) {
    // Ранее было так: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
        <input 
          value={this.props.temperature}
          onChange={this.handleChange} 
        />
      </fieldset>
    );
  }
}

export default TemperatureInput;