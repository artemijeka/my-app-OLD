import React from 'react';

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Будьте любезны, напишите сочинение о вашем любимом DOM-элементе.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Сочинение отправлено: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Сочинение:
          <br />
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

export default EssayForm;