import React from 'react';
import './Warning.scss';

function WarningBanner(props) {
  if (!props.warn) {//если не warn то не показываем WarningBanner
    return null;
  }

  return (//иначе выводим WarningBanner
    <div className="warning">
      Предупреждение!
    </div>
  );
}

class Warning extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    // Прикрепляем контекст класса к методу this.handleToggleClick()
    this.handleToggleClick = this.handleToggleClick.bind(this);
    // Или ниже используем синтаксис поля класса "handleToggleClick = () => {"
  }

  handleToggleClick() {
    this.setState((state) => {
      return {
        showWarning: !state.showWarning
      } 
    });
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Спрятать' : 'Показать'}
        </button>
      </div>
    );
  }
}

export default Warning;