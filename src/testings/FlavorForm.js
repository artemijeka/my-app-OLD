import React from 'react';

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ['coconut', 'mango']};

    this.handleChange = this.handleChange.bind(this);//привязка контекста this к методу класса (либо использовать синтаксис полей класса "handleChange = (event) => {")
    this.handleSubmit = this.handleSubmit.bind(this);//привязка контекста this к методу класса (либо использовать синтаксис полей класса "handleSubmit = (event) => {")
  }

  handleChange(event) {
    this.setState({value: [event.target.value]});
  }

  handleSubmit(event) {
    alert('Ваш любимый вкус: ' + [this.state.value]);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Выберите ваш любимый вкус:
          <select multiple={true} value={[this.state.value]} onChange={this.handleChange}>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

export default FlavorForm;